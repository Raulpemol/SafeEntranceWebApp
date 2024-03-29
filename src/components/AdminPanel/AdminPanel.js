import React, { Component } from 'react';
import './AdminPanel.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getOneParameterResponse, getResponseWithAuth } from '../../services/HttpManager';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import VariableComponent from '../VariableComponent/VariableComponent';

class RegisterPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            token: props.location.token,
            message: false,
            variables: [],
            getVariablesUrl: 'https://registrolocales-api.azurewebsites.net/env/getVariables',
            getAuthPanelUrl: 'https://registrolocales-api.azurewebsites.net/admin/panel'
        };

        if(props.location.token != undefined)
            localStorage.setItem("token", props.location.token);

        this.getVariables = this.getVariables.bind(this);
        this.isLogged = this.isLogged.bind(this);
    }

    componentDidMount(){
        this.isLogged();
    }

    async getVariables(){
        const response = await getOneParameterResponse(this.state.getVariablesUrl);
        this.setState({
            variables: response
        });
    }

    async isLogged(){
        const token = localStorage.getItem("token");
        const response = await getResponseWithAuth(this.state.getAuthPanelUrl, "", token);
        if(response.status == 403){
            this.props.history.push({
                pathname: "/login"
            });
        }
        else{
            const response = await getOneParameterResponse(this.state.getVariablesUrl);
            this.setState({
                variables: response
            });
        }
    }

    render(){
        const localToken = localStorage.getItem("token");
        if((this.state.token == "" || this.state.token == null || this.state.token == undefined) && 
            (localToken == null || localToken == undefined)){
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
                            </CardContent>
                        </Card>
                    </Grid>
                </div>
            );
        }
    }
}

export default withRouter(RegisterPlace);