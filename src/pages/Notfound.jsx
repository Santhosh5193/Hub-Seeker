import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="hero">
      <div className="hero-content text-center ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-8xl mb-8 font-bold">Oops!</h1>
          <p className="text-5xl mb-8">404 - Page not Found</p>
          <Link
            to="/"
            className="btn flex items-center w-1/2 bg-gray-400 text-white text-base hover:bg-slate-400"
          >
            <FaHome className="mr-2" />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
