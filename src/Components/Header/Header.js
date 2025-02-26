import { useEffect, useState } from "react";
import { NavLink } from "react-router";

function Header() {
  const [arrayLength, setArrayLength] = useState(0);
  const [arrayFromStorage, setArrayFromStorage] = useState([]);

  useEffect(() => {
    let storedArray;
    setInterval(() => {
      storedArray = JSON.parse(localStorage.getItem("shoppingCart"));
      setArrayLength(storedArray.length);
    }, 100);

    setArrayFromStorage(storedArray);
  }, []);

  return (
    <header className="flex justify-between items-center border-white border  shadow-md m-10 p-3 px-10 rounded-3xl">
      <NavLink to="/home">
        <h1>Shuajb</h1>
      </NavLink>

      <nav>
        <ul className="list-none flex gap-20">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `p-2  ${isActive ? "underline" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-2  ${isActive ? "underline" : ""}`
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>

      <NavLink to="/Cart" className="relative">
        <img
          className="w-10 text"
          src="/ReactApp/images/cart.png"
          alt="Shopping Cart"
        />
        {arrayLength === 0 ? (
          ""
        ) : (
          <span className="absolute  top-0 -right-1  text-white bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
            {arrayLength}
          </span>
        )}
      </NavLink>
    </header>
  );
}

export default Header;
