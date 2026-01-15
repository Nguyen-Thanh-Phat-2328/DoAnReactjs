import axios from "axios";
import { useEffect, useState } from "react";
import FormError from "./FormError";

export default function AddProduct() {
    const [getInput, setInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        selectSale: '',
        company: '',
        sale: 0,
        detail: ''
    });
    const [getErr, setErr] = useState({});
    const [getCategory, setCategory] = useState({});
    const [getBrand, setBrand] = useState({});
    const [getIsSale, setIsSale] = useState();
    const listNameImageFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];

    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/category-brand")
        .then(res => {
            setCategory(res.data.category);
            setBrand(res.data.brand);
        })
        .catch(err => console.log(err));
    }, [])

    function renderSelectCategory() {
        if(getCategory.length > 0) {
            return getCategory.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.category}</option>
                )
            })
        }
    }

    function renderSelectBrand() {
        if(getBrand.length > 0) {
            return getBrand.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }
    
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput(state => ({...state, [nameInput]:valueInput}));

        if(e.target.name === 'status') {
            const value = parseInt(e.target.value);
            setIsSale(value);

            if(value === 1) {
                setInput(state => ({...state, sale:0}));
            }
        }

        if(e.target.name === 'sale') {
            if(e.target.value === '') {
                setInput(state => ({...state, sale:0}));
            }
        }
    }

    const [getFile, setFile] = useState('');
    function handleFile(e) {
        setFile(e.target.files);
    }

    function checkImageFile(fileName) {
        const arrNameFile = fileName.split('.');
        const imgFile = arrNameFile[arrNameFile.length - 1];

        return listNameImageFile.includes(imgFile);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;
        const userComment = JSON.parse(localStorage.getItem('user'));

        if(getInput.name === '') {
            errSubmit.name = 'vui lòng điền tên sản phẩm';
            flag = false;
        }

        if(getInput.price === '') {
            errSubmit.price = 'vui lòng nhập giá sản phẩm';
            flag = false;
        }

        if(getInput.category === '') {
            errSubmit.category = 'vui lòng chọn category';
            flag = false;
        }

        if(getInput.brand === '') {
            errSubmit.brand = 'vui lòng chọn brand';
            flag = false;
        }

        if(getInput.company === '') {
            errSubmit.company = 'vui lòng nhập công ty';
            flag = false;
        }

        if(getInput.detail === '') {
            errSubmit.detail = 'vui lòng nhập chi tiết sản phẩm';
            flag = false;
        }

        if(getFile === '') {
            errSubmit.image = 'vui lòng chọn ảnh sản phẩm';
            flag = false;
        } else {
            errSubmit.file = '';
            Object.keys(getFile).map((key, index) => {
                const sizeFile = getFile[key].size;
                const nameFile = getFile[key].name;
    
                if(!checkImageFile(nameFile)) {
                    errSubmit.file += nameFile + ' Không phải file ảnh ';
                    flag = false;
                } else {
                    if(sizeFile > 1024 * 1024) {
                        errSubmit.file += nameFile + ' vượt quá 1MB ';
                        flag = false;
                    }
                }
            })
        }

        if(!flag) {
            setErr(errSubmit);
        } else {
            setErr({});

            let url = 'http://localhost:8080/laravel8/laravel8/public/api/user/product/add'
            let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userComment.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };
            let formData = new FormData();
            formData.append('name', getInput.name);
            formData.append('price', getInput.price);
            formData.append('category', getInput.category);
            formData.append('brand', getInput.brand);
            formData.append('sale', getInput.sale);
            formData.append('company', getInput.company);
            formData.append('detail', getInput.detail);

            Object.keys(getFile).map((item, i) => {
                formData.append('file[]', getFile[item]);
            })

            axios.post(url, formData, config)
            .then(res => {
                if(res.data.errors) {
                    setErr(res.data.errors);
                } else {
                    alert("Thêm sản phẩm thành công");
                }
            })
        }
    }

    return (
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Add product</h2>
                <div class="signup-form">
                    {/* <!--sign up form--> */}
                    <h2>Create product!</h2>
                    <FormError error={getErr} />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" onChange={handleInput} />

                        <input type="number" name="price" placeholder="Price" onChange={handleInput} />

                        <select name="category" onChange={handleInput}>
                            <option value={''} selected>Chọn category</option>
                            {renderSelectCategory()}
                        </select>

                        <select name="brand" onChange={handleInput}>
                            <option value={''} selected>Chọn branch</option>
                            {renderSelectBrand()}
                        </select>

                        <select name="status" onChange={handleInput}>
                            <option value={1} selected>New</option>
                            <option value={0}>Sale</option>
                        </select>
                        {getIsSale === 0 ? (<input type="number" name="sale" onChange={handleInput} />):''}

                        <input type="text" name="company" placeholder="Thông tin công ty" onChange={handleInput} /> 

                        <input type="file" id="image" name="image" multiple onChange={handleFile} />

                        <input type="text" name="detail" placeholder="Detail" onChange={handleInput} />

                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}