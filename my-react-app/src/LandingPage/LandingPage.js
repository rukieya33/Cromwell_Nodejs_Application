import './LandingPage.css';
import {useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';



function LandingPage(prop) {
    const { state } = useLocation()
    const ref = useRef()


       

    const logoutUser = () => {
        sessionStorage.setItem("currentUser", "false")


    }
        if (prop.current !== true) {

           axios.get(`http://localhost:1337/user?email=${state.email}`).then((res) => {
               ref.current = res.data.datas["0"]
              
                console.log(ref.current)
            }).catch((err) => {
                console.log(err.response.data)
            })


        }

   
  
  return (
      <div className="LandingPage">

          

          
          <h1>Welcome to Landing Page </h1>
        
              <section className="myDetails" >
              <h3>First Name: </h3> <h3>{ref.current["first_name"]}</h3>
              <h3>Last Name: </h3> <h3>{ref.current["last_name"]}</h3>
              <br></br>

              <h2>Login Details</h2>
              <br></br>
              <section className="login-details">
                  <h3>Email: </h3> <span>{ref.current["email"]}</span>
                  <h3>Password: </h3> <span>{ref.current["psw"]}</span>
                  
              </section>

              <button onClick={logoutUser}>Logout</button>
              
          </section>
         
          
  
  
    </div>
  );
}

export default LandingPage;
