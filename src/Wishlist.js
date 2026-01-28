import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Wishlist() {
    const wishlistLocal = JSON.parse(localStorage.getItem('wishlist')) ? JSON.parse(localStorage.getItem('wishlist')) : [];
    const [getWishlistInfor, setWishlistInfor] = useState([]);
    const { setWishlist, getWishlist } = useContext(UserContext);

    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/product")
        .then(res => {
            // wishlistLocal.map(itemWishlist => {
            //     res.data.data.map(itemProduct => {
            //         if(itemWishlist == itemProduct.id) {
            //             setWishlist(state => ([...state, itemProduct]));
            //         }
            //     })
            // });
            const newWishlist = res.data.data.filter(itemProduct => wishlistLocal.includes(itemProduct.id));
            setWishlistInfor(newWishlist);
        })
    }, []);

    function handleDeleteItemWishlist(id){
        //update giao diện
        const newWishlistInfor = getWishlistInfor.filter(item => item.id !== id);
        setWishlistInfor(newWishlistInfor);

        //update local
        const newWishlist = getWishlist.filter(item => item !== id);
        setWishlist(newWishlist);
    }

    function renderCart() {
        return getWishlistInfor.map(item => {
            return (
                <tr key={item.id}>
                    <td className="cart_product">
                        <a href=""><img style={{ width: "80px", height: "80px", objectFit: "cover" }} src={"http://localhost:8080/laravel8/laravel8/public/upload/product/"+ item.id_user +"/"+ JSON.parse(item.image)[0]} alt="" /></a>
                    </td>
                    <td className="cart_description">
                        <h4><a href="">{item.name}</a></h4>
                        <p>Web ID: {item.id}</p>
                    </td>
                    <td className="cart_delete">
                        <a className="cart_quantity_delete" onClick={() => handleDeleteItemWishlist(item.id)}><i className="fa fa-times"></i></a>
                    </td>
                </tr>);
        })
    }
    return (
            <section id="cart_items">
                <div className="container">
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
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

    )
}