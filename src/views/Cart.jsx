import React, { useContext, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const Cart = () => {
  const { dataItemCarrito, dataCarrito } = useContext(ApiContext);

  if (dataCarrito <= 0) {
    return (
      <>
        <Alert className="mt-2 m-2" variant="danger">
          No hay elementos en el carrito
        </Alert>
      </>
    );
  }

  return (
    <>
      <ListGroup className="container mt-4 d-flex justify-content-center">
        <h5>Carrito de compras:</h5>
        {dataItemCarrito.map((c, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="carrito-items">
              <img className="pe-2" src={c.img}></img>
              {c.name}
            </div>
            <div className="d-flex justify-content-between">
              <Badge bg="dark" pill>
                $ {c.price.toLocaleString("es-CL")}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
        <p className="totalCarro">
          Total: ${dataCarrito.toLocaleString("es-CL")}
        </p>

        <Button variant="info">💸 Ir al Pago</Button>
      </ListGroup>
    </>
  );
};

export default Cart;
