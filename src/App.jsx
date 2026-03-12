import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { useSelector } from "react-redux";
const Home = lazy(() => import("./pages/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Layout = lazy(() => import("./Layout"));
const LoginModal = lazy(() => import("./components/LoginModal"));
const SignupModal = lazy(() => import("./components/SignupModal"))
import { Flip, Slide, ToastContainer } from 'react-toastify';

function App() {

  const user = useSelector((state) => state.auth.user);
  const [mode, setMode] = useState("login");
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div className="flex justify-center items-center text-3xl text-white bg-gray-900 h-screen">Loading...</div>}>
          {!user && mode === "login" &&
            <LoginModal openSignup={() => setMode("signup")} />
          }

          {!user && mode === "signup" &&
            <SignupModal openLogin={() => setMode("login")} />
          }
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <ToastContainer position="top-right" autoClose={2000} theme="light" transition={Flip} />
    </BrowserRouter>
  );
}

export default App;