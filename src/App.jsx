import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
const Home = lazy(() => import("./pages/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Layout = lazy(() => import("./Layout"));
const LoginModal = lazy(() => import("./components/LoginModal"));
const SignupModal = lazy(() => import("./components/SignupModal"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { Flip, ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div className="flex justify-center items-center text-3xl text-white bg-gray-900 h-screen">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<PublicRoute><LoginModal /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignupModal /></PublicRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="*" element={<NotFound />} />
              <Route index element={<Home />} />
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