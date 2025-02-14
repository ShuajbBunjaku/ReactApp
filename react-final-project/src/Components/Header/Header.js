import { useEffect, useState } from "react";
import { NavLink } from "react-router";

function Header() {
  const [arrayLength, setArrayLength] = useState(0);
  const [arrayFromStorage, setArrayFromStorage] = useState([]);

  useEffect(() => {
    const storedArray = localStorage.getItem("shoppingCart");
    if (storedArray) {
      const parsedArray = JSON.parse(storedArray);
      setArrayFromStorage(parsedArray);
    }
  }, []);

  return (
    <header className="flex justify-between items-center bg-white shadow-md py-4 px-10">
      <img className="w-20" src="/images/logo.png" alt="Logo" />

      <nav>
        <ul className="list-none flex gap-20">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                  isActive ? "bg-blue-800" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                  isActive ? "bg-blue-800" : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                `p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                  isActive ? "bg-blue-800" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                  isActive ? "bg-ble-800" : ""
                }`
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>

      <NavLink to="/Cart" className="relative">
        <img
          className="w-10 "
          src=".images/shoppingCart.png"
          alt="Shopping Cart"
        />
        {arrayLength === 0 ? (
          ""
        ) : (
          <span className="absolute  top-0 -right-1 text-white bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
            {arrayLength}
          </span>
        )}
      </NavLink>
    </header>
  );
}

export default Header;
