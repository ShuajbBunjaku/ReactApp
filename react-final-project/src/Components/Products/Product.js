function Porduct({ handleOnClick, src, title, desc, price, cart }) {
  return (
    <div>
      <div className="flex flex-col items-center shadow-md w-[350px] p-[2rem] border-2 border-sky-500">
        <img className="w-48 w-[300px] h-[200px]" src={src} alt={title}></img>
        <div className="flex flex-col h-[232px]  justify-between text-center">
          <h2 className="text-2xl">{title}</h2>
          <p className="w-[250px] ">{desc}</p>
          <p className="text-2xl">
            Price: <span className="text-blue-600">{price}$</span>
          </p>
          <div className="flex items-center justify-center gap-[1rem] pl-[2rem] pr-[2rem]">
            {cart ? (
              <button
                className="w-[100px] rounded-2xl bg-blue-500 hover:bg-blue-600"
                onClick={handleOnClick}
              >
                Remove
              </button>
            ) : (
              <>
                <button className="w-[100px] rounded-2xl bg-blue-500 hover:bg-blue-600">
                  Buy Now
                </button>
                <button
                  className="w-[100px] rounded-2xl bg-blue-500 hover:bg-blue-600"
                  onClick={handleOnClick}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Porduct;
