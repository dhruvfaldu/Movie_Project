import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
    return (
        <>
        <div className="bg-gray-950 min-h-screen text-white px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
        </>
    )
}

export default Layout;