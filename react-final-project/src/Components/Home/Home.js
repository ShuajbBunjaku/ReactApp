import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router";

import Product from "../Products/Product";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // const [localProducts, setLocalProducts] = useState(() => {
  //   const storedData = localStorage.getItem("shoppingCart");
  //   return storedData ? JSON.parse(storedData) : [];
  // });

  useEffect(() => {
    fetch("/products-api/api/products.json")
      .then((res) => res.json())
      .then((json) => (setProducts(json), console.log(json)));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("shoppingCart", JSON.stringify(localProducts));
  // }, [localProducts]);

  // function addToLocal(product) {
  //   setLocalProducts((prevProducts) => {
  //     const exists = prevProducts.some((p) => p.title === product.title);
  //     if (!exists) {
  //       return [...prevProducts, product];
  //     }
  //     return prevProducts;
  //   });
  // }

  const filteredProducts = useMemo(() => {
    return products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, products, pageSize]);

  const numberOfPages = useMemo(() => {
    return Math.ceil(products.length / pageSize);
  }, [products, pageSize]);

  return (
    <div className="flex flex-col m-auto items-center gap-10 w-[1500px]">
      <h1 className="text-3xl">Products</h1>
      <div className="grid place-content-end gap-5 grid-cols-3">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            title={product.name}
            src={product.imageUrl}
            price={product.price}
            // handleOnClick={() => addToLocal(product)}
          />
        ))}
      </div>
      <div className="flex flex-row gap-[2rem] cursor-pointer">
        {new Array(numberOfPages).fill(null).map((_, i) => (
          <NavLink
            className={({ isActive }) =>
              `p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
            key={i}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Home;
