import React from 'react'
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// or less ideally
import { Button } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
export const NavBar = () => {

const navigate = useNavigate();

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-neutral-400">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="#"><span className="text-lg font-semibold" >Home</span> </a>
      <a className="nav-item nav-link active" onClick={e=>navigate("ENS")}> <span className="text-lg font-semibold">ENS</span></a>
      <a className="nav-item nav-link " href="#"><span className="text-lg font-semibold">API</span></a>
      <a className="nav-item nav-link" href="#"><span className="text-lg font-semibold">About us</span></a>
       
    </div>
  
  </div>
</nav>

<div>
<Outlet />
</div>
</div>

  )
}
