import { useParams } from "react-router-dom";
import axios from "axios";
import { use, useEffect, useState } from "react";
import FormError from "./FormError";

export default function UpdateProduct(props) {
    // const {idProduct} = props;
    const param = useParams();
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
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/category-brand")
        .then(res => {
            setCategory(res.data.category);
            setBrand(res.data.brand);
        })
        .catch(err => console.log(err));

        axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/my-product", config)
            .then(res => {
                setProduct(res.data.data);
            })
            .catch(err => console.log(err));

    }, [])

    //setInput cho sản phẩm cần update vì api trả về tất cả sản phẩm của user
    useEffect(() => {
        Object.values(getProduct).filter(value => value.id == param.id).map(item => {
            setInput({
                name: item.name,
                price: item.price,
                category: item.id_category,
                brand: item.id_brand,
                status: item.status,
                sale: item.sale,
                company: item.company_profile,
                detail: item.detail
            });

            setIsSale(item.status);
        });
    },[getProduct])

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

    function renderListImageCheck() {
        return Object.values(getProduct).filter(value => value.id == param.id).map(item => {
            const images = JSON.parse(item.image);
            return images.map(((value, index) => {
                return (
                    <div key={index}>
                        <img width={50} height={50} alt="ảnh 1" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + userComment.Auth.id + "/" + value} />
                        <input type="checkbox" value={value} onChange={handleCheckFileImage}/>
                    </div>
                )
            }))
        })
    }

    const [avatarCheckBox, setAvatarCheckBox] = useState([]);

    function handleCheckFileImage(e) {
        if(e.target.checked) {
            setAvatarCheckBox(arr => [...arr, e.target.value]);
        } else {
            setAvatarCheckBox(arr => arr.filter(item => item !== e.target.value));
        }
    }

    // useEffect(() => {
    //     console.log(avatarCheckBox);
    // }, [avatarCheckBox]);
    
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

            let url = 'http://localhost:8080/laravel8/laravel8/public/api/user/product/update/' + param.id;
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
            //ảnh xóa
            avatarCheckBox.map((item, i) => {
                formData.append('avatarCheckBox[]', item);
            })
            //ảnh thêm
            Object.keys(getFile).map((item, i) => {
                formData.append('file[]', getFile[item]);
            })

            axios.post(url, formData, config)
            .then(res => {
                if(res.data.errors) {
                    setErr(res.data.errors);
                } else {
                    alert("Sửa sản phẩm thành công");
                }
            })
        }
    }
    return (
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Update product</h2>
                <div class="signup-form">
                    {/* <!--sign up form--> */}
                    <h2>Update product!</h2>
                    <FormError error={getErr} />
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={getInput.name} name="name" placeholder="Name" onChange={handleInput} />

                        <input type="number" value={getInput.price} name="price" placeholder="Price" onChange={handleInput} />

                        <select name="category" value={getInput.category} onChange={handleInput}>
                            <option value={''}>Chọn category</option>
                            {renderSelectCategory()}
                        </select>

                        <select name="brand" value={getInput.brand} onChange={handleInput}>
                            <option value={''}>Chọn branch</option>
                            {renderSelectBrand()}
                        </select>

                        <select name="status" value={getInput.status} onChange={handleInput}>
                            <option value={1}>New</option>
                            <option value={0}>Sale</option>
                        </select>
                        {getIsSale === 0 ? (<input type="number" value={getInput.sale} name="sale" onChange={handleInput} />) : ''}

                        <input type="text" value={getInput.company} name="company" placeholder="Thông tin công ty" onChange={handleInput} />

                        <input type="file" id="image" name="image" multiple onChange={handleFile} />

                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {renderListImageCheck()}
                        </div>

                        <input type="text" value={getInput.detail} name="detail" placeholder="Detail" onChange={handleInput} />

                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}