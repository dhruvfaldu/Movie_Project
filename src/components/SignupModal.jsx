import { useState } from "react";
import { toast } from "react-toastify";
import login from "../assets/Login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignupModal({ openLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format. @ must be required";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${login})` }}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
          <h2 className="text-white text-xl mb-5 text-center">Signup</h2>
          <label className="text-gray-300 text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.name ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mb-3">{errors.name}</p>
          )}

          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.email ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mb-3">{errors.email}</p>
          )}

          <label className="text-gray-300 text-sm">Password</label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
    ${errors.password ? "border-red-500" : "border-gray-600"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword({password: !showPassword.password})}
              className="absolute right-3 top-4 text-gray-400 cursor-pointer"
            >
              {showPassword.password ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mb-3">{errors.password}</p>
          )}

          <label className="text-gray-300 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password..."
              className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
    ${errors.confirmPassword ? "border-red-500" : "border-gray-600"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword({confirmPassword: !showPassword.confirmPassword})}
              className="absolute right-3 top-4 text-gray-400 cursor-pointer"
            >
              {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-3">{errors.confirmPassword}</p>
          )}

          <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded mt-2">
            Signup
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have account?
            <span
              onClick={openLogin}
              className="text-red-500 ml-1 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default SignupModal;

//mare ama password ma eye button add karvu chhe ke user eye button click kare to password show karvu chhe real form type comform password ma show karvu chhe ma bhi