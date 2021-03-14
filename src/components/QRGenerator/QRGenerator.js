import React, { Component } from 'react';
import './QRGenerator.css';
import QRcode from 'qrcode.react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

class QRGenerator extends Component {

    render(){
        return(
            <div className="Main" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card className="Card" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                        <QRcode 
                            id="qr"
                            value={"prueba"} 
                            size={300}
                        />
                        <div></div>
                        <Button variant="contained" color="primary" id="submitButton" style={{margin: "10px"}}
                            startIcon={<ArrowBackIcon />}>
                            Volver
                        </Button>
                        <Button variant="contained" color="primary" id="submitButton" style={{margin: "10px"}}
                            startIcon={<GetAppIcon />}>
                            Descargar
                        </Button>
                    </Card>
                    <div></div>
                </Grid>
            </div>
        );
    }
}

export default QRGenerator;