import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../state/actions/index';



const Dashboard = ({ pendingStories,  getPendingStories, rejectStory, approveStory }) => {

	useEffect(() => {
		getPendingStories();
	}, [pendingStories]); // eslint-disable-line

	return (
        <StyledContainer>
            <h2>Pending Stories</h2>
            <ul>
                {   
                    pendingStories.map((person) => {
                        return (
                            <li key={person.id}>
                                <h3>{person.title}</h3>
                                <p>{person.story}</p>
                                <div>
                                    <button onClick={() => approveStory(person.id,{...person, highlight:null})} className='submit-btn'>
                                        Approve Story
                                    </button>

                                    {/* End Point doesn't work */}
                                    {/* <button onClick={() => rejectStory(person.id)} className='dashboard-button'>
                                        Reject Story
                                    </button> */}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </StyledContainer>	            		
	);
};

export default connect( state => state, actions)(Dashboard);

const StyledContainer = styled.div`
    padding: 35px;
    overflow-y: auto;
    width: calc(100% - 250px);

    h2 {
        font-size: 2.2rem;
        margin-bottom: 3rem;
    }

    ul {
        li {
            padding: 2rem;
            border-radius: 3px;
            margin-bottom: 4rem;
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;

            h3 {
                font-size: 1.7rem;
                margin-bottom: .5rem;
            }

            p {
                font-size: 1.4rem;
                line-height: 1.4;
            }

            & > div {
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    button.submit-btn {
        outline: 0;
        background: ${props => props.theme.primaryColor};
        border: none;
        color: ${props => props.theme.white};
        font-weight: 700;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
        user-select: none;
        transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
        -webkit-tap-highlight-color: transparent;
        padding: .35rem 1.5rem;
        min-height: 35px;
        min-width: 100px;
        font-size: 1.3rem;
        margin-top: 2rem;

        &:hover {
            background-color: ${props => props.theme.primaryColor};
            background-image: none;
            -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            color: rgba(255, 255, 255, .8);
        }
    }
`
