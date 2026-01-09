import { useState } from "react";
import { useParams } from "react-router-dom";
import FormError from "../Member/FormError";
import axios from "axios";

export default function Comment(props) {
    const {getCmt} = props;
    const {idCmtCha} = props;
    const {setIdCommentCha} = props;

    let params = useParams();

    const [getErr, setErr] = useState({});

    const [getInput, setInput] = useState({
        comment: ''
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
        const userComment = JSON.parse(localStorage.getItem('user'));

        if(getInput.comment === '') {
            errorSubmit.comment = 'Vui lòng nhập comment';
            flag = false;
        }

        if(!userComment) {
            alert('Vui lòng đăng nhập để comment');
        } else {
            if(!flag) {
                setErr(errorSubmit);
            } else {
                setErr({});
                let url = 'http://localhost:8080/laravel8/laravel8/public/api/blog/comment/' + params.id

                let config = {
                    headers: {
                        'Authorization': 'Bearer '+ userComment.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };
            
                const formData = new FormData();
                formData.append('id_blog', params.id);
                formData.append('id_user', userComment.Auth.id);
                formData.append('name_user', userComment.Auth.name);
                formData.append('id_comment', idCmtCha === 0 ? 0 : idCmtCha);
                formData.append('comment', getInput.comment);
                formData.append('image_user', userComment.Auth.avatar);

                axios.post(url, formData, config)
                .then(res => {
                    if(res.data.errors) {
                        setErr(res.data.errors);
                    } else {
                        getCmt(res.data.data);
                        setIdCommentCha(0);
                    }
                })
                .catch(err => console.log(err));
            }
        }
    }
    return (
        <div class="replay-box" id="formComment">
            <div class="row">
                <div class="col-sm-12">
                    <h2>Leave a replay</h2>
                    <FormError error={getErr} />

                    <div class="text-area">
                        <div class="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea name="comment" rows="11" onChange={handleInput}></textarea>
                        <a class="btn btn-primary" href="" onClick={handleSubmit}>post comment</a>
                    </div>
                </div>
            </div>
        </div>
    );
}