import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
    const [getProduct, setProduct] = useState({});
    const userComment = JSON.parse(localStorage.getItem('user'));

    let config = {
        headers: {
            'Authorization': 'Bearer ' + userComment.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/my-product", config)
            .then(res => {
                setProduct(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    function handleDelete(idProduct) {
        axios.get(`http://localhost:8080/laravel8/laravel8/public/api/user/product/delete/${idProduct}`, config)
            .then(res => {
                setProduct(res.data.data);
            }).catch(err => console.log(err));
    }

    function renderProduct() {
        return Object.values(getProduct).map((value, i) => {
            const arrImageProduct = JSON.parse(value.image);

            return (
                <tr key={value.id}>
                    <td className="cart_id">
                        <p>{value.id}</p>
                    </td>
                    <td class="cart_product">
                        <a href=""><img src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + userComment.Auth.id + "/" + arrImageProduct[0]} alt="" /></a>
                    </td>
                    <td class="cart_description">
                        <h4><a href="">{value.name}</a></h4>

                    </td>
                    <td class="cart_price">
                        <p>${value.price}</p>
                    </td>

                    <td class="cart_total">
                        <a href={"/account/updateproduct/" + value.id}>edit</a>
                        <a onClick={() => handleDelete(value.id)}>delete</a>
                    </td>

                </tr>
            );
        })


    }

    return (
        <div class="col-sm-9">
            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td className="id">id</td>
                            <td class="image">image</td>
                            <td class="description">name</td>
                            <td class="price">price</td>

                            <td class="total">action</td>

                        </tr>
                    </thead>
                    <tbody>


                        {renderProduct()}


                    </tbody>
                </table>

                <Link to={"/account/addproduct"} >Add</Link>
            </div>
        </div>
    );
}