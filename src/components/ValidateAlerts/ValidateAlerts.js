import React, { Component } from 'react';
import './ValidateAlerts.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getOneParameterResponse } from '../../services/HttpManager';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertComponent from '../AlertComponent/AlertComponent';

class ValidateAlerts extends Component {
    constructor(props){
        super(props);

        this.state = {
            url: 'https://registrolocales-api.azurewebsites.net/api/alerts/getNotValidated',
            error: false,
            alerts: []
        };

        this.getAlerts = this.getAlerts.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    componentDidMount(){
        this.getAlerts();
    }

    async getAlerts(){
        const response = await getOneParameterResponse(this.state.url);
        if(response.count < 1){
            this.setState({
                error: true,
                invalidAddress: true
            });
        }
        else{
            this.setState({
                alerts: response
            });
        }
    }

    handleAlertClose(){
        this.setState({
            error: false
        });
    }

    render(){
        const data = this.state.alerts;
        return(
            <div className="FormValidate" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card id="CardValidate" variant="outlined" style={{backgroundColor: "#baf2e9", overflow: "scroll"}}>
                        <h2 id="subtitleValidate">Alertas para validar</h2>
                        <CardContent>
                            <div id="alertsList" style={{margin: "10px", display: "inline-grid"}}>
                                {
                                    data.map(function(item){
                                        return(<AlertComponent key={item._id} id={item._id} code={item.code} creationDate={item.alertDate}/>)
                                    })
                                }
                            </div>
                            <Snackbar id="notExistsAlert" open={this.state.error} autoHideDuration={5000} onClose={this.handleAlertClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert severity="error" onClose={this.handleAlertClose}>
                                    No se han recuperado alertas
                                </Alert>
                            </Snackbar>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default withRouter(ValidateAlerts);