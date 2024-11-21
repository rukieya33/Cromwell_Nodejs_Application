import './Register.css';
import { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [email, SetEmail] = useState("");
    const [newPassword, SetNewPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");

    const validateUserRegistration = () => {
        let isvalid = false;
        if (typeof (firstName) == "string" && typeof (lastName) == "string"
            && typeof (email) == "string" && typeof (newPassword) == "string"
            && typeof (confirmPassword) == "string") {
            isvalid = checkPasswordIsValid();
        }
        else {
            document.querySelector("alert").hidden = false;
            setTimeout(() => {
                document.querySelector("alert").hidden = true;
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

        if (newPassword.length === 8 && newPassword.match(/[a-z]+/g)
            && newPassword.match(/[0-9]+/i) && newPassword.match(/[A-Z]+/g) &&
            newPassword.match(/[£$%^&*!()""¬``<>?/.,@#~;:{}|+=-_]+/i)) {
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

    const registerUser = () => {
        try {
            axios.post("http://localhost:1337/register", {
                firstN: firstName,
                lastN: lastName,
                email: email,
                psw: newPassword
            }).then((res) => {
                console.log(res.data);
            }).catch((e) => {
                console.log(e);
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="Register">
            <div className="alert" hidden>
                Please enter your details in text format.
            </div>

            <form>
                <h2>Register Form</h2>
                <label for="first"><b>First Name:</b> </label>
                <input type="text" id="first" required placeholder="Enter First Name" value={firstName} onChange={(e) => SetFirstName(e.target.value)}></input>
                <label for="last-name"><b>Last Name:</b> </label>
                <input type="text" id="last-name" required placeholder="Enter Last Name" value={lastName} onChange={(e) => SetLastName(e.target.value)}></input>
                <label for="email"><b>Email:</b> </label>
                <input type="email" id="email" required placeholder="Enter Email" value={email} onChange={(e) => SetEmail(e.target.value)}></input>
                <label for="new-password"><b>Password:</b> </label>



                <input type="password" id="new-password" required placeholder="New Password" value={newPassword} onChange={(e) => SetNewPassword(e.target.value)}></input>
                <div className="tooltip">
                    Info
                </div>

                <label for="confirm-password"><b>Confirm:</b> </label>
                <input type="password" id="confirm-password" required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => SetConfirmPassword(e.target.value)} ></input>
                <p>By signing up you agree to our <a href="/">Terms & Conditions</a>.</p>
                <button onClick={registerUser}><b>Sign Up</b></button>
                <div class="signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
            </form>
        </div>
    );
}

export default Register;
