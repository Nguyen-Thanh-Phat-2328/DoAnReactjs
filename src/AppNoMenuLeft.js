import { Outlet } from "react-router-dom";
import Head from "./component/Layout/Head";
import Footer from "./component/Layout/Footer";

export default function AppNoMenuLeft() {
    return (
        <div>
            <Head />
            <Outlet />
            <Footer />
        </div>
    );
}