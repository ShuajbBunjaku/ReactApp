import { HashRouter, Routes, Route } from "react-router";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import LogIn from "./Components/LogIn/LogIn";
import PageNotFound from "./Components/PageNotFound/error";

export default function App() {
  return (
    <div className="flex flex-col gap-20">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Cart" element={<Cart></Cart>} />
          <Route path="/LogIn" element={<LogIn></LogIn>} />
          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </HashRouter>
    </div>
  );
}
