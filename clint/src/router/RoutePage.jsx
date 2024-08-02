import { Routes, Route } from "react-router-dom";
import Home from "../component/page/Home.jsx";
import About from "../component/page/About.jsx";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
import Error from "../component/Error.jsx";
import { UseAuth } from "../Auth.jsx";
const RoutePage = () => {
    const { isLoggedIn } = UseAuth();
    return (
        <>
            <Routes >
                {
                    !isLoggedIn ?
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route path="*" element={<Error />} />

                        </>
                        :
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about/:subpage?" element={<About />} />
                            <Route path="/about/:subpage/:action" element={<About />} />

                            <Route path="*" element={<Error />} />
                        </>
                }
            </Routes>

        </>
    )
}
export default RoutePage;