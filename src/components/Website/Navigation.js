import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/refugeestories-logo.png';


const Navigation = ({ noheader, ishome }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledNavigation className={noheader ? 'no-header' : ishome ? "is-home" : null}>
            <div className="site-logo">
                <img src={logo} alt="Refugee Stories Logo" />
            </div>
            <ul className={isOpen ? 'open' : null}>
               <li onClick={toggleNav}><NavLink activeClassName='selected' exact to="/">Home</NavLink></li> 
               <li onClick={toggleNav}><NavLink activeClassName='selected' to="/stories">Stories</NavLink></li> 
               <li onClick={toggleNav}><NavLink activeClassName='selected' to="/submit-story">Submit Story</NavLink></li> 
               <li onClick={toggleNav}><NavLink activeClassName='selected' to="/volunteer">Volunteer</NavLink></li> 
               {
                    localStorage.getItem('token') && 
                        <li onClick={toggleNav}><NavLink activeClassName='selected' to="/dashboard">My Dashboard</NavLink></li>  
               }
            </ul>
            <button className={isOpen ? 'open responsive-nav' : 'responsive-nav'} onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </StyledNavigation>
    )
}

export default Navigation;

const StyledNavigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 0;
    color: ${props => props.theme.white};

    &.no-header {
        max-width: ${props => props.theme.largeMaxWidth};
        margin: 0 auto;
        position: relative;

        a {
            color: ${props => props.theme.black};
        }

        .responsive-nav span {
            background: ${props => props.theme.black};
        }
    }

    &.is-home {
        ul {
            &.open {
                top: 80px;
                right: 10px;
                
                li:last-of-type {
                    a {
                        padding-right: 0;
                    }
                }
            }  

            li:last-of-type {
                a {
                    padding-right: 2rem;
                }
            }
        }
    }

    .site-logo {
        max-width: 50px;
    }

    ul {
        display: flex;

        li {
            padding: 1rem 2rem;

            a {
                color: #fff;
                font-size: 1.6rem;
                display: block;

                &:hover {
                    color: ${props => props.theme.primaryColor};
                }
    
                &.selected {
                    border-bottom: 2px solid ${props => props.theme.primaryColor};
                    color: ${props => props.theme.primaryColor};
                }
            }

            &:last-of-type {
                padding-right: 0;
            }
        }

        @media (max-width: 768px) {
            display: none;

            &.open {
                display: flex;
                position: absolute;
                z-index: 4;
                background: ${props => props.theme.primaryGrey};
                flex-direction: column;
                top: 60px;
                right: -10px;
                width: 100%;
                text-align: end;
                max-width: 250px;
                border-radius: 5px;
                &:before  {
                    content: ' ';
                    position: absolute;
                    border: solid 15px transparent;
                    border-top: solid 0px transparent;
                    border-width: 14px;
                    border-color: ${props => props.theme.primaryGrey} transparent transparent transparent;
                    right: .8rem;
                    transform: rotate(180deg);
                    top: -28px;
                }
    
                li {
                    width: 100%;
                    padding: 1rem 1rem 0;
    
                    a {
                        width: 100%;
                        color: ${props => props.theme.white};
                        padding: 1.2rem 0 .75rem;
                        border-bottom: 1px solid ${props => props.theme.white};
    
                        &.selected {
                            border-bottom: 1px solid ${props => props.theme.primaryColor};
                            color: ${props => props.theme.primaryColor};
                        }
    
                        &:hover {
                            color: ${props => props.theme.primaryColor};
                        }
                    }
    
                    &:last-of-type {
                        position: static;
    
                        a {
                            border-bottom: none;
                            padding-bottom: 1rem;
                        }
                    }
                }
            }
        }
    }

    .responsive-nav {
        display: block;
        background: transparent;
        min-width: inherit;
        position: relative;
        min-height: 0;
        height: 25px;
        width: 25px;
        border: none;
        outline: none;

        @media (min-width: 768px) {
            display: none;
        }

        span {
            display: block;
            position: absolute;
            height: 2.5px;
            width: 50%;
            background: ${props => props.theme.white};
            opacity: 1;
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transition: .25s ease-in-out;
            -moz-transition: .25s ease-in-out;
            -o-transition: .25s ease-in-out;
            transition: .25s ease-in-out;

            &:nth-child(even) {
                left: 50%;
                border-radius: 0 9px 9px 0;
            }

            &:nth-child(odd) {
                left:0px;
                border-radius: 9px 0 0 9px;
            }

            &:nth-child(1), &:nth-child(2) {
                top: 0px;
            }

            &:nth-child(3), &:nth-child(4) {
                top: 8px;
            }

            &:nth-child(5), &:nth-child(6) {
                top: 16px;
            }
        }

        &.open {
            span {
                background: ${props => props.theme.primaryColor};

                &:nth-child(1), &:nth-child(6) {
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                }

                &:nth-child(2), &:nth-child(5) {
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                    -o-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }

                &:nth-child(1) {
                    left: 3px;
                    top: 3px;
                }
            
                &:nth-child(2) {
                    right: 3px;
                    top: 3px;
                }
            
                &:nth-child(3) {
                    left: -50%;
                    opacity: 0;
                }
            
                &:nth-child(4) {
                    left: 100%;
                    opacity: 0;
                }
            
                &:nth-child(5) {
                    left: 3px;
                    bottom: 3px;
                }
            
                &:nth-child(6) {
                    right: 3px;
                    bottom: 3px;
                }
            }
        }
    }
`