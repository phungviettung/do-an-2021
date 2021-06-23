import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <>
            <Head>
                <title>Chi tiết sản phẩm </title>
            </Head>
        <section className="product-details">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="product__details__pic">
                        <div className="product__details__pic__item">
                            <img className="product__details__pic__item--large"
                                src={ product.images[tab].url } alt={ product.images[tab].url }/>
                        </div>
                        <div className="product__details__pic__slider">
                            {
                                product.images.map((img, index) => (
                                    <img key={index} src={img.url} alt={img.url}
                                        className={`img-thumbnail  ${isActive(index)}`}
                                        style={{height: '80px', width: '20%'}}
                                        onClick={() => setTab(index)} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="product__details__text">
                        <h3>{product.title}</h3>
                        <div className="product__details__rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <span>(18 đánh giá)</span>
                        </div>
                        <div className="product__details__price">{product.price}.000 ₫</div>
                        <p>{product.description}</p>
                        <p>{product.content}</p>

                        {/* <div className="product__details__quantity">
                            <div className="quantity">
                                <div className="pro-qty">
                                    <input type="text" value="1"/>
                                </div>
                            </div>
                        </div> */}
                        <a href="#" className="primary-btn" onClick={() => dispatch(addToCart(product, cart))} >Thêm vào giỏ hàng</a>
                        <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
                        <ul>
                            <li><b>Trạng thái</b> <span>{
                                    product.inStock > 0
                                    ? `Còn hàng : ${product.inStock} sản phẩm đang có sẵn`
                                    : `Hết hàng`
                                }    
                                </span></li>
                            <li><b>Vận chuyển</b> <span> Đặt trước 1 ngày <samp>{product.price >= 500 ? 'Miễn phí vận chuyển' : ''} </samp></span></li>
                            <li><b>Chia sẻ</b>
                                <div className="share">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-pinterest"></i></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                                    aria-selected="true">Mô tả</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                                    aria-selected="false">Thông tin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                                    aria-selected="false">Đánh giá <span>(18)</span></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Mô tả </h6>
                                    <p>{product.content}</p>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Products Infomation</h6>
                                    <p>{product.content}</p>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-3" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Products Infomation</h6>
                                    <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                        Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                        Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                        sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                        eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                        Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                        sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                        diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                        Proin eget tortor risus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="related-product">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title related__product__title">
                        <h2>Có thể bạn sẽ thích</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                            <ul className="product__item__pic__hover">
                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6><a href="#">Crab Pool Security</a></h6>
                            <h5>$30.00</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                            <ul className="product__item__pic__hover">
                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6><a href="#">Crab Pool Security</a></h6>
                            <h5>$30.00</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                            <ul className="product__item__pic__hover">
                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6><a href="#">Crab Pool Security</a></h6>
                            <h5>$30.00</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                            <ul className="product__item__pic__hover">
                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6><a href="#">Crab Pool Security</a></h6>
                            <h5>$30.00</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
        
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    
    const youMightAlsoLike = await getData(`product/${id}`)

    // server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct