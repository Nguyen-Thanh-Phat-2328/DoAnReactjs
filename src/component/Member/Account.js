import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = JSON.parse(localStorage.getItem("user"));
        if(!isLogin) {
            navigate('/login');
        }
    }, [])
    return (
        <>
            Trang account
        </>
    );
}