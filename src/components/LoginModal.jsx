import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/movies/authSlice";
import { toast } from "react-toastify";
import login from "../assets/Login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function LoginModal({ openSignup }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const validateField = (field, value) => {
    let error = "";

    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format. @ must be required";
      }

    }
    if (field === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        error = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });
    
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format. @ must be required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setErrors({ email: "User not found. Please signup first" });
      return;
    }
    if (storedUser.email === email && storedUser.password === password) {
      dispatch(loginUser(storedUser));
      navigate("/");
    } else {
      setErrors({ password: "Invalid email or password" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${login})` }}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
            <div className="flex flex-col items-center justify-center gap-2 text-white text-xl mb-2 text-center">
              <span className="bg-red-500 px-2 py-2 rounded-full">
                <BiSolidCameraMovie />
              </span>
              <p>Welcome To Movieapp</p>
            </div>

            <h2 className="text-white text-xl mb-5 text-center ">Login</h2>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              onBlur={(e) => setTouched({ ...touched, email: true })}
              placeholder="Enter your email..."
              className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.email ? "border-red-500" : "border-gray-600"}`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mb-3">{errors.email}</p>
            )}

            <label className="text-gray-300 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField("password", e.target.value);
                }}
                onBlur={(e) => setTouched({ ...touched, password: true })}
                placeholder="Enter your password..."
                className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
    ${errors.password ? "border-red-500" : "border-gray-600"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs mb-3">{errors.password}</p>
            )}

            {/* <Link to="/" className="text-gray-400 text-sm mt-4 text-center"> */}
            <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded mt-2">
              Login
            </button>
            {/* </Link> */}

            <p className="text-gray-400 text-sm mt-4 text-center">
              Don't have an account?
              <Link to="/signup" className="text-red-500 hover:text-red-600 transition">
                <span
                  onClick={openSignup}
                  className="text-red-500 ml-1 cursor-pointer hover:underline"
                >
                  Signup
                </span>
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>

  );
}

export default LoginModal;