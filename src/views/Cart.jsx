import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const Cart = () => {
  const { dataItemCarrito, setDataItemCarrito, dataCarrito } =
    useContext(ApiContext);
  const [groupedCarritoItem, setGoupedCarritoItem] = useState([]);

  useEffect(() => {
    // Agrupar productos por su id y calcular la cantidad y el total por producto
    const groupedItemCarrito = dataItemCarrito.reduce((acc, curr) => {
      const existingItem = acc.find((item) => item.id === curr.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += curr.price;
      } else {
        acc.push({
          id: curr.id,
          name: curr.name,
          img: curr.img,
          quantity: 1,
          total: curr.price,
        });
      }
      return acc;
    }, []);

    setGoupedCarritoItem(groupedItemCarrito);
  }, [dataItemCarrito]);

  //  funcion agregarItem y quitarItem aca...

// Función para agregar un item al carrito
const agregarItems = (id) => {
  const newCarritoItem = [...dataItemCarrito];
  const existingItem = newCarritoItem.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.total += existingItem.price;
  } else {
    const pizza = dataPizza.find((p) => p.id === id); // Busca la pizza en dataPizza
    newCarritoItem.push({
      id: pizza.id,
      name: pizza.name,
      img: pizza.img,
      quantity: 1,
      total: pizza.price,
    });
  }

  setDataItemCarrito(newCarritoItem); // Actualiza el estado del carrito
};

// Función para quitar un item del carrito
const quitarItems = (id) => {
  const newCarritoItem = [...dataItemCarrito];
  const existingItem = newCarritoItem.find((item) => item.id === id);

  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
    existingItem.total -= existingItem.price;
  } else if (existingItem) {
    newCarritoItem.splice(newCarritoItem.indexOf(existingItem), 1);
  }

  setDataItemCarrito(newCarritoItem); // Actualiza el estado del carrito
};

  // 

  if (dataCarrito <= 0 || groupedCarritoItem.length === 0) {
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
        {groupedCarritoItem.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="carrito-items">
              <img className="pe-2" src={item.img} alt={item.name}></img>
              {`${item.name} (x${item.quantity})`}
            </div>
            <div className="d-flex justify-content-between">
              <Badge bg="dark" pill>
                $ {item.total.toLocaleString("es-CL")}
              </Badge>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="outline-danger"
              onClick={() => quitarItems(item.id)}
              >-</Button>
              <Badge bg="dark" pill>
                {item.quantity}
              </Badge>
              <Button
                variant="outline-success"
                onClick={() => agregarItems(item.id)}
              >
                +
              </Button>
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
