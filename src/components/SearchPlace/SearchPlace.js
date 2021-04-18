import React, { Component } from 'react';
import './SearchPlace.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getOneParameterResponse } from '../../services/HttpManager';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { Base64 } from "js-base64";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import PlaceComponent from '../PlaceComponent/PlaceComponent';

class SearchPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            url: 'https://registrolocales-api.azurewebsites.net/api/places/searchPlaceByName',
            name: '',
            invalidName: false,
            error: false,
            places: []
        };

        this.handleNameInput = this.handleNameInput.bind(this);
        this.generateQr = this.generateQr.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    handleNameInput(e){
        const input = e.target.value;
        this.setState({
            name: input,
            invalidName: false
        });
    }

    validateFields(){
        let isValid = true;

        if(this.state.name == null || this.state.name.length < 1){
            this.setState({
                name: '',
                invalidName: true
            });
            isValid = false;
        }

        return isValid;
    }

    async generateQr(e){
        e.preventDefault();
        if(this.validateFields()){
            const response = await getOneParameterResponse(this.state.url, this.state.name);
            if(response.status == 400 || response.length < 1){
                this.setState({
                    error: true,
                    invalidAddress: true
                });
            }
            else{
                this.setState({
                    places: response
                });
            }
        }
    }

    handleAlertClose(){
        this.setState({
            error: false
        });
    }

    render(){
        const data = this.state.places;
        return(
            <div className="FormSearch" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card id="CardSearch" variant="outlined" style={{backgroundColor: "#baf2e9", overflow: "scroll"}}>
                        <h2 id="subtitleSearch">Buscar un local en el sistema</h2>
                        <CardContent>
                            <form id="formCard" onSubmit={this.generateQr} autoComplete="off">
                                <TextField variant="standard" id="searchField" label="Nombre del local" 
                                    onChange={this.handleNameInput}
                                    value={this.state.name}
                                    error={this.state.invalidName}
                                />
                                <Button variant="contained" color="primary" type="submit" id="searchButton" style={{margin: "10px", verticalAlign: "bottom"}}>
                                    <SearchIcon />
                                </Button>
                            </form>
                            <div id="placesList" style={{margin: "10px", display: "inline-grid"}}>
                                {
                                    data.map(function(item){
                                        return(<PlaceComponent key={item._id} placeName={item.name} id={item._id} address={item.address} capacity={item.capacity}/>)
                                    })
                                }
                            </div>
                            <Snackbar id="notExistsAlert" open={this.state.error} autoHideDuration={5000} onClose={this.handleAlertClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert severity="error" onClose={this.handleAlertClose}>
                                    No se ha encontrado ningún local con ese nombre
                                </Alert>
                            </Snackbar>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default withRouter(SearchPlace);