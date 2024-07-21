import { Routes, Route } from "react-router-dom";
import Home from "../component/page/Home.jsx";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
const RoutePage = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </>
    )
}
export default RoutePage;