import React, { Component } from 'react';
import './QRGenerator.css';
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class QRGenerator extends Component {

    render(){
        return(
            <div className="Main" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Card className="Card" variant="outlined" style={{backgroundColor: "#baf2e9"}}>

                </Card>
            </div>
        );
    }
}

export default QRGenerator;