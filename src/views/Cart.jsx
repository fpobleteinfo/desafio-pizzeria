import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const { dataPizza,dataItemCarrito, setDataItemCarrito, dataCarrito } =
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
          total:  curr.price,
        });
      } 
      return acc;
    }, []);

    setGoupedCarritoItem(groupedItemCarrito);
  }, [dataItemCarrito]);

  //  funcion agregarItem y quitarItem aca...

  //logica de agregar al carrito
  const addCarrito = (id) => {
    setDataItemCarrito([...dataItemCarrito, id]);
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

// fx para quitar un item del carrito
const removeCarrito = (id) => {
  const newCarritoItem = [...dataItemCarrito];
  const existingItem = newCarritoItem.find((item) => item.id === id);

  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
    
  } else if (existingItem) {
    newCarritoItem.splice(newCarritoItem.indexOf(existingItem), 1);
    toast.warn('🍕 Elemento eliminado :(!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
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
              {`${item.name} `}
              {/* (x${item.quantity}) */}
            </div>
            <div className="d-flex justify-content-between">
              <Badge bg="dark" pill>
                $ {item.total.toLocaleString("es-CL")}
              </Badge>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="outline-danger"
              onClick={() => removeCarrito(item.id)}
              >-</Button>
              <Badge bg="dark" pill>
                {item.quantity}
              </Badge>
              <Button
                variant="outline-success"
                onClick={() => handleAddCarrito(item.id)}
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
      <ToastContainer />
    </>
  );
};

export default Cart;
