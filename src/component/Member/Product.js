import { useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {

    return (
        <div class="col-sm-9">
            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td class="image">image</td>
                            <td class="description">name</td>
                            <td class="price">price</td>

                            <td class="total">action</td>

                        </tr>
                    </thead>
                    <tbody>


                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="images/cart/one.png" alt="" /></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>

                            </td>
                            <td class="cart_price">
                                <p>$59</p>
                            </td>

                            <td class="cart_total">
                                <a>edit</a>
                                <a>delete</a>
                            </td>

                        </tr>
                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="images/cart/one.png" alt="" /></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>

                            </td>
                            <td class="cart_price">
                                <p>$59</p>
                            </td>

                            <td class="cart_total">
                                <a>edit</a>
                                <a>delete</a>
                            </td>

                        </tr>
                        <tr>
                            <td class="cart_product">
                                <a href=""><img src="images/cart/one.png" alt="" /></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">Colorblock Scuba</a></h4>

                            </td>
                            <td class="cart_price">
                                <p>$59</p>
                            </td>

                            <td class="cart_total">
                                <a>edit</a>
                                <a>delete</a>
                            </td>

                        </tr>

                    </tbody>
                </table>

                <Link to={"/account/addproduct"} >Add</Link>
            </div>
        </div>
    );
}