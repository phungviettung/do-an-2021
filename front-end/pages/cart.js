import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import { getData, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state

  const [total, setTotal] = useState(0)

  const [provice, setProvice] = useState('')
  const [district, setDistrict] = useState('')

  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')

  const [callback, setCallback] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0)

      setTotal(res)
    }

    getTotal()
  },[cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__devat'))
    if(cartLocal && cartLocal.length > 0){
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal){
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if(inStock > 0){
            newArr.push({ 
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    } 
  },[callback])

  const handlePayment = async () => {
    if(!address || !mobile)
    return dispatch({ type: 'NOTIFY', payload: {error: 'Nhập Số điện thoại và địa chỉ người nhận !'}})

    let newCart = [];
    for(const item of cart){
      const res = await getData(`product/${item._id}`)
      if(res.product.inStock - item.quantity >= 0){
        newCart.push(item)
      }
    }
    
    if(newCart.length < cart.length){
      setCallback(!callback)
      return dispatch({ type: 'NOTIFY', payload: {
        error: 'Sản phẩm hết hàng hoặc số lượng không đủ.'
      }})
    }

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    postData('order', {address, mobile, cart, total}, auth.token)
    .then(res => {
      if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

      dispatch({ type: 'ADD_CART', payload: [] })
      
      const newOrder = {
        ...res.newOrder,
        user: auth.user
      }
      dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
      dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

      // send mail
      // sendMailNoti(cart)
      let newOrderRes = res.newOrder
        postData('sendMail', {cart, newOrderRes })
      // end send mail
      return router.push(`/order/${res.newOrder._id}`)
    })

  }
  
  if( cart.length === 0 ) 
    return <img className="img-responsive w-100" src="/empty_cart.jpg" alt="not empty"/>

    return(
      <>
        <section className="shoping-cart spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá tiền</th>
                                    <th>Số lượng </th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                cart.map(item => (
                                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                                ))
                              }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__btns">
                      <Link href="/">
                      <a  className="primary-btn cart-btn">Tiếp tục mua sắm</a>
                      </Link>
                        {/* <a href="#" className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span>
                            Upadate Cart</a> */}
                    </div>
                </div>
                <div className="col-lg-6">
                    
                    <form className="spad">
                      <h2>Thông tin giao hàng </h2>

                      <label htmlFor="address">Địa chỉ người nhận </label>
                      <input type="text" name="address" id="address"
                      className="form-control mb-2" value={address}
                      onChange={e => setAddress(e.target.value)} />

                      <label htmlFor="mobile">Số điện thoại người nhận</label>
                      <input type="text" name="mobile" id="mobile"
                      className="form-control mb-2" value={mobile}
                      onChange={e => setMobile(e.target.value)} />

                    </form>
                </div>
                <div className="col-lg-6">
                    <div className="shoping__continue">
                          <div className="shoping__discount" style={{textAlign: 'center'}}>
                              <h5>Mã giảm giá</h5>
                              <form action="#" >
                                  <input type="text" placeholder="Nhập mã giảm giá"/>
                                  <button type="submit" className="site-btn">Áp dụng</button>
                              </form>
                          </div>
                    </div>
                    <div className="shoping__checkout">
                        <h5>Giỏ hàng hiện tại</h5>
                        <ul>
                            <li>Tổng giá trị sản phẩm <span>{total}.000 đ</span></li>
                            <li>Tổng giá tiền cần trả <span>{total}.000 đ</span></li>
                        </ul>
                        <Link href={auth.user ? '#!' : '/signin'}>
                          <a className="primary-btn" onClick={handlePayment}>Đặt hàng và thanh toán</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Tỉnh/Thành phố *</label>
                                <select className="wide w-100" name="calc_shipping_provinces" required="" >
                                    <option value="">Tỉnh / Thành phố</option>
                                </select>
                                <input className="billing_address_1" name="province" type="hidden" value=""  id="province"/>
                                <div className="invalid-feedback"> Please select a valid country. </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">Quận/Huyện *</label>
                                <select className="wide w-100" name="calc_shipping_district" required="" >
                                    <option value="">Quận / Huyện</option>
                                </select>
                                <input className="billing_address_2" name="district" type="hidden" value="" id="district"/>
                                <div className="invalid-feedback"> Please provide a valid state. </div>
                            </div>          
        </div> */}

    </section>
     
      {/* <div className="row mx-auto">
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            </form>

            <h3>Total: <span className="text-danger">${total}</span></h3>

            
            <Link href={auth.user ? '#!' : '/signin'}>
              <a className="btn btn-dark my-2" onClick={handlePayment}>Proceed with payment</a>
            </Link>
            
        </div>
      </div> */}
      </>
    )
  }
  
export default Cart