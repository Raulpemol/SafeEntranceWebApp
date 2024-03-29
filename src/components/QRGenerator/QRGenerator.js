import React, { Component } from 'react';
import './QRGenerator.css';
import QRcode from 'qrcode.react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { Base64 } from "js-base64";
import { getOneParameterResponse } from '../../services/HttpManager';

class QRGenerator extends Component {
    constructor(props){
        super(props);
        const path = this.props.location.pathname;
        let qrInfo = path.split('/');
        qrInfo = qrInfo[qrInfo.length - 1];
        qrInfo = Base64.decode(qrInfo);
        this.state = {
            url: 'https://registrolocales-api.azurewebsites.net/api/places/getPlace',
            qrInfo: qrInfo,
            invalid: false
        }

        this.validatePlace = this.validatePlace.bind(this);
        this.downloadQr = this.downloadQr.bind(this);
    }

    async validatePlace(){
        const response = await getOneParameterResponse(this.state.url, this.state.qrInfo);
        if(response == "Incorrect parameter format"){
            await this.setState({
                invalid: true
            });
        }
        else{
            await this.setState({
                invalid: false
            });
        }
    }

    downloadQr(){
        const img = document.getElementById("qr").toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = img;
        downloadLink.download = "QR_SafeEntrance.png";
        downloadLink.click();
    }

    goBack = () => {
        this.props.history.push({
            pathname: "/"
        });
    };

    render(){
        this.validatePlace();

        if(this.state.invalid){
            return(
                <div className="Main" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <Card id="CardQr" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                            <p id="messageWrongPlace">El local no es correcto</p>
                            <div></div>
                            <Button variant="contained" color="primary" id="goBackButton" style={{margin: "10px"}}
                                startIcon={<ArrowBackIcon />}
                                onClick={this.goBack}>
                                Volver
                            </Button>
                        </Card>
                        <div></div>
                    </Grid>
                </div>
            );
        }
        else{
            return(
                <div className="Main" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <Card id="CardQr" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                            <QRcode 
                                id="qr"
                                value={this.state.qrInfo} 
                                size={300}
                                style={{margin: "10px"}}
                            />
                            <div></div>
                            <Button variant="contained" color="primary" id="goBackButton" style={{margin: "10px"}}
                                startIcon={<ArrowBackIcon />}
                                onClick={this.goBack}>
                                Volver
                            </Button>
                            <Button variant="contained" color="primary" id="downloadButton" style={{margin: "10px"}}
                                startIcon={<GetAppIcon />}
                                onClick={this.downloadQr}>
                                Descargar
                            </Button>
                        </Card>
                        <div></div>
                    </Grid>
                </div>
            );
        }
        
    }
}

export default withRouter(QRGenerator);