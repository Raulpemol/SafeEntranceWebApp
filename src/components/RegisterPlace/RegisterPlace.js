import React, { Component } from 'react';
import './RegisterPlace.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getPost } from '../../services/HttpManager';
import { withRouter } from 'react-router-dom';
import { Base64 } from "js-base64";

class RegisterPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            url: 'https://registrolocales-api.azurewebsites.net/api/addPlace',
            name: '',
            invalidName: false,
            address: '',
            invalidAddress: false,
            capacityValue: '',
            invalidCapacity: false
        };

        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleCapacityInput = this.handleCapacityInput.bind(this);
        this.generateQr = this.generateQr.bind(this);
    }

    handleNameInput(e){
        const input = e.target.value;
        this.setState({
            name: input,
            invalidName: false
        });
    }

    handleAddressInput(e){
        const input = e.target.value;
        this.setState({
            address: input,
            invalidAddress: false
        });
    }

    handleCapacityInput(e) {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/, '');
        this.setState({
            capacityValue: numbers,
            invalidCapacity: false
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
        if(this.state.address == null || this.state.address.length < 1){
            this.setState({
                address: '',
                invalidAddress: true
            });
            isValid = false;
        }
        if(this.state.capacityValue == null || this.state.capacityValue == ''){
            this.setState({
                capacityValue: '',
                invalidCapacity: true
            });
            isValid = false;
        }

        return isValid;
    }

    async generateQr(e){
        e.preventDefault();
        if(this.validateFields()){
            await getPost(this.state.url, 
            {
                "name": this.state.name,
                "address": this.state.address,
                "capacity": this.state.capacityValue
            });

            await this.viewQr("hola");
        }
    }

    viewQr = (param) => {
        const id = Base64.encode(param);
        this.props.history.push({
            pathname: "/generated_qr/" + id
        });
    };

    render(){
        return(
            <div className="Form" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Card className="Card" variant="outlined" style={{backgroundColor: "#baf2e9"}}>
                    <CardContent>
                        <form id="formCard" onSubmit={this.generateQr} autoComplete="off">
                            <TextField className="FormInput" variant="outlined" id="nameField" label="Nombre del local" 
                                onChange={this.handleNameInput}
                                value={this.state.name}
                                error={this.state.invalidName}
                            />
                            <p></p>
                            <TextField className="FormInput" variant="outlined" id="addressField" label="Dirección" 
                                onChange={this.handleAddressInput} 
                                value={this.state.address}
                                error={this.state.invalidAddress}
                            />
                            <p></p>
                            <TextField className="FormInput" variant="outlined" id="capacityField" label="Aforo" type="number"
                                onChange={this.handleCapacityInput}
                                value={this.state.capacityValue}
                                error={this.state.invalidCapacity}
                            />
                            <p></p>
                            <Button variant="contained" color="primary" type="submit" id="submitButton">
                                Generar QR
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withRouter(RegisterPlace);