import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, discount}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    return(
        <>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic " style={ 
                                    {
                                        backgroundImage:  `url("${product.images[0].url}")` ,
                                        backgroundRepeat  : 'no-repeat',
                                        backgroundPosition: 'top-center',
                                        backgroundSize : 'cover'
                                    }
                                }
                                >
                                    {
                                        product.sale ? <div className="product__discount__percent">-{product.sale} %</div> : ''
                                    }
                                    <ul className="product__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li>
                                            <Link href={`product/${product._id}`}>
                                                <a><i className="fa fa-eye"></i></a>
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                disabled={product.inStock === 0 ? true : false} 
                                                onClick={() => dispatch(addToCart(product, cart))}>
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                            
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>
                                        <Link href={`product/${product._id}`}>
                                            <a href="#"> {product.title}</a>
                                        </Link>
                                    </h6>
                                    <h5 >{product.price}.000 ₫</h5>
                                    {/* {
                                        product.inStock > 0
                                        ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                                        : <h6 className="text-danger">Out Stock</h6>
                                    } */}
                                </div>
                            </div>
                        </div>
        </>
       
    )
}


export default ProductItem