import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormError from "./FormError";
import axios from "axios";

//trong file anh bao đặt là Update
export default function Account() {
    const navigate = useNavigate();

    const listNameImageFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];

    const [getInput, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })

    const [getErr, setErr] = useState({});
    const [getAvatar, setAvatar] = useState('');
    const [getFile, setFile] = useState('');

    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput(state => ({ ...state, [nameInput]: valueInput }));
    }

    function handleUserInputFile(e) {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file[0]);
        };
        reader.readAsDataURL(file[0]);
    }

    function checkImageFile(fileName) {
        const arrNameFile = fileName.split('.');
        const imgFile = arrNameFile[arrNameFile.length - 1];

        return listNameImageFile.includes(imgFile);
    }

    function checkEmail(email) {
        const regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regexEmail.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if (getInput.name === '') {
            errorSubmit.name = 'vui lòng nhập tên';
            flag = false;
        }

        if (getInput.email === '') {
            errorSubmit.email = 'Vui lòng nhập email';
            flag = false;
        } else {
            const isEmail = checkEmail(getInput.email);
            if (!isEmail) {
                errorSubmit.email = 'email không hợp lệ';
                flag = false;
            }
        }

        // if (getInput.password === '') {
        //     errorSubmit.password = 'Vui lòng nhập mật khẩu';
        //     flag = false;
        // }

        if (getInput.phone === '') {
            errorSubmit.phone = 'vui lòng nhập số điện thoại';
            flag = false;
        }

        if (getInput.address === '') {
            errorSubmit.address = 'vui lòng nhập địa chỉ';
            flag = false;
        }

        if (getFile !== '') {
            console.log(getAvatar);
            const sizeFile = getFile.size;
            if (sizeFile > 1024 * 1024) {
                errorSubmit.avatar = 'vượt quá kích thước 1mb';
                flag = false;
            } else {
                const isImageFile = checkImageFile(getFile.name);
                if (!isImageFile) {
                    errorSubmit.avatar = 'không phải file ảnh';
                    flag = false;
                }
            }
        }

        if (!flag) {
            setErr(errorSubmit);
        } else {
            setErr({});
            const data = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                avatar: getFile && getAvatar
            }

            let userData = localStorage.getItem("user");
            if(userData) {
                userData = JSON.parse(userData);
                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userData.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };
                userData = userData.Auth;
                axios.post(`http://localhost:8080/laravel8/laravel8/public/api/user/update/${userData.id}`, data, config)
                .then(res => {
                    if(res.data.errors) {
                        setErr(res.data.errors);
                    } else {
                        alert("Update thành công");
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                })
            }
        }
    }

    useEffect(() => {
        let userData = localStorage.getItem("user");

        if (userData) {
            userData = JSON.parse(userData);
            if (!userData) {
                navigate('/login');
            }
            userData = userData.Auth;
            setInput({
                name: userData.name,
                email: userData.email,
                password: '',
                phone: userData.phone,
                address: userData.address
            })
            // setAvatar(userData.avatar);
        }

    }, [])
    return (
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Update user</h2>
                <div class="signup-form">
                    {/* <!--sign up form--> */}
                    <h2>New User Signup!</h2>
                    <FormError error={getErr} />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={getInput.name} placeholder="Name" onChange={handleInput} />
                        <input type="email" name="email" value={getInput.email} placeholder="Email Address" readOnly />
                        <input type="password" name="password" value={getInput.password} placeholder="Nhập password mới nếu muốn đổi" onChange={handleInput} />
                        <input type="text" name="phone" value={getInput.phone} placeholder="0842133757" onChange={handleInput} />
                        <input type="text" name="address" value={getInput.address} placeholder="abc" onChange={handleInput} />
                        <input type="file" name="avatar" onChange={handleUserInputFile} />
                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}