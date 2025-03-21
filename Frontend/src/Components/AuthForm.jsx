import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex, ToastContainer } from "../utils/common";
import { userLogin, userRegistration } from "../Actions/Actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh, setuserData } from "../redux/slice";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const AuthForm = ({ type }) => {

    const init = { email: "", password: "", username: "" }
    const [formValue, setFormValue] = useState(init);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { userData, refresh } = useSelector(state => state?.user);


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const validation = async () => {
        let error = {};
        const { username, password, email } = formValue;

        if (type === "register" && !username) {
            error.username = 'Name is required';
        }

        if (!password) {
            error.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            error.password = 'Password must contain at least one uppercase letter, one number, one special character, and be between 8 to 12 characters long';
        }

        if (!email) {
            error.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            error.email = 'Invalid email format';
        }

        setErrors(error);
        return Object.keys(error).length > 0;
    };

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validation();
        if (isValid) {
            console.log("Form Submitted with values:", formValue);
            return
        }

        if (type === "register") onRegister();
        else if (type === "login") onLogin();

    };


    const onRegister = async () => {
        const id = ToastContainer("loading", "Please wait...");
        setLoading(true)
        const resp = await userRegistration(formValue);
        console.log("resp", resp);
        ToastContainer(resp?.status, resp?.message, { id })
        if (resp?.status == "success") {
            setTimeout(() => {
                setFormValue(init)
                navigate('/login');
                setLoading(false);
            }, 1000);
        } else {
            setLoading(false)
        }
    }


    const onLogin = async () => {
        const id = ToastContainer("loading", "Please wait...");
        setLoading(true)
        const resp = await userLogin(formValue);
        console.log("resp on login", resp);
        ToastContainer(resp?.status, resp?.message, { id })
        if (resp?.status == "success") {
            dispatch(setuserData({ ...formValue, username: resp?.data?.user }));
            dispatch(setRefresh(!refresh))
            setTimeout(() => {
                setFormValue(init)
                navigate('/summary');
                setLoading(false)
            }, 1000);
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
            <div className="w-100 p-4" style={{ maxWidth: '400px', background: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-center mb-4">{type === "login" ? "Login" : "Register"}</h2>
                <form onSubmit={onSubmit}>
                    {type === "register" && (
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                name="username"
                                className="form-control"
                                placeholder="Enter name"
                                value={formValue.username}
                                onChange={onHandleChange}
                            />
                            {errors.username && <p className="text-danger small">{errors.username}</p>}
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formValue.email}
                            onChange={onHandleChange}
                            placeholder="Enter mail"
                        />
                        {errors.email && <p className="text-danger small">{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                value={formValue.password}
                                onChange={onHandleChange}
                                placeholder="Enter Password"
                            />
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errors.password && <p className="text-danger small">{errors.password}</p>}
                    </div>
                    <button className="btn btn-primary w-100">
                        {type === "login" ? "Login" : "Register"}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    {type === "login" ? "Don't have an account? " : "Already have an account? "}
                    <Link onClick={() => setFormValue(init)} to={type === "login" ? "/register" : "/login"} className="text-primary">
                        {type === "login" ? "Register" : "Login"}
                    </Link>
                </p>

                {/* <p className="mt-3 text-center">
                    <Link to={"/summary"} className="text-primary">
                        summary                    </Link>
                </p> */}

            </div>
        </div>
    );
}

export default AuthForm