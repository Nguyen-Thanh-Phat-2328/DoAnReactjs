import Login from "./Login";
import Register from "./Register";

export default function IndexMember() {
    return (
        <section id="form">
            {/* <!--form--> */}
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 col-sm-offset-1">
                        <div class="login-form">
                            {<Login />}
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <h2 class="or">OR</h2>
                    </div>
                    <div class="col-sm-4">
                        <div class="signup-form">
                            {<Register />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}