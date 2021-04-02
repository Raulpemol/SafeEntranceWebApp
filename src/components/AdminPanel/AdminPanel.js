import React, { Component } from 'react';
import './AdminPanel.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getPost } from '../../services/HttpManager';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { Base64 } from "js-base64";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class RegisterPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            daysBeforePcrUrl: 'https://registrolocales-api.azurewebsites.net/env/setidbp',
            error: false,
            token: props.location.token,
            daysBeforePcr: 2,
            invalidDaysBeforePcr: false,
            message: false
        };

        this.handleDaysBeforePcr = this.handleDaysBeforePcr.bind(this);
        this.setDaysBeforePcr = this.setDaysBeforePcr.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    handleDaysBeforePcr(e) {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/, '');
        this.setState({
            daysBeforePcr: numbers,
            invalidCapacity: false
        });
    }

    async setDaysBeforePcr(e){
        e.preventDefault();
        const response = await getPost(this.state.daysBeforePcrUrl, 
        {
            "token": this.state.token,
            "value": this.state.daysBeforePcr
        });
            
        if(response.status != 201){
            this.setState({
                error: true,
                password: ''
            });
        }
        else{
            this.setState({
                message: true
            });
        }
    }

    handleAlertClose(){
        this.setState({
            error: false,
            message: false
        });
    }

    render(){
        if(this.state.token == "" || this.state.token == null || this.state.token == undefined){
            this.props.history.push({
                pathname: "/login"
            });
            return null;
        }
        else{
        return(
            <div className="Form" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <Card className="Panel" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                    
                <h2>Variables de entorno</h2>
                    <CardContent>
                        <TextField className="InputVar" variant="filled" id="usernameField" type="number" label="Periodo de contagio previo a prueba" 
                            onChange={this.handleDaysBeforePcr}
                            value={this.state.daysBeforePcr}
                            error={this.state.invalidDaysBeforePcr}
                        />
                        <Button variant="contained" color="primary" type="submit" id="submitButton" style={{verticalAlign: "bottom"}}
                            onClick={this.setDaysBeforePcr}>
                            Guardar
                        </Button>
                        <Snackbar id="errorAlert" open={this.state.error} autoHideDuration={5000} onClose={this.handleAlertClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert severity="error" onClose={this.handleAlertClose}>
                                Credenciales incorrectas
                            </Alert>
                        </Snackbar>
                        <Snackbar id="messageAlert" open={this.state.message} autoHideDuration={5000} onClose={this.handleAlertClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert severity="success" onClose={this.handleAlertClose}>
                                Se ha actualizado el valor correctamente
                            </Alert>
                        </Snackbar>
                    </CardContent>
                </Card>
            </Grid>
        </div>
            
        );
        }
    }
}

export default withRouter(RegisterPlace);