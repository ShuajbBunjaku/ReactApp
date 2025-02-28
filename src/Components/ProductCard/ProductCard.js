import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductCard() {
  const [product, setProduct] = useState([]);
  const [added, setIsAdded] = useState(false);

  const [localProducts, setLocalProducts] = useState(() => {
    const storedCart = localStorage.getItem("shoppingCart");

    return !storedCart ? [] : JSON.parse(storedCart);
  });

  const { id } = useParams();

  function addToLocal(product) {
    setLocalProducts((prevProduct) => {
      if (prevProduct.some((p) => p.id === product.id)) {
        return prevProduct;
      } else {
        return [...prevProduct, product];
      }
    });
  }

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(localProducts));
  }, [localProducts]);

  useEffect(() => {
    fetch(`/ReactApp/api/products/${id}.json`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        console.log(json);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center h-[70vh] max-sm:h-fit max-lg:h-fit">
      <div className=" flex p-[1rem] gap-[2rem]  flex-row h-fit max-sm:flex-col max-lg:flex-col">
        <div className="bg-white rounded-xl flex justify-center items-center">
          <img
            src={`/ReactApp/images/${product.imageUrl}`}
            alt={product.name}
            className="w-[35vw] h-[40vh] max-sm:w-fit max-lg:w-fit object-contain"
          />
        </div>
        <div className="flex items-start py-[3rem] w-[25vw] h-[40vh] max-sm:w-fit max-sm:items-center max-lg:w-fit max-lg:items-center  gap-[1rem] flex-col justify-center bg-black text-white">
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button
            className="px-20 py-3 border border-white text-[#855DFF]  cursor-pointer"
            onClick={() => {
              setIsAdded(true);
              addToLocal(product);
            }}
          >
            {localProducts.some((p) => p.id === product.id)
              ? "Added to Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
