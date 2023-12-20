import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./views/HomePage";
import DetailsPizzaPage from "./views/DetailsPizzaPage";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import ApiProvider from "./context/ApiContext";

function App() {
  return (
    <>
      <ApiProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizza/:id" element={<DetailsPizzaPage />} />
          <Route path="/carrito/" element={<Cart/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApiProvider>
    </>
  );
}

export default App;
