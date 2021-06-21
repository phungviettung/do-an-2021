import Head from 'next/head'
import Slider from "react-slick";
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'

const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)
  const {auth} = state

  useEffect(() => {
    setProducts(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  return(
    <div className="product">
        <div className="container">
            <div className= "row">
                <div className="col-lg-12 col-md-12">
                    <div className="product__discount">
                        <div className="section-title product__discount__title">
                            <h2>Sản phẩm</h2>
                        </div>
                    </div>
                    <Filter state={state} />
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    
                    <div className="row">
                        {
                        products.length === 0 
                        ? <h2>No Products</h2>

                        : products.map(product => (
                            <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
                        ))
                        }
                    </div>
                    <div className="product__pagination">
                    {
                        props.result < page * 6 ? ""
                        : <button className="btn btn-outline-success d-block mx-auto mb-4"
                        onClick={handleLoadmore}>
                        Load more
                        </button>
                    }
                    </div> 
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="product__discount">
                        <div className="section-title product__discount__title">
                            <h2>Sản phẩm giảm giá</h2>
                        </div>
                    </div>
                    <div className="product__discount__slider">
                        <Slider {...settings}>
                            {
                                products.length === 0 
                                ? <h2>No Products Salling</h2>

                                : products.map(product => (
                                    <ProductItem key={product._id} product={product} discount={20} />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'
  const material = query.material || 'all'

  const res = await getData(
    `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}&material=${material}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  }
}

export default Home