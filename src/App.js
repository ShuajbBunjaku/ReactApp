import { HashRouter, Routes, Route } from "react-router";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import LogIn from "./Components/LogIn/LogIn";
import PageNotFound from "./Components/PageNotFound/error";
import ProductCard from "./Components/ProductCard/ProductCard";

export default function App() {
  return (
    <div className="font-serif text-white bg-black min-h-screen flex flex-col">
      <HashRouter>
        <Header />
        <Routes >
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Cart" element={<Cart></Cart>} />
          <Route path="/LogIn" element={<LogIn></LogIn>} />
          <Route
            path="/product/:id"
            element={<ProductCard></ProductCard>}
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </HashRouter>
    </div>
  );
}
