import  { createContext,useEffect, useState } from "react";
export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [dataPizza, setDataPizza] = useState([]);
  const [dataCarrito, setDataCarrito] = useState(0);
  const [dataItemCarrito, setDataItemCarrito] = useState([]);
  const [dataSelectedPizza, setDataSelectedPizza] = useState({});

  const url = "/pizzas.json";

  const apiData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ha habido un error en la API");
      }
      const info = await response.json();
      setDataPizza(info);


    } catch (error) {
      console.error({ message: error });
    }
  };


  const calcularTotalCarrito = () => {
    let total = 0;
    dataItemCarrito.forEach((c) => {
      total = total + c.price;

    });
    return total;
    //setDataCarrito(total)
    
  };

  // Actualizar el total del carrito en el contexto
  useEffect(() => {
    apiData();
    const totalCarrito = calcularTotalCarrito();
    setDataCarrito(totalCarrito);
  }, [dataItemCarrito, setDataCarrito]); //useEffect se va a ejecutar si se cumplen estan condiciones.


  
  return (

      <ApiContext.Provider
        value={{ dataPizza, setDataPizza, dataCarrito, dataItemCarrito, setDataItemCarrito, dataSelectedPizza, setDataSelectedPizza }}
      >
        {children}
      </ApiContext.Provider>
      );
};

export default ApiProvider;
