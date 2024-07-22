import { Routes, Route } from "react-router-dom";
import Home from "../component/page/Home.jsx";
import About from "../component/page/About.jsx";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
import Error from "../component/Error.jsx";
const RoutePage = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about/:subpage?" element={<About />} />


                <Route path="*" element={<Error />} />
            </Routes>

        </>
    )
}
export default RoutePage;