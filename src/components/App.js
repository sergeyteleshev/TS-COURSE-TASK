import React from 'react';
import '../styles.scss';
import {Link, Route, Switch} from "react-router-dom";
import MainContainer from "../containers/MainContainer";

export default class App extends React.Component {
    render() {
        return  (
            <MainContainer/>
        );
    }
}
