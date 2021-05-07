import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getPost } from '../../services/HttpManager';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router";

function VariableComponent(props){
    const { name, value, description, token } = props;
    const history = useHistory();
    const baseApiUrl = 'https://registrolocales-api.azurewebsites.net/env/setVariable';
    const [state, setState] = useState({
        value: value,
        invalid: false,
        alert: false,
        message: false
    });

    function handleInput(e) {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/, '');
        setState({
            value: numbers,
            invalid: false,
            alert: false,
            message: false
        });
    }

    async function setVariable(e){
        e.preventDefault();
        const response = await getPost(baseApiUrl, 
        {
            "token": token,
            "name": name,
            "value": state.value
        });
            
        if(response.status != 201){
            setState({
                value: state.value,
                invalid: true,
                alert: true,
                message: false
            });
            if(response.status == 403){
                localStorage.setItem("token", null);
                history.push({
                    pathname: "/login"
                });
                return null;
            }
        }
        else{
            setState({
                value: state.value,
                invalid: false,
                alert: false,
                message: true
            });
        }
    }

    function handleAlertClose(){
        setState({
            value: state.value,
            invalid: false,
            alert: false,
            message: false
        });
    }

    return(
        <Grid item xs={12} sm={4}>
            <TextField className="inputVar" variant="outlined" type="number" label={description}
                onChange={handleInput}
                value={state.value}
                error={state.invalid}
            />
            <Button variant="contained" color="primary" type="submit" style={{verticalAlign: "bottom", margin: "5px"}}
                onClick={setVariable}>
                Guardar
            </Button>
            <Snackbar id="errorAlert" open={state.alert} autoHideDuration={5000} onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" onClose={handleAlertClose}>
                    Valor no permitido
                </Alert>
            </Snackbar>
            <Snackbar id="messageAlert" open={state.message} autoHideDuration={5000} onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" onClose={handleAlertClose}>
                    Se ha actualizado el valor correctamente
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default VariableComponent;