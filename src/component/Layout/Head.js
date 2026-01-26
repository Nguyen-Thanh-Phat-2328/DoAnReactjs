import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useSelector } from "react-redux";
export default function Head() {
    const navigate = useNavigate();
    const { getToTalCart, setToTalCart } = useContext(UserContext);

    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : {};
        let totalCart = 0;
        if (Object.keys(cartLocal).length > 0) {
            Object.keys(cartLocal).map(key => {
                totalCart = totalCart + cartLocal[key];
            });
        }
        setToTalCart(totalCart);
    })

    function renderLogin() {
        const isLogin = JSON.parse(localStorage.getItem("user"));
        if (isLogin) {
            return (
                <li>
                    <a onClick={handleLogout}><i className="fa fa-lock"></i> Logout</a>
                </li>
            )
        } else {
            return (
                <li>
                    <Link to="/login"><i className="fa fa-lock"></i> Login</Link>
                </li>
            )
        }
    }

    function renderAccount() {
        const isLogin = JSON.parse(localStorage.getItem("user"));
        if (isLogin) {
            return (
                <li><Link to={"/account"}><i className="fa fa-user"></i> Account</Link></li>
            );
        }
    }

    function handleLogout() {
        localStorage.removeItem("user");
        navigate('/login');
    }

    //redux
    const totalCartRedux = useSelector(state => state.cart.totalCart);

    return (
        <>
            <header id="header">
                {/* header */}
                <div className="header_top">
                    {/* header_top */}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                        <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/header_top--> */}

                <div className="header-middle">
                    {/* header-middle */}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <a href="index.html"><img src="/frontend/images/home/logo.png" alt="" /></a>
                                </div>
                                <div className="btn-group pull-right clearfix">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa"
                                            data-toggle="dropdown">
                                            USA
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="">Canada</a></li>
                                            <li><a href="">UK</a></li>
                                        </ul>
                                    </div>

                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa"
                                            data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="">Canadian Dollar</a></li>
                                            <li><a href="">Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 clearfix">
                                <div className="shop-menu clearfix pull-right">
                                    <ul className="nav navbar-nav">
                                        {renderAccount()}
                                        <li>
                                            <a href="/cart/redux">
                                                <i className="fa fa-star"></i> Wishlist
                                                <span>{totalCartRedux}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="/checkout">
                                                <i className="fa fa-crosshairs"></i> Checkout
                                            </Link>
                                        </li>
                                        <li className="cart">
                                            <Link to="/cart">
                                                <i className="fa fa-shopping-cart"></i>
                                                <span className="cart-count">{getToTalCart}</span> Cart
                                            </Link>
                                        </li>
                                        {renderLogin()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /header-middle */}

                <div className="header-bottom">
                    {/* header-bottom */}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><Link to="/" className="active">Home</Link></li>
                                        <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><a href="shop.html">Products</a></li>
                                                <li><a href="product-details.html">Product Details</a></li>
                                                <li><a href="checkout.html">Checkout</a></li>
                                                <li><a href="cart.html">Cart</a></li>
                                                <li><a href="login.html">Login</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to="/blog/list">Blog List</Link></li>
                                                <li><a href="blog-single.html">Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="404.html">404</a></li>
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /header-bottom */}
            </header>
            {/*/header*/}
        </>
    );
}