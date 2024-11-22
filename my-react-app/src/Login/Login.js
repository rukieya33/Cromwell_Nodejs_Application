import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Login() {

  const [emailLogin, SetEmailLogin] = useState("")
    const [passwordLogin, SetPasswordLogin] = useState("")
    const navigate = useNavigate()
    const loginDetails = {
        emailLogin,
        passwordLogin
    }
    useEffect(() => { loginUser() })
    const loginUser = async () => {
        if (emailLogin >= 5 && passwordLogin >= 5) {


            var res = await axios.post("http://localhost:1337/user/login", loginDetails);
            navigate("/")
            console.log(res.data)
        }
    }

    return (

    <div className="Login">

            <form onSubmit={(e) => e.preventDefault()} method="POST">
                  <h2>Login Form</h2>
                 
                  <label htmlFor="email"><b>Email:</b> </label>
                <input type="email" id="email" required placeholder="Enter Email" value={emailLogin} onChange={(e) => SetEmailLogin(e.target.value)}></input>
                <label htmlFor="new-password"><b>Password:</b> </label>
                <input type="password" id="new-password" required placeholder="Enter Password" value={passwordLogin} onChange={(e) => SetPasswordLogin(e.target.value)}></input>
                <input type="submit" onClick={loginUser} value="Sign In"></input>
                  <div className="signup">
                      <p>Dont have an account? <Link to="/register">Sign Up</Link>.</p>
                  </div>
              </form>
        
    </div>
  );
}

export default Login;
