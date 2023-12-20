import React from "react";
import Pizzas from "../components/Pizzas";

const HomePage = () => {
  return (
    <>
      <div className="cabecera">
        <div className="titulos">
          <h1>¡Pizzería Mamma Mia!</h1>
          <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
        </div>
        <hr></hr>
      </div>
      <Pizzas />
    </>
  );
};

export default HomePage;
