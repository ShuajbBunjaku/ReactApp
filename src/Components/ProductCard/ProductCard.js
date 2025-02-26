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
    <div className="flex justify-center items-center h-[50vh] ">
      <div className=" flex p-[1rem] gap-[2rem]  h-fit">
        <div className="bg-white rounded-xl">
          <img
            src={`/ReactApp/images/${product.imageUrl}`}
            alt={product.name}
            className="w-[25vw] h-[30vh] object-contain"
          />
        </div>
        <div className="flex items-start py-[3rem] w-[25vw] gap-[1rem] flex-col bg-black text-white">
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
