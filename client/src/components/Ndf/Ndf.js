import React from 'react';
import { Button } from "react-bootstrap";

import api from '../../utils/api';

export class Ndf extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Ndf">
            <h1>{this.title}</h1>
            <p>{this.date}</p>
            <p>{this.amount} </p>
            <p>{this.currency}</p>
            <p>{this.comment}</p>
            </div>
        )
    }
}

export function displayNdf (props) {
    return (
        <div className="Ndf">
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.amount} </p>
        <p>{props.currency}</p>
        <p>{props.comment}</p>
        </div>
    )
}