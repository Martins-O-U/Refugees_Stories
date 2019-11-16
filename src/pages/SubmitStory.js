import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from '../state/actions';

import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import useForm from '../utils/hooks/useForm';
import useDialog from '../utils/hooks/useDialog';

import Roller from '../components/LoadingIndicator/roller';
import AlertDialog from '../components/Modal/AlertDialog';
import Navigation from "../components/Website/Navigation";



const SubmitStory = ({ addStory, toggleAddStoryStatus, addStoryStatus }) => {

    const handleStorySubmit = () => {
        setAsSubmitted();
        addStory(values);
    }

    const handleAPIResponse = () => {
        stopLoading();
        resetForm();
        makeBtnNotVisible();
        toggleAddStoryStatus(false);
    }

    const [ isAlertOpen, openAlert, closeAlert ] = useDialog(false);
    const [ hasSubmitted, setAsSubmitted, setAsNotSubmitted ] = useDialog(false);
    const [ isBtnVisible, makeBtnVisible, makeBtnNotVisible ] = useDialog(false);
    const { values, resetForm, isLoading, stopLoading, handleChange, handleSubmit } = useForm(handleStorySubmit);

    const { title, story } = values;

    useEffect(() => {
        if(title && story) {
            makeBtnVisible();
        } else {
            makeBtnNotVisible();
        }
    }, [title, story]) // eslint-disable-line

    useEffect(() => {
        if(hasSubmitted && addStoryStatus) { 
            handleAPIResponse();
            openAlert();
            setAsNotSubmitted();
        }

        if(hasSubmitted && (addStoryStatus === false)) {
            handleAPIResponse();
            toast.error("Oops, something went wrong. Try again!");
            setAsNotSubmitted();
        }
    }, [addStoryStatus]) // eslint-disable-line

    return (
        <StyledContainer> 
            <Navigation noheader />
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <span className="sr">Title</span>
                    <input id="title" type="text" value={title || ''} placeholder="Title" onChange={handleChange} autoFocus required />
                </label>

                <label htmlFor="story">
                    <span className="sr">story</span>
                    <TextareaAutosize id="story" value={story || ''} placeholder="Tell your story..." onChange={handleChange} required />
                </label>

                {   
                    isBtnVisible &&
                        <button type="submit" className={`submit-btn ${isLoading && "is-active"}`}>
                            {isLoading ? <Roller /> : 'Submit Story'}
                        </button>
                }
            </form>
            <AlertDialog 
                open={isAlertOpen}
                handleClose={closeAlert}
                title='Story Submitted'
                description="Your story was submitted successfully. Please wait a few hours for confirmation of approval!"
                dialogActions={[
                    {
                        id: 1,
                        text: "Go to home",
                        route: "/"
                    },
                    {
                        id: 2,
                        text: "Submit new story",
                        route: "/submit-story"
                    },
                ]}
            />
        </StyledContainer>
    )
};

export default connect(state => state, actions)(SubmitStory);

const StyledContainer = styled.main`
    padding: 2rem;
    min-height: 100vh;

    form {
        max-width: ${props => props.theme.mediumMaxWidth};
        margin: 4rem auto 0;

        label {
            display: flex;
            flex-direction: column;
            width: 100%; 
            margin-bottom: 1.3rem;
            
            & > span.sr {
                height: 0;
                width: 0;
                visibility: hidden;
            }

            input {
                outline: none;
                border: none;
                font-size: 40px;
                background: transparent;

                &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    font-size: 40px;
                    color: ${props => props.theme.primaryGrey};
                }
                &::-moz-placeholder { /* Firefox 19+ */
                    font-size: 40px;
                    color: ${props => props.theme.primaryGrey};
                }
                &:-ms-input-placeholder { /* IE 10+ */
                    font-size: 40px;
                    color: ${props => props.theme.primaryGrey};
                }
                &:-moz-placeholder { /* Firefox 18- */
                    font-size: 40px;
                    color: ${props => props.theme.primaryGrey};
                }
            }

            textarea {
                outline: none;
                border: none;
                resize: none;
                font-size: 17px;
                background: transparent;
                margin-left: 5px;
                line-height: 1.58;

                &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    font-size: 17px;
                }
                &::-moz-placeholder { /* Firefox 19+ */
                    font-size: 17px;               
                }
                &:-ms-input-placeholder { /* IE 10+ */
                    font-size: 17px;
                }
                &:-moz-placeholder { /* Firefox 18- */
                    font-size: 17px;
                }
            }
        }

        button.submit-btn {
            outline: 0;
            background: ${props => props.theme.primaryDarkGrey};
            border: none;
            color: ${props => props.theme.white};
            font-weight: 700;
            text-align: center;
            border-radius: 5px;
            box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            user-select: none;
            transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
            -webkit-tap-highlight-color: transparent;
            padding: .5rem 2rem;
            min-height: 40px;
            min-width: 150px;
            font-size: 1.5rem; 
            margin-top: 2rem;

            &.is-active {
                background-color: ${props => props.theme.primaryColor};
            }

            &:hover {
                background-color: ${props => props.theme.primaryColor};
                background-image: none;
                -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
                box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
                color: rgba(255, 255, 255, .8);
            }
        }
    }
`