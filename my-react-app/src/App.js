import './App.css';

import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Register from './Register/Register.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import LandingPage from './LandingPage/LandingPage.js';

function App() { 
   

    return (
        
    <div className="App">
            
            <header>

          
                <h1 id="appTitle">C Cromwell </h1>
                <BrowserRouter>
                    <Routes>

                        <Route exact path="/" element={<Home/>} />
                        <Route path="landing-page" element={<LandingPage /> } />
                        <Route path="register" element={<Register  />} />
                        <Route path="login" element={<Login />} />
              

                    </Routes>
                    

                    <ul>
                            <li><Link to="/" ><h2 id="homeText">Home</h2></Link></li>
                            <li><Link to="/register"><h2 id="registerText" >Register</h2></Link></li>
                     
                        <li ><Link to="/landing-page"><h2 id="loginText">MyDetails</h2></Link></li>
                        <li ><Link to="/login"><h2 id="loginText">Login</h2></Link></li>
                    </ul>



                </BrowserRouter>

               
      </header>
      <footer>
                Contact Us:
                <h4>Address: Engineer Park, 29-31 Alvis Rd, Sandycroft, Deeside CH5 2QB</h4>
                <h4>Telephone: 0800 338877</h4>
                <h4>Hours: Open  - Mon to Fri from 7am -7pm </h4>
     2024 Cromwell Group (Holdings) Ltd &copy;
      </footer>
            </div>
      
    );

}

export default App;
