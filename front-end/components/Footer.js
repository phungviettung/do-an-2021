
function Footer() {
    return (
        <div className="footer">
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <a href="./index.html"><img src="logo.png" alt=""/></a>
                            </div>
                            <ul>
                                <li>Địa chỉ : 236 Hoàng Quốc Việt, Hà Nội </li>
                                <li>Điện thoại: 0329015759</li>
                                <li>Email: hello@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>Có thể hữu ích</h6>
                            <ul>
                                <li><a href="#">Thông tin về chúng tôi</a></li>
                                <li><a href="#">Thông tin về cửa hàng</a></li>
                                <li><a href="#">Bản mật khi đặ hàng </a></li>
                                <li><a href="#">Điều khoản vận chuyển</a></li>
                                <li><a href="#">Điều khoản sử dụng</a></li>
                                <li><a href="#">Chúng tôi trên google map</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Chúng tôi là ai ?</a></li>
                                <li><a href="#">Các dịch vụ</a></li>
                                <li><a href="#">Dự án</a></li>
                                <li><a href="#">Liên hệ</a></li>
                                <li><a href="#">Sự đổi mới</a></li>
                                <li><a href="#">Đánh giá của người dùng</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <h6>Nhận tin</h6>
                            <p>Tham gia nhận các ưu đãi đặc biệt của chúng tôi</p>
                            <form action="#">
                                <input type="text" placeholder="Nhập email"/>
                                <button type="submit" className="site-btn">Đăng ký</button>
                            </form>
                            <div className="footer__widget__social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer__copyright">
                            <div className="footer__copyright__text"></div>
                            <div className="footer__copyright__payment"><img src="img/payment-item.png" alt=""/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Footer
