import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <div className="flex items-center gap-1 text-white text-xl font-bold mb-3">
                        <BiSolidCameraMovie />
                        <span>MovieApp</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        Discover trending and popular movies from around the world.
                        Built using React, Redux and API.
                    </p>
                </div>

                <div>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-red-500 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites" className="hover:text-red-500 transition">
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-lg">
                        <a href="#" className="hover:text-red-500">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-red-500">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} MovieApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;