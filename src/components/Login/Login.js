import React, { Component } from 'react';
import './Login.css';
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
            url: 'https://registrolocales-api.azurewebsites.net/admin',
            error: false,
            errorField: false,
            username: '',
            password: ''
        };

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.login = this.login.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    handleUsernameInput(e){
        const input = e.target.value;
        this.setState({
            username: input,
            errorField: false
        });
    }

    handlePasswordInput(e){
        const input = e.target.value;
        this.setState({
            password: input,
            errorField: false
        });
    }

    async login(e){
        e.preventDefault();
        const response = await getPost(this.state.url, 
        {
            "username": this.state.username,
            "password": this.state.password
        });
            
        if(response.status != 200){
            localStorage.setItem("token", null);
            this.setState({
                error: true,
                errorField: true,
                password: ''
            });
        }
        else{
            const body = await response.json();
            const token = body["token"];
            localStorage.setItem("token", token);
            
            this.props.history.push({
                pathname: "/panel",
                token: token
            });
        }
    }

    handleAlertClose(){
        this.setState({
            error: false
        });
    }

    render(){
        return(
            <div className="Form" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card id="CardLogin" variant="outlined" style={{backgroundColor: "#baf2e9", paddingLeft: "50px", paddingRight: "50px"}}>
                        
                    <h2>Panel de administración</h2>
                        <CardContent>
                            <form id="formCard" onSubmit={this.login} autoComplete="off">
                                
                                <TextField className="FormInput" variant="outlined" id="usernameField" label="Nombre de usuario" 
                                    onChange={this.handleUsernameInput}
                                    value={this.state.username}
                                    error={this.state.errorField}
                                />
                                <p></p>
                                <TextField className="FormInput" variant="outlined" id="passwordField" label="Contraseña" 
                                    onChange={this.handlePasswordInput} 
                                    value={this.state.password}
                                    type="password"
                                    autoComplete="current-password"
                                    error={this.state.errorField}
                                />
                                <p></p>
                                <Button variant="contained" color="primary" type="submit" id="submitButton">
                                    Entrar
                                </Button>
                            </form>
                            <Snackbar id="errorAlert" open={this.state.error} autoHideDuration={5000} onClose={this.handleAlertClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert severity="error" onClose={this.handleAlertClose}>
                                    Credenciales incorrectas
                                </Alert>
                            </Snackbar>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default withRouter(RegisterPlace);