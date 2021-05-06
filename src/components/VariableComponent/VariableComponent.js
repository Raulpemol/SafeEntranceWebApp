import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import QRcode from 'qrcode.react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getPost } from '../../services/HttpManager';



function VariableComponent(props){
    const { name, value, description, token } = props;
    const baseApiUrl = 'https://registrolocales-api.azurewebsites.net/env/set';
    const [state, setState] = useState({
        value: value,
        invalid: false
    });

    function handleInput(e) {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/, '');
        setState({
            value: numbers,
            invalid: false,
            message: false
        });
    }

    async function setVariable(e){
        e.preventDefault();
        const url = baseApiUrl + name;
        const response = await getPost(url, 
        {
            "token": token,
            "value": state.value
        });
            
        if(response.status != 201){
            setState({
                value: state.value,
                invalid: true,
                message: false
            });
        }
        else{
            setState({
                message: true,
                value: state.value,
                invalid: false
            });
        }
    }

    return(
        <Grid item xs={12} sm={4}>
            <TextField className="InputVar" variant="filled" type="number" label={description}
                onChange={handleInput}
                value={state.value}
                error={state.invalid}
            />
            <Button variant="contained" color="primary" type="submit" style={{verticalAlign: "bottom", margin: "5px"}}
                onClick={setVariable}>
                Guardar
            </Button>
        </Grid>
    );
}

export default VariableComponent;