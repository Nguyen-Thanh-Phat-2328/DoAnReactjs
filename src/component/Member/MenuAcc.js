import { Link } from "react-router-dom";

export default function MenuAcc() {
    return (
        <div class="col-sm-3">
            <div class="left-sidebar">
                <h2>Account</h2>
                <div class="panel-group category-products" id="accordian">
                    {/* <!--category-productsr--> */}


                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to={"/account"}>account</Link></h4>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to={"/account/product"}>My product</Link></h4>
                        </div>
                    </div>

                </div>
                {/* <!--/category-products--> */}


            </div>
        </div>
    )
}