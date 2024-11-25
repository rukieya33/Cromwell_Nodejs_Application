import './LandingPage.css';
import { useRef, useState} from 'react'
import {  useNavigate } from 'react-router-dom'

import axios from 'axios';



function LandingPage() {
  
    const navigate = useNavigate()
    const [currentUser, SetCurrentUser] = useState("")

    let ref = useRef([])
      let userRef = useRef(" ")
    let userEmail = sessionStorage.getItem('email')
    if (sessionStorage.getItem("currentUser") === "true") {

        axios.get(`http://localhost:1337/user?email=${userEmail}`).then((res) => {

            for (var i in res.data.datas) {

                if (res.data.datas[i]["first_name"] === sessionStorage.getItem("forename") && res.data.datas[i]["last_name"] === sessionStorage.getItem("surname")) {
                    ref.current = res.data.datas[i]
                    SetCurrentUser(sessionStorage.getItem("currentUser"))
                    userRef.current = currentUser
                    console.log(ref.current)
                }
            }
        }).catch((err) => {
            console.log(err.response.data)
        })


    }

   
  
    const logoutUser = () => {
        sessionStorage.setItem("currentUser", "false")
        SetCurrentUser(sessionStorage.getItem("currentUser"))
        sessionStorage.setItem('email', ' ')
        sessionStorage.setItem('first', ' ')
        sessionStorage.setItem('last', '')
        sessionStorage.setItem('forename', ' ')
        sessionStorage.setItem('surname', '')
        userRef.current = currentUser
        navigate("/")
    }




    return (
        <div className="LandingPage">


    
                            <section className="myDetails" >
                                <h1>Hello,  {ref.current["first_name"]}  </h1>
                                <div>
                                    <h2>User Details</h2>
                                    <h3> First Name: {ref.current["first_name"]}</h3>
                                    <h3> Last Name: {ref.current["last_name"]}</h3>
                                    <br></br>
                                </div>
                                <div>
                                    <h2>Login Details</h2>
                                    <br></br>
                                    <section className="login-details">
                                        <h3>Email: {ref.current["email"]}</h3>
                                        <h3>Password: {ref.current["psw"]}</h3>

                                    </section>
                                </div>
                <button onClick={logoutUser}>Logout</button>
            </section>

        </div>

    );
}

export default LandingPage;