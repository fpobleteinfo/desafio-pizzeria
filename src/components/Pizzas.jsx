import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { ApiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Pizzas = () => {
  const { dataPizza, dataItemCarrito, setDataItemCarrito } =
    useContext(ApiContext);
  const navigate = useNavigate();


  const verMas = (id) => {
    navigate(`/pizza/${id}`);
  };

  //logica de agregar al carrito
  const addCarrito = (item) => {
    setDataItemCarrito([...dataItemCarrito, item]);
    toast.success('🍕 Pizza agregada!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  //logica de identificar CUAL PIZZA VA AL CARRITO...
  const handleAddCarrito = (id) => {
    const selectedPizza = dataPizza.find((c) => c.id === id);
    if (selectedPizza) {
      addCarrito(selectedPizza);
    }
  };

  return (
    <>
      <div className="container d-flex flex-wrap align-items-center mt-3 mb-3">
        {dataPizza.map((c) => (
          <div className="col" key={c.id}>
            <Card className="m-2 card">
              <Card.Img variant="top" src={c.img} />
              <Card.Body>
                <div className="name-price">
                  <Card.Title>{c.name}</Card.Title>
                  <Card.Title>$ {c.price.toLocaleString("es-CL")}</Card.Title>
                </div>
                <hr></hr>
                <div className="card-body">
                  <b>Ingredientes</b>
                  <ul className="list-unstyled">
                    {c.ingredients.map((ingredient, index) => (
                      <li key={index}>🍕 {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="buttons">
                  <Button variant="warning" onClick={() => verMas(c.id)}>
                    🐷 Ver Más
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleAddCarrito(c.id)}
                  >
                    🛒 Añadir al carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <ToastContainer />
          </div>
        ))}
      </div>
    </>
  );
};

export default Pizzas;
