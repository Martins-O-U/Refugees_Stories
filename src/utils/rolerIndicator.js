import React from 'react';
import styled from 'styled-components'

const Roller = () => {

    return (
        <StyledRoller>
            <div className="lds-rolling">
                <div></div>
            </div>
        </StyledRoller>
    )
}

export default Roller;

// Styling from loading.io
const StyledRoller = styled.div`
    display: inline-block;
    @keyframes lds-rolling {
        0% {
            -webkit-transform: translate(-50%, -50%) rotate(0deg);
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            -webkit-transform: translate(-50%, -50%) rotate(360deg);
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    @-webkit-keyframes lds-rolling {
        0% {
            -webkit-transform: translate(-50%, -50%) rotate(0deg);
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            -webkit-transform: translate(-50%, -50%) rotate(360deg);
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    .lds-rolling {
        position: relative;
        width: 25px !important;
        height: 25px !important;
        -webkit-transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
        transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
        div,
        div:after {
            position: absolute;
            width: 80px;
            height: 80px;
            border: 10px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
        }
        div {
            -webkit-animation: lds-rolling 1s linear infinite;
            animation: lds-rolling 1s linear infinite;
            top: 100px;
            left: 100px;
            &:after {
                -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
            }
        }
    }
`