import React from 'react'
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// or less ideally
import { Button } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
export const NavBar = () => {

const navigate = useNavigate();

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home </a>
      <a class="nav-item nav-link active" onClick={e=>navigate("ENS")} >ENS</a>
      <a class="nav-item nav-link" href="#">API</a>
      <a class="nav-item nav-link" href="#">About us</a>
       
    </div>
    <Outlet />
  </div>
</nav></>
  )
}
