import logo from './logo.svg';
import './App.css';
import  Name  from './Components/name.js';
//import { Derive } from './Derive';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Derive } from './Derive';
import { NavBar } from './Components/NavBar';

function App() {
  return (
    <>
     {/* <NavBar/> */}
 
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<NavBar />}>
        <Route path='home' element={<Derive/>}></Route>
        <Route path='ENS' element={<Name/>}></Route>
      </Route>
          {/* <Name /> */}
      </Routes>
      </BrowserRouter>
      </>
           
         
         
       
   
       
    
    
  );
}

export default App;
