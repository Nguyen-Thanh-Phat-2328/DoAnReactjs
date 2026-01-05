import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/blog")
        .then(res=>{
            console.log(res.data.blog.data)
            setBlogs(res.data.blog.data)
        })
        .catch(error => console.log(error));
    },[])

    const renderBlog = () => {
        if(blogs.length > 0) {
            return blogs.map((value, key) => {
                return (
                    <div className="single-blog-post" key={key}>
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <a href="">
                            <img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/" + value.image} alt="" />
                        </a>
                        <p>{value.description}</p>
                        <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                    </div>
                );
            })
        }
    }
    return (
        <>
            <div class="col-sm-9">
                <div class="blog-post-area">
                    <h2 class="title text-center">Latest From our Blog</h2>

                    {renderBlog()}
                    
                    <div class="pagination-area">
                        <ul class="pagination">
                            <li><a href="" class="active">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                            <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}