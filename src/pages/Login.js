import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import useForm from '../utils/hooks/useForm';
import {validation, validationChecker } from '../utils/Validation';
import Header from '../components/Website/Header';
import Roller from '../components/LoadingIndicator/roller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = (props) => {
    
    const adminLogin = () => {
        axios.post('https://bwrefugeestories.herokuapp.com/api/auth/login', values)
            .then(res => {       
                localStorage.setItem('token', res.data.token);
                stopLoading();
                props.history.push('/dashboard');
            })
            .catch(err => {
                toast.error("Please provide valid Email and Password!")
                stopLoading();
                resetForm();
            })
    }

    const { 
        values, 
        errors, 
        visibility,
        isLoading,
        stopLoading, 
        handleChange, 
        handleSubmit, 
        toggleVisibility, 
        resetForm 
    } = useForm(adminLogin, validation);
    const { email, password } = values;
    const { 
        initialEmailState, 
        initialPasswordState,
        isRequired,
        emailMatch
    } = errors;

    return (
        <StyledDiv>
            <Header 
                height="25vh"
                image = "https://source.unsplash.com/featured/?refugees,refugee"
            />

            <div className="page-content">
                <h3>Welcome! Login to the admin dashboard</h3>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input id="email" type="email" value={email || ''} onChange={handleChange} required />
                        <ul className="input-requirements">
                            <li className={validationChecker(initialEmailState, emailMatch)}>Email Address is in correct format</li>
                            <li className={validationChecker(initialEmailState, isRequired)}>Email Address is required</li>
                        </ul>
                    </label>

                    <label htmlFor="password">
                        <span className="password-label">
                            <span>Password</span>
                            <button type="button" onClick={toggleVisibility}>{visibility ? 'Hide password' : 'Show password'}</button>
                        </span>
                        <input id="password" type={visibility ? 'text' : 'password'} value={password || ''} onChange={handleChange} required />               
                        <ul className="input-requirements">
                            <li className={validationChecker(initialPasswordState, isRequired)}>Password is required</li>
                        </ul>
                    </label>

                    <button type="submit" className="submit-btn">
                        {isLoading ? <Roller /> : 'Login'}
                    </button>
                </form>
            </div>
        </StyledDiv>
    )
}

export default Login;


const StyledDiv = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    header {
        flex: 0 1 auto;
    }

    .page-content {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        justify-content: center;
        align-items: center;
        padding: 2rem;

        h3 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 3rem;
        }
    
        form {
            max-width: 450px;
            width: 100%;
            margin: 0 auto;
            padding: 5rem 3rem 4rem;
            border-radius: 3px;
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
        }
    }

    .input-requirements {
        font-size: 1rem;
        font-style: italic;
        text-align: left;
        list-style-type: none;
        color: rgb(150,150,150);
        padding: 0;
        margin: 0;
        margin-top: .5rem;
        li {
            &.invalid {
                color: #e74c3c;
            }
            &.valid {
                color: #2ecc71;
                &:after {
                    display: inline-block;
                    padding-left: 10px;
                    content: '\\2713';
                }
            }
        }
    }
 
    label {
        display: flex;
        flex-direction: column;
        width: 100%; 
        margin-bottom: 2rem;   
        & > span {
            font-size: 1.5rem;
            margin-bottom: .75rem;
            font-weight: 600;
            color: rgba(0,0,0,.4);
            &.password-label {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                button {
                    color: #000;
                    font-size: 1rem;
                    background: transparent;
                    margin: 0;
                    padding: 0;
                    font-weight: 600;
                    border: none;
                    outline: none;
                }
            }
        }
        input {
            outline: none;
            border: 1px solid #ddd;
            padding: 0 1rem;
            min-height: 40px;
            border-radius: 5px;
            font-size: 1.4rem;
            background: transparent;
            &:-webkit-autofill { 
                -webkit-box-shadow:200px 200px 100px white inset; 
                box-shadow:200px 200px 100px white inset; 
            }
            &:valid { border-color: #419BA0; }
            & + .input-requirements {
                overflow: hidden;
                max-height: 0;
                transition: max-height .25s ease-out;  
            }
              
            &:focus + .input-requirements {
                max-height: 1000px; /* any large number (bigger then the .input-requirements list) */
                transition: max-height 1s ease-in;
            }
              
        }
        .error-msg {
            margin-top: .5rem;
            color: red;
        }
    }
    button.submit-btn {
        outline: 0;
        border: none;
        background: #419BA0 none;
        color: #fff;
        font-weight: 700;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
        user-select: none;
        transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
        -webkit-tap-highlight-color: transparent;
        padding: .5rem 2rem;
        min-height: 40px;
        min-width: 200px;
        font-size: 1.5rem; 
        margin-top: 1.5rem;
        &:hover {
            background-color: #63ADB1;
            background-image: none;
            -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            color: rgba(255, 255, 255, .8);
        }
    }
`

