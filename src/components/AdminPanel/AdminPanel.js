import React, { Component } from 'react';
import './AdminPanel.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getOneParameterResponse, getPost } from '../../services/HttpManager';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { Base64 } from "js-base64";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import VariableComponent from '../VariableComponent/VariableComponent';

class RegisterPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            token: props.location.token,
            message: false,
            variables: [],
            getVariablesUrl: 'https://registrolocales-api.azurewebsites.net/env/getVariables'
        };

        this.handleAlertClose = this.handleAlertClose.bind(this);
        this.getVariables = this.getVariables.bind(this);
    }

    componentDidMount(){
        this.getVariables();
    }

    handleAlertClose(){
        this.setState({
            error: false,
            message: false
        });
    }

    async getVariables(){
        const response = await getOneParameterResponse(this.state.getVariablesUrl);
        this.setState({
            variables: response
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
        const variables = this.state.variables;
        const token = this.state.token;
        return(
            <div className="Form" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <Card className="Panel" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                    <h2 id="subtitlePanel">Variables de entorno</h2>
                    <CardContent>
                        <Grid container spacing={2} style={{justifyContent: "center", alignItems: "center"}}>
                            {
                                variables.map(function(item){
                                    return(<VariableComponent key={item._id} name={item.name} value={item.value} description={item.description}
                                        token={token}/>)
                                })
                            }
                        </Grid>
                        <Snackbar id="errorAlert" open={this.state.error} autoHideDuration={5000} onClose={this.handleAlertClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert severity="error" onClose={this.handleAlertClose}>
                                Valor incorrecto
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