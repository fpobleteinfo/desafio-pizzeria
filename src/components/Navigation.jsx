import React, { useContext } from 'react'
import { Container, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiContext } from '../context/ApiContext';


const Navigation = () => {
const {dataCarrito} =useContext(ApiContext)

    const setActiveClass = ({ isActive }) => (isActive ? "text-warning ms-3 text-decoration-none active" : "text-white ms-3 text-decoration-none");
    
    const navigate = useNavigate()
    const handleClick = () => {
      navigate('/');
    }

  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container className="justify-content-start">
        <Navbar.Brand onClick={handleClick}>🍕 Pizzería Mamma Mia!</Navbar.Brand>
        {/* Links */}
        <Navbar.Collapse className="justify-content-end">
          <NavLink to="/carrito" className={setActiveClass}>
          🛒 ${dataCarrito.toLocaleString("es-CL")}
        </NavLink>          
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    </>
  )
}

export default Navigation