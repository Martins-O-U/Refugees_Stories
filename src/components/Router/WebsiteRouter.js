import React from "react";
import { Route } from "react-router-dom";
import Home from '../../pages/Home';
import Stories from '../../pages/Stories';
import SubmitStory from '../../pages/SubmitStory';
import SingleUserStory from "../../pages/SingleUserStory";
import Volunteer from "../../pages/Volunteer";


const WebsiteRouter = () => (
    <>
        <Route exact path="/" component={Home} />
        <Route exact path="/stories/:id" component={SingleUserStory} />
        <Route exact path="/stories" component={Stories} />
        <Route path="/submit-story" component={SubmitStory} />
        <Route path="/volunteer" component={Volunteer} />
    </>
);

export default WebsiteRouter