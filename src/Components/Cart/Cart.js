import { useEffect, useState } from "react";
import Porduct from "../Products/Product";

function Cart() {
  const [products, setProducts] = useState([]);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = products.reduce(
      (sum, productIndex) => sum + (productIndex.price || 0),
      0
    );
    setTotal(calculatedTotal);
  }, [products]);

  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

    setProducts(shoppingCart);
  }, []);

  function handleRemove(product) {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.indexOf((p) => p.id === product.id);

      if (productIndex === false) return prevProducts;

      const updatedProducts = [...prevProducts];
      updatedProducts.splice(productIndex, 1);

      localStorage.setItem("shoppingCart", JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-[3rem]">
      <div className="flex justify-center flex-col items-center  gap-10">
        <h1 className="text-3xl ">
          {products.length === 0 ? "No Porducts In cart" : "Product"}
        </h1>
        <div className="flex justify-center flex-col items-center gap-5 ">
          {products.map((product) => (
            <div
              className="text-white flex items-center justify-between p-[1rem] border border-white w-[80vw]"
              key={product.id}
            >
              <img
                src={`/ReactApp/images/${product.imageUrl}`}
                className="w-[100px] object-fit"
              ></img>
              <p className="flex ">{product.name}</p>
              <div>
                <button
                  className="px-20 py-3 border border-white text-[#855DFF]  cursor-pointer"
                  onClick={() => {
                    handleRemove(product);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {products.length !== 0 ? (
        <>
          <hr className="w-[80vw]" />
          <div className="w-[80vw] flex justify-end gap-[2rem]">
            <h1 className="text-3xl text-[#855DFF]">{Math.ceil(total)}$</h1>
            <button
              className="px-20 py-3 border border-white text-[#855DFF] cursor-pointer"
              onClick={() => {
                let checkOutArray = [];
                setProducts(checkOutArray);
                localStorage.setItem(
                  "shoppingCart",
                  JSON.stringify(checkOutArray)
                );
              }}
            >
              Check Out
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Cart;
