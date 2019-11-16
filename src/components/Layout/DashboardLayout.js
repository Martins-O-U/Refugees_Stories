import React from "react";
import { NavLink } from 'react-router-dom';
import PrivateRoute from '../Router/PrivateRoute';
import Dashboard from "../../pages/Dashboard";
import ApprovedStories from "../../pages/ApprovedStories";
import logo from '../../assets/images/refugeestories-logo.png';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';


const DashboardLayout = props => {
    const onLogout = () => {
        localStorage.clear();
        props.history.replace('/login');
    };

    return (
        <StyledContainer>
            <div className='side-nav'>
                <div className="site-logo">
                    <img src={logo} alt="Refugee Stories Logo" />
                </div>

                <ul>
                    <li>
                        <NavLink exact to="/stories" activeClassName="is-active">
                            <Icon>open_in_new</Icon>
                            <span>Visit Site</span>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink exact to="/dashboard" activeClassName="is-active">
                            <Icon>assignment_late_outline</Icon>
                            <span>Pending Stories</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact to="/dashboard/approved-stories" activeClassName="is-active">
                            <Icon>check_circle</Icon>
                            <span>Approved Stories</span>
                        </NavLink>
                    </li>

                    <li>
                        <button className='logout' onClick={onLogout}>
                            <Icon>exit_to_app</Icon>
                            <span>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/approved-stories" component={ApprovedStories} />
        </StyledContainer>
    );
}

export default DashboardLayout;

const StyledContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;


    .side-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 250px;
        width: 100%
        height: 100vh;
        overflow: hidden;
        background: #fafafa;
        position: relative;
        padding: 2rem;
        padding-right: 0;

        .site-logo {
            max-width: 40px;
            position: absolute;
            top: 2rem;
            left: 2rem;
        }

        ul {
            min-height: 450px;
            width: 100%;

            a, button {
                display: flex;
                align-items: center;
                font-weight: 400
                padding: 10px 0;
                font-size: 1.6rem;
                color: ${props => props.theme.black};
                font-family: ${props => props.theme.bodyFont};

                .MuiIcon-root {
                    margin-top: 5px
                }

                span {
                    margin-left: 0px;
                    margin-right: 10px;
                }

                &:hover, &.is-active {
                    font-weight: 600px
                    color: ${props => props.theme.primaryColor};
                }

                &.is-active {
                    border-right: 3px solid ${props => props.theme.primaryColor};
                }
            }

            button {
                background: transparent;
                border: none; 
                outline: none;
            }
        }
    }

    a:hover{
        font-size: 19px;
        color: black;
    }

`
