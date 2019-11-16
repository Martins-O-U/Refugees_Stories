import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actions from '../state/actions';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import refugeeOrgIcon from '../assets/icons/refugee-orgs.svg';
import Navigation from "../components/Website/Navigation";
import Roller from "../components/LoadingIndicator/roller";


const Volunteer = ({ volunteerPlaces, volunteerPlacesStatus, getVolunteerPlaces }) => {
    
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100vh',
        latitude: 0,
        longitude: 0,
        zoom: 10
    })

    useEffect(() => {
        getVolunteerPlaces();
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setViewport({
                    ...viewport,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        } else {
            alert("Sorry, browser does not support geolocation!");
        }
    }, []) //eslint-disable-line


    return (
        <StyledMapContainer>
            <header>
                <Navigation noheader />
                <div className="page-content">
                    <h2>Be a part of change</h2>
                    <p>Volunteer with any refugee organizations near you. Click the icon to get more information.</p>
                </div>
            </header>
            {
                volunteerPlacesStatus ? (
                    <ReactMapGL 
                        {...viewport} 
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle="mapbox://styles/ofega/ck24g6ius3ydb1cpae90duihv"
                        onViewportChange={viewport => setViewport(viewport)}
                    >

                        {
                            volunteerPlaces.response.venues.map(org => (
                                <Marker
                                    key={org.id}
                                    latitude={org.location.lat}
                                    longitude={org.location.lng}
                                >
                                    <button
                                        className="marker-btn"
                                        onClick={
                                            e => {
                                                e.preventDefault();
                                                setSelectedOrg(org);
                                            }
                                        }
                                    >
                                        <img src={refugeeOrgIcon} alt="Refugee Organizations Icon" />
                                    </button>
                                </Marker>
                            ))
                        }

                        {
                            selectedOrg ? (
                                <Popup
                                    latitude={selectedOrg.location.lat}
                                    longitude={selectedOrg.location.lng}
                                    onClose={() => {
                                        setSelectedOrg(null);
                                    }}
                                >
                                    <div>
                                        <h2>{selectedOrg.name}</h2>
                                        <p>
                                            {selectedOrg.location.address || null} 
                                            {selectedOrg.location.city || null} 
                                            {", " + selectedOrg.location.country || null}
                                        </p>
                                    </div>
                                </Popup>
                            ) : null
                        }
                    </ReactMapGL>
                ) : (
                    <div className="loading-indicator">
                        <Roller isSiteWide={true} />
                    </div>
                )
            }
        </StyledMapContainer>
    );
}

export default connect(state => state, actions)(Volunteer)

const StyledMapContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    header {
        padding: 2rem;
        flex: 0 1 auto;

        .page-content {
            max-width: ${props => props.theme.largeMaxWidth};
            margin: 8rem auto 3rem;
            width: 100%;

            h2 {
                font-size: 5rem;
            }

            p {
                font-size: 2rem;
                margin-top: .5rem;
                max-width: 400px;    
            }

            @media (max-width: 500px) {
                margin: 3rem auto 1rem;

                h2 {
                    font-size: 3.5rem;
                }

                p {
                    font-size: 1.7rem;  
                }
            }
        }
    }

    button.marker-btn {
        background: transparent;
        border: none; 
        outline: none;
        height: 20px;
        width: 20px;
    }

    & > div {
        flex: 1 1 auto;
        width: 100%;
        background: ${props => props.theme.primaryDarkGrey};
    }

    .loading-indicator {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`