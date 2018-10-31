import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import api from '../../utils/api';

export class NdfForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            userid: localStorage.getItem('userId'),
            date : new Date(),
            amount: "",
            currency: "€",
            comment: ""
        }
        this.handleChange.bind(this);
        //this.send.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleSelect = event => {
        //console.log(event);
        // what am I suppose to write in there to get the value?
        this.setState({
            currency: event
        })
    }
    send = event => {
        //console.log("Sending request to create a ndf")
        if(this.state.title.length === 0 || this.state.amount === 0 ){
            return;
        }
        var _send = this.state;
        console.log(_send)
        api.createNdf(_send).then(function(data){
            window.location = "/display"
        },function(error){
            console.log(error);
            return;
        })
    }    
    render() {
        if(this.userid) {
            return(
                <div>
                    Vous devez être connecté pour soumettre une note de frais
                </div>
            )
        }
        else{
            return(
                <div className="NdfForm">
                    <FormGroup controlId="title" bsSize="large">
                    <ControlLabel>Titre</ControlLabel>
                    <FormControl autoFocus type="title" value={this.state.title} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="amount" bsSize="large">
                    <ControlLabel>Montant ({this.state.currency})</ControlLabel>
                    <FormControl autoFocus type="amount" value={this.state.amount} onChange={this.handleChange}/>
                    </FormGroup>

                    <DropdownButton title={this.state.currency} id='currencyDropDown' onSelect={this.handleSelect} data-toggle="dropdown">
                        <MenuItem eventKey='€'>Euro (€)</MenuItem>
                        <MenuItem eventKey='$'>Dollar ($)</MenuItem>
                        <MenuItem eventKey='£'>Pound (£)</MenuItem>
                    </DropdownButton>                    

                    <FormGroup controlId="comment" bsSize="large">
                    <ControlLabel>Commentaires</ControlLabel>
                    <FormControl autoFocus type="comment" value={this.state.comment} onChange={this.handleChange}/>
                    </FormGroup>

                    <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                    >
                    Soumettre
                    </Button>
            </div>
            )
        }
    }
}


//TODO : IMPLEMENT OPTION ON CLICK AND CHOICE OF CURRENCY, THEN IMPLEMENT NEW DOCUMENTS