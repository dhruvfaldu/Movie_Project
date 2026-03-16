import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import login from "../assets/Login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

function SignupModal({ openLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const validateField = (field, value) => {

    let error = "";

    if (field === "name") {
      if (!value.trim()) {
        error = "Name is required";
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      }
      else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (field === "password") {

      if (value.length < 8) {
        error = "Password must be at least 8 characters";
      }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)) {
        error = "Password must contain uppercase, lowercase, number and special character";
      }

      if (confirmPassword && value !== confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords do not match"
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ""
        }));
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        error = "Confirm password is required";
      }else if (value !== password) {
        error = "Passwords do not match";
      }
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    toast.success(`${user.name} created successfully`);
    openLogin();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg"
        >
          <div className="flex flex-col items-center gap-2 text-white text-xl mb-3">
            <span className="bg-red-500 px-2 py-2 rounded-full">
              <BiSolidCameraMovie />
            </span>
            <p>Sign Up</p>
          </div>

          <label className="text-gray-300 text-sm">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name..."
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
            className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
            ${errors.name && touched.name ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs mb-3">{errors.name}</p>
          )}

          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
            ${errors.email && touched.email ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mb-3">{errors.email}</p>
          )}

          <label className="text-gray-300 text-sm">Password</label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              value={password}
              placeholder="Enter your password..."
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              className={`w-full p-2 pr-10 mt-1 mb-1 rounded bg-gray-700 text-white border
              ${errors.password && touched.password ? "border-red-500" : "border-gray-600"}`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password
                })
              }
              className="absolute right-3 top-4 text-gray-400"
            >
              {showPassword.password ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mb-3">{errors.password}</p>
          )}

          <label className="text-gray-300 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm your password..."
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
              onBlur={() =>
                setTouched(prev => ({ ...prev, confirmPassword: true }))
              }
              className={`w-full p-2 pr-10 mt-1 mb-1 rounded bg-gray-700 text-white border
              ${errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-600"}`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword
                })
              }
              className="absolute right-3 top-4 text-gray-400"
            >
              {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs mb-3">
              {errors.confirmPassword}
            </p>
          )}

          <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded mt-2">
            Signup
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have account?
            <Link to="/login">
              <span
                onClick={openLogin}
                className="text-red-500 ml-1 cursor-pointer hover:underline"
              >
                Login
              </span>
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default SignupModal;

