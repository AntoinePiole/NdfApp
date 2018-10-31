import React from 'react';
import { Button } from "react-bootstrap";

import api from '../../utils/api';

export class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.disconnect.bind(this);
        console.log(localStorage);
    }
    disconnect = event => {
        api.logout();
        window.location = "/";
    }
    moveToNdfForm = event => {
        window.location = "/ndfform";
    }
    render() {
        return(
            <div className="Dashboard">
                <h1>Gestionnaire de notes de frais</h1>
                <Button
                onClick={this.disconnect}
                block
                bsSize="large"
                type="submit"
                >
                Se déconnecter
                </Button>
                <Button
                onClick={this.moveToNdfForm}
                block
                bsSize="large"
                type="submit"
                >
                Soumettre une Note de Frais
                </Button>
            </div>
        )
    }
}