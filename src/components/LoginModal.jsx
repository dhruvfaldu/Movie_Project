import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/movies/authSlice";
import { toast } from "react-toastify";
import login from "../assets/login.jpg";

function LoginModal({ openSignup }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
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
    } else {
      setErrors({ password: "Invalid email or password" });
    }
  };

  const handleLogin = () => {
    toast.success(`${storedUser.name} Logged in successfully!`);
  }

  return (
    <>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${login})` }}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-white text-2xl mb-2 text-center">Welcome To Movieapp</h3>
            <h2 className="text-white text-xl mb-5 text-center ">Login</h2>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.email ? "border-red-500" : "border-gray-600"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mb-3">{errors.email}</p>
            )}

            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.password ? "border-red-500" : "border-gray-600"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mb-3">{errors.password}</p>
            )}

            <button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded mt-2">
              Login
            </button>

            <p className="text-gray-400 text-sm mt-4 text-center">
              Don't have an account?
              <span
                onClick={openSignup}
                className="text-red-500 ml-1 cursor-pointer hover:underline"
              >
                Signup
              </span>
            </p>

          </form>

        </div>
      </div>
    </>

  );
}

export default LoginModal;