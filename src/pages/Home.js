import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import * as actions from '../state/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { slides } from '../utils/data';
import Slider from '../components/Website/Slider';
import Navigation from "../components/Website/Navigation";
import Roller from "../components/LoadingIndicator/roller";


const Home = ({ getUserStories, userStories, userStoriesStatus }) => {

    const [ isLoading, setLoader ] = useState(true);

    useEffect(() => {
        getUserStories();
    }, [userStories]) // eslint-disable-line

    useEffect(() => {
        if(userStoriesStatus === false && isLoading) {
            toast.error("Oops, something went wrong. Refresh the page!");
            setLoader(false);
        }
    }, [userStoriesStatus, isLoading])

    return (
        <ParallaxContainer>
            <header className="is-home-page">
                <Navigation ishome />
                <Slider
                    options={{
                        autoPlay: 8000,
                        lazyLoad: true,
                        pauseAutoPlayOnHover: false,
                        wrapAround: true,
                        pageDots: false,
                        prevNextButtons: false
                    }}
                >
                    {
                        slides.map(({ image, title, story }, index) => (
                            <div style={{ width: '100%', height: '100%' }} key={index}>
                                <div className="slider-image">
                                    <img src={image} data-flickity-lazyload={image} alt="" />
                                </div>
                                <div className="slider-content">
                                    <h1>{title}</h1>
                                    <p>{story}</p>
                                    <Link to="/stories">See all stories <span>&#62;</span></Link>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </header>
            <main>
                <section className="about-section">
                    <h3>Who We Are!</h3>
                    <p> We are an organization committed to saving the lives and protecting the rights, dignity, and security of refugees and displaced people worldwide by sharing their stories. We are a global, independent advocacy organization that successfully challenges governments, policymakers, and administrations to improve the lives of displaced people around the world.</p>
                </section>
                <section className="blog-section">
                    <div className="statistics">
                        <div>
                            <p className="stats">71 million </p>
                            <p className="stats-summary">people have been displaced from their home due to war, persecution or violence. That’s one of every 107 people on the planet.</p>
                            <Link to="/stories">See all stories <span>&#62;</span></Link>
                        </div>
                    </div>
                    <div className="recent-posts">
                        {   
                            !userStoriesStatus && isLoading ? (
                                <div className="loading-indicator">
                                    <Roller isSiteWide={true} />
                                </div>
                            ) : (
                                <ul>
                                    {
                                        userStories.slice(0, 3).map(({id, title, story}) => {
                                            return (
                                                <li key={id}>
                                                    <h3>{title}</h3>
                                                    <p>{`${story.split(" ").splice(0, 13).join(" ")}...`}</p>
                                                    <Link to={`/stories/${id}`}>Read full story <span>&#62;</span></Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        }
                    </div>
                </section>
            </main>
        </ParallaxContainer>
    )
}

export default connect(state => state, actions)(Home);


const ParallaxContainer = styled.div`
    height: 100vh;
    max-height: 100%;
    overflow-x: hidden;
    perspective: 1px;
    perspective-origin: center top;
    transform-style: preserve-3d;

    header.is-home-page {
        width: 100vw;
        transform-origin: center top;
        transform: 
            translateZ(-1px) 
            scale(2);

        nav {
            z-index: 3;
            padding: 2rem calc((100vw - 1140px)/2);
    
            @media (max-width: 1140px) {
                padding: 2rem;
            }
        }

        .slider-image {
            width: 100%;
            height: 100%;

            &:before {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                transition: 0.4s ease-out;
                z-index: 2;
            }

            @media (max-width: 768px) {
                &:before {
                    background: rgba(0, 0, 0, 0.85);
                }
            }
        }

        .slider-content {
            position: absolute;
            top: 0;
            z-index: 3;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 100%;
            color: #fff;
            padding: 2rem calc((100vw - 1140px)/2) 20rem;
    
            @media (max-width: 1140px) {
                padding: 2rem;
                padding-bottom: 15rem;
            }
    
            h1 {
                font-size: 7rem;
                margin-bottom: 1rem;

                @media (max-width: 768px) {
                    font-size: 4rem;
                }
            }
    
            p {
                font-size: 2rem;
                max-width: 600px;
                line-height: 1.58;
                width: 100%;

                @media (max-width: 768px) {
                    font-size: 1.7rem;
                    max-width: 500px;
                }
            }

            a {
                font-size: 2rem;
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
    }

    main {
        min-height: 100vh;
        background: white;
        transform: translateZ(0);
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        @media (max-width: 650px) {
            height: auto;
        }

        .about-section {
            max-width: 850px;
            margin: 0 auto;
            padding: 7rem 2rem;
            flex: 0 1 auto;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            h3 {
                font-size: 2.8rem;
                max-width: 250px;
                width: 100%; 
                margin-right: 2rem;           
            }

            p {
                font-size: 1.6rem;
                line-height: 1.6;
                width: calc(100% - 300px);
            }

            @media (max-width: 650px) {
                height: auto;
                flex-direction: column;
                max-width: 500px;
                margin: 0 auto;

                h3 {
                    width: 100%; 
                    margin-right: 0;
                    margin-bottom: .5rem;          
                }
    
                p {
                    width: 100%;
                }
            }
        }

        .blog-section {
            display: flex;
            flex: 1 1 auto;

            & > div {
                background: #f2f6f5;
                height: 100%;
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 5rem 2rem;

                &.recent-posts {
                    background: rgba(244, 244, 244, .24);

                    ul {
                        max-width: 300px;
                        width: 100%;
                        text-align: left;

                        li {
                            margin-bottom: 3rem;
        
                            h3 {
                                font-size: 2.4rem;
                                margin-bottom: .5rem;                    
                            }
        
                            p {
                                font-size: 1.55rem;
                                line-height: 1.3;
                            }
        
                            a {
                                font-size: 1.4rem;
                                margin-top: 1rem;
                                display: inline-block;
                                color: ${props => props.theme.primaryColor};
                                width: fit-content;
                                display: inline-block;
                                border-bottom: 3px solid transparent;
        
                                &:hover {
                                    border-bottom: 3px solid ${props => props.theme.primaryColor};
                                }
                            }
                        }
                    }
                }

                &.statistics {
                    & > div {
                        max-width: 450px;
                        width: 100%;
                        text-align: left;
                    }

                    .stats {
                        font-size: 7rem;
                        letter-spacing: -5px;
                        font-family: ${props => props.theme.headingFont};
                    }

                    .stats-summary {
                        font-size: 1.7rem;
                        line-height: 1.5;
                    }

                    a {
                        color: ${props => props.theme.primaryColor};
                        margin-top: 2rem;
                        font-size: 1.7rem;
                        width: fit-content;
                        display: inline-block;
                        border-bottom: 3px solid transparent;

                        &:hover {
                            border-bottom: 3px solid ${props => props.theme.primaryColor};
                        }
                    }
                }
            }


            @media (max-width: 650px) {
                flex-direction: column;

                & > div {
                    width: 100%;

                    &.statistics {
                        padding: 3rem 2rem 4.5rem;

                        & > div {
                            max-width: 300px;
                            width: 100%;
                            text-align: center;

                            .stats {
                                font-size: 6rem;
                                letter-spacing: -5px;                        
                            }
                        }
                    }
                }
            }

            @media (max-width: 400px) {
                & > div {
                    &.statistics {
                        .stats,
                        .stats-summary {
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
`