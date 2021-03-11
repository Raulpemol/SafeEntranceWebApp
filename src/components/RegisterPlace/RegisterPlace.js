import React, { Component } from 'react';
import './RegisterPlace.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


class RegisterPlace extends Component {
    constructor(props){
        super(props);

        this.state = {
            capacityValue: '',
        };

        this.handleNonNumericInput = this.handleNonNumericInput.bind(this);
    }

    handleNonNumericInput(e) {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/, '');
        this.setState({
            capacityValue: numbers
        });
    }

    render(){
        return(
            <div className="Form" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
                <Card className="FormInput" variant="outlined">
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <TextField className="FormInput" variant="outlined" id="nameField" label="Nombre del local"/>
                            <p></p>
                            <TextField className="FormInput" variant="outlined" id="addressField" label="Dirección"/>
                            <p></p>
                            <TextField className="FormInput" variant="outlined" id="capacityField" label="Aforo" type="number"
                                defaultValue={this.state.capacityValue}
                                onChange={this.handleNonNumericInput}
                                value={this.state.capacityValue}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default RegisterPlace;