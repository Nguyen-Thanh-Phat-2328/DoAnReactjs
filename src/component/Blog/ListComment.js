export default function ListComment(props) {
    const { comment } = props;

    const { setIdCommentCha } = props;

    function renderDataComment() {
        // console.log(comment);
        if (comment.length > 0) {
            const arrCha = comment.filter((value) => {
                return parseInt(value.id_comment) === 0;
            });
            return arrCha.map((valueCha) => {
                //id-commet = 0
                const arrCon = comment.filter((value) => {
                    return parseInt(value.id_comment) === valueCha.id;
                })
                return (
                    <div key={valueCha.id}>
                        <li class="media">
                            <a class="pull-left" href="#">
                                <img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + valueCha.image_user} alt="" />
                            </a>
                            <div class="media-body">
                                <ul class="sinlge-post-meta">
                                    <li><i class="fa fa-user"></i>{valueCha.name_user}</li>
                                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>{valueCha.comment}</p>
                                <a class="btn btn-primary" href="#formComment" onClick={() => setIdCommentCha(valueCha.id)}><i class="fa fa-reply"></i>Replay</a>
                            </div>
                        </li>
                        {/* {idCmtCha === value.id ? <Comment getCmt={getCmt} idCmtCha={idCmtCha}/> : ''} */}
                        {
                            arrCon.map((valueCon) => {
                                return (
                                    <li class="media second-media" key={valueCon.id}>
                                        <a class="pull-left" href="#">
                                            <img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + valueCon.image_user} alt="" />
                                        </a>
                                        <div class="media-body">
                                            <ul class="sinlge-post-meta">
                                                <li><i class="fa fa-user"></i>{valueCon.name_user}</li>
                                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                            </ul>
                                            <p>{valueCon.comment}</p>
                                            <a class="btn btn-primary" href="#formComment" onClick={() => setIdCommentCha(valueCon.id)}><i class="fa fa-reply"></i>Replay</a>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </div>
                )
            })
        }
    }

    // cha  
    // con 

    return (
        <div class="response-area">
            <h2>3 RESPONSES</h2>
            <ul class="media-list">
                {/* <li class="media">

                    <a class="pull-left" href="#">
                        <img class="media-object" src="/frontend/images/blog/man-two.jpg" alt="" />
                    </a>
                    <div class="media-body">
                        <ul class="sinlge-post-meta">
                            <li><i class="fa fa-user"></i>Janis Gallagher</li>
                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
                    </div>
                </li>
                <li class="media second-media">
                    <a class="pull-left" href="#">
                        <img class="media-object" src="/frontend/images/blog/man-three.jpg" alt="" />
                    </a>
                    <div class="media-body">
                        <ul class="sinlge-post-meta">
                            <li><i class="fa fa-user"></i>Janis Gallagher</li>
                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
                    </div>
                </li> */}

                {renderDataComment()}
            </ul>
        </div>
    );
}