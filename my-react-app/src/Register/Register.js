import './Register.css';
import {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [email, SetEmail] = useState("");
    const [newPassword, SetNewPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");
    const navigate = useNavigate();
    let message = " ";
    const personalDetails = {
        firstName,
        lastName,
        email,
        newPassword,
        confirmPassword
    }
    const validateUserRegistration = () => {
        let isvalid = false;
        if (typeof (firstName) == "string" && typeof (lastName) == "string"
            && typeof (email) == "string" && typeof (newPassword) == "string"
            && typeof (confirmPassword) == "string") {
            isvalid = checkPasswordIsValid();
        }
        else {

            setTimeout(() => {
                document.getElementsByClassName("Register")[0].innerHTML = `<div className="alert">
                Please enter your details in text format.
            </div>`;
            }, 5000)
        }

        if (isvalid) {
            isvalid = true;
        }
        else {
            isvalid = false;
        }

        return isvalid;
    }

    const checkPasswordIsValid = () => {
        let valid = false;

        if (newPassword.length >= 8 && firstName >= 5 && lastName >= 5 && email >= 5 && newPassword.match(/[a-z]+/g)
            && newPassword.match(/[0-9]+/) && newPassword.match(/[A-Z]+/g) &&
            newPassword.match(/[£$%^&*!()""¬``<>?.,@#~;:{}|+=-_]+/g) && newPassword.matchAll(confirmPassword)) {
            valid = true;
        }
        else {
            valid = false;
        }

        return valid;
    }
    let isvalid = validateUserRegistration();

    useEffect(() => {

        if (isvalid) {
            registerUser();
        }
    })

    const registerUser = async () => {

        await axios.post("http://localhost:1337/user/register",
            personalDetails
        ).then((res) => {

            message = res.data.message;
            document.querySelector(".message").write = `<div className="message" >
                ${message}
            </div>`;
            navigate("/login");
            console.log(res.data.message)

           


        }).catch((err) => {
       
            console.log(err)
        })
    }
    return (
        <div className="Register">
          

            <form onSubmit={(e) => e.preventDefault()} method="POST">
                <h2>Register Form</h2>
                <label htmlFor="first"><b>First Name:</b> </label>
                <input type="text" id="first" required placeholder="Enter First Name" value={firstName} onChange={(e) => SetFirstName(e.target.value)}></input>
                <label htmlFor="last-name"><b>Last Name:</b> </label>
                <input type="text" id="last-name" required placeholder="Enter Last Name" value={lastName} onChange={(e) => SetLastName(e.target.value)}></input>
                <label htmlFor="email"><b>Email:</b> </label>
                <input type="email" id="email" required placeholder="Enter Email" value={email} onChange={(e) => SetEmail(e.target.value)}></input>
                <label htmlFor="new-password"><b>Password:</b> </label>
                <input type="password" id="new-password" required placeholder="New Password" value={newPassword} onChange={(e) => SetNewPassword(e.target.value)}></input>
                <div className="tooltip">info</div>
                <label htmlFor="confirm-password"><b>Confirm:</b> </label>
                <input type="password" id="confirm-password" required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => SetConfirmPassword(e.target.value)} ></input>
                <p>By signing up you agree to our <a href="/">Terms & Conditions</a>.</p>
                <input type="submit" onClick={registerUser} value="Sign Up"></input>
                <div className="signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
            </form>
        </div>
    );
}

export default Register;
