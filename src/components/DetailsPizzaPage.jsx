import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ApiContext } from "../context/ApiContext";

const DetailsPizzaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    dataPizza,
    dataItemCarrito,
    setDataItemCarrito,
    dataSelectedPizza,
    setDataSelectedPizza,
  } = useContext(ApiContext);
  const [dataIngredientes, setIngredientes] = useState([]);

  useEffect(() => {
    // Verifica si hay datos de pizzas y si hay un ID válido
    if (dataPizza.length > 0 && id) {
      const selectedPizza = dataPizza.find((p) => p.id === id);
      if (selectedPizza) {
        setDataSelectedPizza(selectedPizza);
        setIngredientes(selectedPizza.ingredients);
      } else {
        // Manejo si no se encuentra la pizza con la ID específica
        //console.log("No se encontró la pizza con esa ID");
        navigate(`/NotFound`);

      }
    }
  }, [dataPizza, id, setDataSelectedPizza]);

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

  // useEffect(() => {
  //   encontrarPizza();
  // }, [dataPizza,id]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-12 mt-4">
            {dataSelectedPizza && ( // Verifica si hay una pizza seleccionada
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
                    {/* <ul className="list-unstyled">
                      {dataSelectedPizza.ingredients.map((ingredient, index) => (
                        <li key={index}>🍕 {ingredient}</li>
                      ))}
                    </ul> */}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPizzaPage;
