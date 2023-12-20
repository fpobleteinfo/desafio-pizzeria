import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { Button } from "react-bootstrap";

const DetailsPizzaPage = () => {
  const { id } = useParams();
  const {
    dataPizza,
    dataItemCarrito,
    setDataItemCarrito,
    dataSelectedPizza,
    setDataSelectedPizza,
  } = useContext(ApiContext);
  const [dataIngredientes, setIngredientes] = useState([]);

  const encontrarPizza = () => {
    const selectedPizza = dataPizza.find((c) => c.id === id);
    setDataSelectedPizza(selectedPizza);
    setIngredientes(selectedPizza.ingredients);
  };

  const addCarrito = (item) => {
    setDataItemCarrito([...dataItemCarrito, item]);
    alert("Item agregado!");
    //console.log(item)
  };

  const handleAddCarrito = () => {
    if (dataSelectedPizza) {
      addCarrito(dataSelectedPizza);
    }
  };

  useEffect(() => {
    encontrarPizza();
  }, [id, dataPizza]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="cardbody-horizontal">
              <div className="card-horizontal">
                <div className="img-square">
                  <img
                    className="pe-2"
                    src={dataSelectedPizza.img}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{dataSelectedPizza.name}</h4>
                  <b>Precio: $ {dataSelectedPizza.price}</b>
                  <hr></hr>
                  <p className="card-text">{dataSelectedPizza.desc}</p>
                  <b>Ingredientes</b>
                  <ul className="list-unstyled">
                    {dataIngredientes.map((ingredient, index) => (
                      <li key={index}>🍕 {ingredient}</li>
                    ))}
                  </ul>
                  <Button variant="danger" onClick={handleAddCarrito}>
                    🛒 Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPizzaPage;
