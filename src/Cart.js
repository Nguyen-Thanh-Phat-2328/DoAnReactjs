import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Cart() {
    const getCartLocal = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : {};
    const [getCart, setCart] = useState([]);

    const {getToTalCart, setToTalCart} = useContext(UserContext);

    let total = 0;

    useEffect(() => {
        axios.post("http://localhost:8080/laravel8/laravel8/public/api/product/cart", getCartLocal)
            .then(res => {
                setCart(res.data.data);
            })
    }, []);

    function handleClickChangeQty(e, idProduct) {
        e.preventDefault();

        let newCart = [...getCart];

        newCart.map(item => {
            if (item.id === idProduct) {
                if (e.target.className === 'cart_quantity_up') {
                    getCartLocal[idProduct] = getCartLocal[idProduct] + 1;
                    item.qty = getCartLocal[idProduct];
                }
                if (e.target.className === 'cart_quantity_down') {
                    if (getCartLocal[idProduct] > 1) {
                        getCartLocal[idProduct] = getCartLocal[idProduct] - 1;
                        item.qty = getCartLocal[idProduct];
                    } else {
                        alert('Số lượng không nhỏ hơn 1');
                    }
                }
                if (e.target.className === 'cart_quantity_delete') {
                    delete getCartLocal[idProduct];
                    newCart = newCart.filter(item => item.id !== idProduct);
                }
            }
        })

        localStorage.setItem('cart', JSON.stringify(getCartLocal));

        setCart(newCart);

        //update total cart trên Head
        let totalCart = 0;
        Object.keys(getCartLocal).map((key) => {
            totalCart = totalCart + getCartLocal[key];
        })
        setToTalCart(totalCart);
    }

    Object.keys(getCart).map(key => {
        total = total + (getCart[key].price * getCart[key].qty);
    });

    function renderCart() {
        return Object.keys(getCart).map((key, index) => {
            return (
                <tr key={index}>
                    <td className="cart_product">
                        <a href=""><img src={getCart[key].image} alt="" /></a>
                    </td>
                    <td className="cart_description">
                        <h4><a href="">{getCart[key].name}</a></h4>
                        <p>Web ID: {getCart[key].id}</p>
                    </td>
                    <td className="cart_price">
                        <p>{getCart[key].price}</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_up" href="" onClick={(e) => handleClickChangeQty(e, getCart[key].id)}> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" value={getCart[key].qty} autocomplete="off" size="2" />
                            <a className="cart_quantity_down" href="" onClick={(e) => handleClickChangeQty(e, getCart[key].id)}> - </a>
                        </div>
                    </td>
                    <td className="cart_total">
                        <p className="cart_total_price">{getCart[key].price * getCart[key].qty}</p>
                    </td>
                    <td className="cart_delete">
                        <a className="cart_quantity_delete" href="" onClick={(e) => handleClickChangeQty(e, getCart[key].id)}><i className="fa fa-times"></i></a>
                    </td>
                </tr>);
        })
    }
    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="table-body">

                                {renderCart()}

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div class="container">
                    <div class="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="chose_area">
                                <ul class="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul class="user_info">
                                    <li class="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a class="btn btn-default update" href="">Get Quotes</a>
                                <a class="btn btn-default check_out" href="">Continue</a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="total_area">
                                <ul>
                                    <li>Cart Sub Total
                                        <span class="cart_total">${total}</span>
                                    </li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span class="pay_total">${total + 2}</span></li>
                                </ul>
                                <a class="btn btn-default update" href="">Update</a>
                                <a class="btn btn-default check_out" href="">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}