import { useEffect, useState, useMemo } from "react";

import Product from "../Products/Product";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [viewedProduct, setViewedProduct] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    fetch("/ReactApp/api/products.json")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
    fetch("/ReactApp/api/categories.json")
      .then((res) => res.json())
      .then((json) => {
        setProductsCategory(json);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 0) {
      return products;
    }

    const childCategories = productsCategory
      .filter((product) => product.parent === selectedCategory)
      .map((product) => product.id);

    setCurrentPage(1);

    return products.filter(
      (product) =>
        product.categoryId === selectedCategory ||
        childCategories.some((childId) => childId === product.categoryId)
    );
  }, [products, selectedCategory, productsCategory]);

  const paginatedFilteredProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [currentPage, filteredProducts]);

  const numberOfPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / pageSize);
  }, [filteredProducts]);

  return (
    <div className="flex flex-col m-auto items-center gap-10 w-[78vw] my-0">
      <section className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <p className="text-gray-600">
          This is your category description. It’s a great place to tell
          customers what this category is about.
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-3 w-full">
        <p
          className={`cursor-pointer px-4 py-2 border rounded-xl  my-2  ${
            selectedCategory === 0
              ? "text-[#855DFF] border-[#855DFF]"
              : "border-gray-300"
          }`}
          onClick={() => {
            setTimeout(() => {
              setSelectedCategory(0);
            }, 0);
          }}
        >
          All
        </p>
        {productsCategory.map((p) => (
          <p
            className={`cursor-pointer px-4 py-2 border rounded-xl  my-2 ${
              selectedCategory === p.id
                ? "text-[#855DFF] border-[#855DFF]"
                : "border-gray-300"
            }`}
            key={p.id}
            onClick={() => {
              setTimeout(() => {
                setSelectedCategory(p.id);
              }, 0);
            }}
          >
            {p.name}
          </p>
        ))}
      </div>
      <div className="grid w-full gap-4 grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2 max-lg:grid-cols-2 max-lg:grid-cols-3">
        {paginatedFilteredProducts.map((product) => (
          <Product
            key={product.id}
            title={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            viewProduct={() => {
              navigate(`/product/${product.id}`);
            }}
          />
        ))}
      </div>
      {numberOfPages > 1 ? (
        <div className="flex flex-row gap-[0.5rem] flex-wrap  ">
          <p
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((currentPage) => currentPage - 1);
              }
            }}
            className="px-5 py-3 border rounded-md cursor-pointer"
          >
            Previous
          </p>
          {new Array(numberOfPages).fill(null).map((_, i) => (
            <NavLink
              className={`px-5 py-3 border rounded-md cursor-pointer ${
                currentPage === i + 1 && "text-[#855DFF]"
              }`}
              key={i}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </NavLink>
          ))}
          <p
            onClick={() => {
              if (currentPage < numberOfPages) {
                setCurrentPage((currentPage) => currentPage + 1);
              }
            }}
            className="px-5 py-3 border rounded-md cursor-pointer"
          >
            Next
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
