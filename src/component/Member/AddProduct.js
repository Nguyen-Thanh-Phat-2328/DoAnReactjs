import { useState } from "react";

export default function AddProduct() {
    const [getInput, setInput] = useState({
        
    });
    const [getErr, setErr] = useState({});

    function handleInput(e) {
        // console.log(e.target.value);


        const inputSale = document.getElementById("input-sale");
        inputSale.innerHTML = e.target.value == 1 ? `<input type="text" name="sale" />` : ``;
    }
    return (
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Add product</h2>
                <div class="signup-form">
                    {/* <!--sign up form--> */}
                    <h2>Create product!</h2>
                    {/* <FormError error={getErr} /> */}
                    <form>
                        <input type="text" name="name" placeholder="Name" />

                        <input type="text" name="price" placeholder="Price" />

                        <select name="category">
                            <option selected>Chọn category</option>
                            <option>abc</option>
                            <option>cba</option>
                        </select>

                        <select name="branch">
                            <option selected>Chọn branch</option>
                            <option>branch 1</option>
                            <option>branch 2</option>
                        </select>

                        <select id="sale" onChange={handleInput}>
                            <option value={1}>Sale</option>
                            <option value={0} selected>Không sale</option>
                        </select>
                        <div id="input-sale">

                        </div>

                        <input type="text" name="company" placeholder="Thông tin công ty" /> 

                        <input type="file" id="image" name="image" multiple />

                        

                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}