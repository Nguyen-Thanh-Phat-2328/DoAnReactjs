import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";

export default function Detail(props) {
	let params = useParams();

	const [data, setData] = useState({});
	const [comment, setComment] = useState([]);
	const [idCmtCha, setIdCmtCha] = useState(0);

	useEffect(() => {
		// callApiBlogDetail();
		axios.get('http://localhost:8080/laravel8/laravel8/public/api/blog/detail/' + params.id)
		.then(res=>{
			setData(res.data.data);
			setComment(res.data.data.comment);
		})
		.catch(error => console.log(error));
	},[])

	// function callApiBlogDetail() {
	// 	axios.get('http://localhost:8080/laravel8/laravel8/public/api/blog/detail/' + params.id)
	// 	.then(res=>{
	// 		setData(res.data.data);
	// 		setComment(res.data.data.comment);
	// 	})
	// 	.catch(error => console.log(error));
	// }

	function getCmt(data) {
		console.log(data);
		const listComment = [data, ...comment];
		setComment(listComment);
		// setComment(state => ([data, ...state]));
	}

	function setIdCommentCha(idCmtCha) {
		setIdCmtCha(idCmtCha);
	}

    return (
        <>
            <div class="col-sm-9">
					<div class="blog-post-area">
						<h2 class="title text-center">Latest From our Blog</h2>
						<div class="single-blog-post">
							<h3>{data.title}</h3>
							
							<div class="post-meta">
								<ul>
									<li><i class="fa fa-user"></i> Mac Doe</li>
									<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
								</ul>
								{/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
							</div>

							<a href="">
								<img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt="" />
							</a>

							<div dangerouslySetInnerHTML={{ __html:data.content }}>
							</div>

							<div class="pager-area">
								<ul class="pager pull-right">
									<li><a href="#">Pre</a></li>
									<li><a href="#">Next</a></li>
								</ul>
							</div>
						</div>
					</div>
                    {/* <!--/blog-post-area--> */}

					<Rate />

					<div class="socials-share">
						<a href=""><img src="/frontend/images/blog/socials.png" alt="" /></a>
					</div>                    

					<ListComment setIdCommentCha={setIdCommentCha} getCmt={getCmt} comment={comment} />
					
					{/* <Comment updateUIComment={callApiBlogDetail} /> */}
					<Comment getCmt={getCmt} setIdCommentCha={setIdCommentCha} idCmtCha={idCmtCha}/>

				</div>
        </>
    );
}