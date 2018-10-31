import React from 'react';
import { displayNdf } from '../Ndf/Ndf'
import api from '../../utils/api';
import { resolve } from 'url';

export class NdfDisplayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ndfList:null
        }
    }

    componentDidMount() {
        let userid = localStorage.getItem('userId');
        console.log("I'm not lost")
        api.getNdfsOfUser(userid).then(function(response){
            console.log("not lost still")
            this.setState ({
                ndfList: response.data
            });
            //FOR SOME REASON THIS setState NEVER COMPLETES...
            console.log("still not ?")
        })        

    }

    render(){
        return (
        <div>
            <h1> Vos Notes de frais </h1>
        {this.state.ndfList===null?<div></div>:
        <ul>
            {this.state.ndfList.map(function(ndf, index){
                <li key={ index }> {displayNdf(ndf)}</li>}
            )}
        </ul>}
        </div>
        )
    }
}
