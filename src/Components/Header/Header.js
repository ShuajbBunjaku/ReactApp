import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Fix import

function Header() {
  const [arrayLength, setArrayLength] = useState(0);

  useEffect(() => {
    function updateCart() {
      const storedArray =
        JSON.parse(localStorage.getItem("shoppingCart")) || [];
      setArrayLength(storedArray.length);
    }

 

    updateCart();

    const interval = setInterval(() => {
      updateCart();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center border-white border flex-wrap shadow-md m-5 p-4 px-6 rounded-3xl gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
      <NavLink to="/home">
        <h1 className="text-xl font-semibold">Shuajb</h1>
      </NavLink>

      <nav className="max-sm:w-full">
        <ul className="list-none flex gap-10 max-sm:gap-6 max-sm:flex-wrap max-sm:justify-center">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `p-2 text-lg ${isActive ? "underline" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-2 text-lg ${isActive ? "underline" : ""}`
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>

      <NavLink to="/Cart" className="relative flex items-center">
        <img
          className="w-10 max-sm:w-8"
          src="/ReactApp/images/cart.png"
          alt="Shopping Cart"
        />
        {arrayLength !== 0 && (
          <span className="absolute top-0 -right-2 text-white bg-red-500 rounded-full w-5 h-5 text-xs flex justify-center items-center max-sm:w-4 max-sm:h-4">
            {arrayLength}
          </span>
        )}
      </NavLink>
    </header>
  );
}

export default Header;
