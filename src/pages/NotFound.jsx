import { Link } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";

function NotFound() {
    return (
        <>
            <div className="flex justify-center items-center text-white bg-gray-900 h-screen">
                <div className="h-1/3 w-1/2 flex justify-center items-center bg-gray-800 rounded-2xl">
                    <div className="flex flex-col justify-center items-center gap-6">
                        <span className="bg-red-500 px-2 py-2 rounded-full">
                            <BiSolidCameraMovie className="text-4xl"/>
                        </span>
                        <h2 className="text-3xl">404 Page Not Found</h2>
                        <div className="">
                            <Link to="/">
                                <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                    Go back to Home
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default NotFound;