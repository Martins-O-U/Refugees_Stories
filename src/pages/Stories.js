import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import * as actions from '../state/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { imageBank } from "../utils/data";
import Header from '../components/Website/Header';
import Roller from "../components/LoadingIndicator/roller";


const Stories = ({ getUserStories, userStories, userStoriesStatus }) => {

    const [ isLoading, setLoader ] = useState(true);

    useEffect(() => {
        getUserStories();
    }, [userStories]) // eslint-disable-line

    useEffect(() => {
        if(userStoriesStatus === false && isLoading) {
            toast.error("Oops, something went wrong. Try again!");
            setLoader(false);
        }
    }, [userStoriesStatus, isLoading])

    return (
        <>
            <Header 
                height="60vh"
                title="All Stories"  
                story="Learn how and why refugee crises have shaped our world over the last half-century through real stories"
                image="https://images.unsplash.com/photo-1544006790-b3c81bd2fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
            />
            <StyledContainer>
                {   
                    !userStoriesStatus && isLoading ? (
                        <div className="loading-indicator">
                            <Roller isSiteWide={true} />
                        </div>
                    ) : (
                        <ul>
                            {
                                userStories.map(({id, title, story}) => {
                                    const image = imageBank.filter((item, index) => index === (id - 1))[0] || "https://source.unsplash.com/1600x900/?refugees,refugee";
                                    return (
                                        <li key={id}>
                                            <div className="card-content">
                                                <h3>{title}</h3>
                                                <p>{`${story.split(" ").splice(0, 15).join(" ")}...`}</p>
                                                <Link to={`/stories/${id}`}>Read full story <span>&#62;</span></Link>
                                            </div>
                                            <div className="card-image">
                                                <img src={image} alt={title} />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </StyledContainer>
        </>
    )
};

export default connect(state => state, actions)(Stories);

const StyledContainer = styled.main`
    max-width: ${props => props.theme.mediumMaxWidth};
    margin: 0 auto;
    padding: ${props => props.theme.containerWrap};
    width: 85vw;

    .loading-indicator {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li {
        margin-bottom: 5rem;
        min-height: 300px;
        display: flex;
        border-radius: 5px;
        box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;

        &:last-of-type {
            margin-bottom: 0;
        }

        &:nth-of-type(2n) {
            flex-direction: row-reverse;

            .card-image img {
                border-top-left-radius: 5px;
                border-top-right-radius: 0;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 0;
            }
        }

        .card-content,
        .card-image {
            min-height: 300px;
            width: 50%;
            position: relative;

            img {
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100%;
                position: absolute;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }

        .card-image {
            background: ${props => props.theme.primaryDarkGrey}; 
        }

        .card-content {
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

            h3 {
                font-size: 2.5rem;
            }

            p {
                font-size: 1.6rem;
                margin-top: 1rem;
            }

            a {
                font-size: 1.4rem;
                margin-top: 2rem;
                color: ${props => props.theme.primaryColor};
                width: fit-content;
                display: inline-block;
                border-bottom: 3px solid transparent;

                &:hover {
                    border-bottom: 3px solid ${props => props.theme.primaryColor};
                }
            }
        }

        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;

            .card-content,
            .card-image {
                width: 100%;

                img {
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }

            &:nth-of-type(2n) {
                flex-direction: column;

                .card-image img {
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }
    }
`