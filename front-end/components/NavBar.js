import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'


function NavBar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart, categories, material } = state

    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Bạn đã đăng xuất !'} })
        return router.push('/')
    }

    const adminRouter = () => {
        return(
            <>
            <Link href="/users">
                <a className="dropdown-item">Users</a>
            </Link>
            <Link href="/create">
                <a className="dropdown-item">Products</a>
            </Link>
            <Link href="/categories">
                <a className="dropdown-item">Categories</a>
            </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }} /> {auth.user.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }

    return (
        <div>
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope"></i> hello@gmail.com</li>
                                    <li>Miễn phí vận chuyển cho đơn hàng từ 500.000 ₫</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                <div className="header__top__right__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                    <a href="#"><i className="fa fa-pinterest-p"></i></a>
                                </div>
                                
                                <div className="header__top__right__auth">
                                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                        <ul className="navbar-nav p-1">
                                            {
                                            Object.keys(auth).length === 0 
                                            ? <li className="nav-item">
                                                <Link href="/signin">
                                                        <a className={"nav-link" + isActive('/signin')} href="#">
                                                            <i className="fa fa-user"></i> Đăng nhập
                                                        </a>
                                                </Link>
                                            </li> 
                                            : loggedRouter()
                                        }
                                        </ul>
                                    </div>
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <Link  href="/">
                                <a ><img src="logo.png" alt=""/></a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <nav className="header__menu">
                            <ul>
                                <li className="active">
                                                    <Link href={`/`}>
                                                        <a> Trang chủ </a>
                                                    </Link>
                                </li>
                                {/* <li><a href="./shop-grid.html">Chọn hoa</a></li> */}
                                <li><a href="#">Chủ đề <i className="fa fa-sort-down"></i> </a>
                                    <ul className="header__menu__dropdown">
                                        {
                                            categories.map(item => 
                                                <li>
                                                    <Link href={`?search=all&category=${item._id}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li><a href="#">Thiết kế<i className="fa fa-sort-down"></i> </a>
                                    <ul className="header__menu__dropdown">
                                        {
                                            material.map(item => 
                                                <li>
                                                    <Link href={`?search=all&material=${item._id}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li>
                                                    <Link href={`/`}>
                                                        <a> Blog </a>
                                                    </Link>
                                </li>
                                <li>
                                                    <Link href={`/`}>
                                                        <a> Liên hệ </a>
                                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__cart">
                            <ul>
                                {/* <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li> */}
                                <li>
                                    <Link href="/cart">
                                        <a className={"" + isActive('/cart')} href="#">
                                            <i className="fa fa-shopping-bag"></i>
                                            <span>  {cart.length} </span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                            {/* <div className="header__cart__price">total: <span>{cart.total}</span></div> */}
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
      

        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link  href="/">
                <a className="navbar-brand">tungpv</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')}>
                                <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                                    <span className="position-absolute"
                                    style={{
                                        padding: '3px 6px',
                                        background: '#ed143dc2',
                                        borderRadius: '50%',
                                        top: '-10px',
                                        right: '-10px',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>
                                        {cart.length}
                                    </span>
                                </i> Cart
                            </a>
                        </Link>
                    </li>
                    {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item">
                            <Link href="/signin">
                                <a className={"nav-link" + isActive('/signin')}>
                                    <i className="fas fa-user" aria-hidden="true"></i> Sign in
                                </a>
                            </Link>
                        </li>
                        : loggedRouter()
                    }
                </ul>
            </div>
        </nav> */}
        </div>
    )
}

export default NavBar
