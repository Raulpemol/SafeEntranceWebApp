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

class QRGenerator extends Component {
    constructor(props){
        super(props);
        const path = this.props.location.pathname;
        let qrInfo = path.split('/');
        qrInfo = qrInfo[qrInfo.length - 1];
        qrInfo = Base64.decode(qrInfo);
        this.state = {
            qrInfo: qrInfo
        }
        this.downloadQr = this.downloadQr.bind(this);
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
        return(
            <div className="Main" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card className="Card" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                        <QRcode 
                            id="qr"
                            value={this.state.qrInfo} 
                            size={300}
                        />
                        <div></div>
                        <Button variant="contained" color="primary" id="submitButton" style={{margin: "10px"}}
                            startIcon={<ArrowBackIcon />}
                            onClick={this.goBack}>
                            Volver
                        </Button>
                        <Button variant="contained" color="primary" id="submitButton" style={{margin: "10px"}}
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

export default withRouter(QRGenerator);