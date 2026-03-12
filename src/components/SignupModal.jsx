import { useState } from "react";
import { toast } from "react-toastify";

function SignupModal({ openLogin }) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [errors,setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if(!name.trim()){
      newErrors.name = "Name is required";
    }

    if(!email.trim()){
      newErrors.email = "Email is required";
    } else if(!/\S+@\S+\.\S+/.test(email)){
      newErrors.email = "Invalid email format. @ must be required";
    }

    if(password.length < 6){
      newErrors.password = "Password must be at least 6 characters";
    }

    if(password !== confirmPassword){
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length > 0) return;

    const user = { name,email,password };
    localStorage.setItem("user",JSON.stringify(user));
    toast.success(`${user.name} created successfully`);
    openLogin();

  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-white text-xl mb-5 text-center">Signup</h2>
        <label className="text-gray-300 text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.name ? "border-red-500" : "border-gray-600"}`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-3">{errors.name}</p>
        )}

        <label className="text-gray-300 text-sm">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          onChange={(e)=>setPassword(e.target.value)}
          className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.password ? "border-red-500" : "border-gray-600"}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-3">{errors.password}</p>
        )}

        <label className="text-gray-300 text-sm">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className={`w-full p-2 mt-1 mb-1 rounded bg-gray-700 text-white border
          ${errors.confirmPassword ? "border-red-500" : "border-gray-600"}`}
        />
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
  );
}

export default SignupModal;