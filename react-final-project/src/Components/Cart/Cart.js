import { useEffect, useState } from "react";
import Porduct from "../Products/Product";

function Cart() {
  const [products, setProducts] = useState([]);
  let [total, setTotal] = useState(0);
  useEffect(() => {
    function updateCart() {
      const shoppingCart = localStorage.getItem("shoppingCart");
      const parsedProducts = shoppingCart ? JSON.parse(shoppingCart) : [];

      if (!Array.isArray(parsedProducts)) return;

      setProducts(parsedProducts);

      const calculatedTotal = parsedProducts.reduce(
        (sum, product) => sum + (product.price || 0),
        0
      );
      setTotal(calculatedTotal);
    }

    updateCart();

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  function handleRemove(product) {
    setProducts((prevProducts) => {
      const filteredProducts = prevProducts.filter(
        (p) => p.title !== product.title
      );

      localStorage.setItem("shoppingCart", JSON.stringify(filteredProducts));

      return filteredProducts;
    });
  }

  return (
    <div className="flex flex-col m-auto items-center gap-10 w-[1500px]">
      <h1 className="text-3xl">Products</h1>
      <div className="flex gap-5 justify-center flex-wrap">
        {products.map((product) => (
          <Porduct
            title={product.title}
            src={product.image}
            desc={product.desc}
            price={product.price}
            handleOnClick={() => {
              handleRemove(product);
            }}
            cart={true}
          />
        ))}
      </div>
      <h1 className="text-3xl text-blue-600">{Math.ceil(total)}$</h1>
    </div>
  );
}

export default Cart;
