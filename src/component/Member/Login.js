import { useState } from "react";
import FormError from "./FormError";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [err, setErr] = useState({});
    const [getInput, setInput] = useState({
        email: '',
        password: '',
    });

    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput(state => ({...state, [nameInput]:valueInput}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        
        if(getInput.email === '') {
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        }

        if(getInput.password === '') {
            errorSubmit.password = "Vui lòng nhập mật khẩu";
            flag = false;
        }

        if(!flag) {
            setErr(errorSubmit);
        } else {
            setErr({});
            const data = {
                email: getInput.email,
                password: getInput.password,
                level: 0
            }
            axios.post("http://localhost:8080/laravel8/laravel8/public/api/login", data)
            .then(res => {
                if(res.data.errors) {
                    setErr(res.data.errors);
                } else {
                    console.log(res);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
        }
    }
    return (
        <>
            <h2>Login to your account</h2>
            <FormError error={err} />
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />
                <input type="password" name="password" placeholder="Password" onChange={handleInput}  />
                <input type="number" name="level" placeholder="0" onChange={handleInput} />
                <span>
                    <input type="checkbox" class="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
            </form>
        </>
    );
}