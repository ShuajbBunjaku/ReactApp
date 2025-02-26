function Product({
  handleOnClick,
  viewProduct,
  imageUrl,
  title,
  desc,
  price,
  cart,
}) {
  return (
    <div>
      <div
        className="flex flex-col items-center shadow-md p-[2rem] border-2 rounded-xl cursor-pointer bg-white"
        onClick={viewProduct}
      >
        <img
          className="w-48 w-[300px] h-[200px] object-contain"
          src={`/ReactApp/images/${imageUrl}`}
          alt={title}
        ></img>
        <div className="flex flex-col h-[100px]  justify-between text-center">
          <h2 className="text-2xl text-black">{title}</h2>
          <p className="w-[250px] ">{desc}</p>
          <p className="text-2xl text-black flex justify-center ">{price}$</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
