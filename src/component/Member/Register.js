import { useState } from "react";
import FormError from "./FormError";
import axios from "axios";

export default function Register() {
    const listNameImageFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG']

    const [getInput, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        number: '',
    });
    const [err, setErr] = useState({})
    const [getFile, setFile] = useState('')
    const [getAvatar, setAvatar] = useState('');

    function handleUserInputFile(e) {
        const file = e.target.files;

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result); //gửi qua api
            setFile(file[0]); // lưu thông tin file để xử lý
        };
        reader.readAsDataURL(file[0]);
    }
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;

        setInput(state => ({...state, [nameInput]:valueInput}));
    }

    function checkImageFile(fileName) {
        const arrNameFile = fileName.split('.');
        const imgFile = arrNameFile[arrNameFile.length - 1];

        return listNameImageFile.includes(imgFile);
    }

    function checkEmail(email) {
        const regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(regexEmail.test(email)){
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if(getInput.name === '') {
            errorSubmit.name = 'vui lòng nhập tên';
            flag = false;
        }

        if(getInput.email === '') {
            errorSubmit.email = 'Vui lòng nhập email';
            flag = false;
        } else {
            const isEmail = checkEmail(getInput.email);
            if(!isEmail) {
                errorSubmit.email = 'email không hợp lệ';
                flag = false;
            }
        }

        if(getInput.password === ''){
            errorSubmit.password = 'Vui lòng nhập mật khẩu';
            flag = false;
        }

        if(getInput.phone === '') {
            errorSubmit.phone = 'vui lòng nhập số điện thoại';
            flag = false;
        }

        if(getInput.address === '') {
            errorSubmit.address = 'vui lòng nhập địa chỉ';
            flag = false;
        }

        if(getFile === '') {
            errorSubmit.avatar = 'vui lòng chọn file ảnh avatar';
            flag = false;
        } else {
            console.log(getAvatar);
            const sizeFile = getFile.size;
            if(sizeFile > 1024 * 1024){
                errorSubmit.avatar = 'vượt quá kích thước 1mb';
                flag = false;
            } else {
                const isImageFile = checkImageFile(getFile.name);
                if(!isImageFile) {
                    errorSubmit.avatar = 'không phải file ảnh';
                    flag = false;
                }
            }
        } 

        if(!flag) {
            setErr(errorSubmit);
        } else {
            setErr({});
            const data = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                avatar: getAvatar,
                level: 0
            }

            axios.post("http://localhost:8080/laravel8/laravel8/public/api/register", data)
            .then(res => {
                if(res.data.errors) {
                    setErr(res.data.errors);
                } else {
                    alert("Dăng ký thành công");
                }
            })
        }
    }

    return (
        <>
            <h2>New User Signup!</h2>
            <FormError error={err} />
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleInput} />
                <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />
                <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                <input type="text" name="phone" placeholder="0842133757" onChange={handleInput} />
                <input type="text" name="address" placeholder="abc" onChange={handleInput} />
                <input type="file" name="avatar" onChange={handleUserInputFile} />
                <input type="number" name="level" placeholder="0" onChange={handleInput} />
                <button type="submit" className="btn btn-default">Signup</button>
            </form>
        </>
    );
}