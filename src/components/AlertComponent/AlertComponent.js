import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getPost } from '../../services/HttpManager';

const useStyles = makeStyles({
    root: {
      display: "flex",
      maxWidth: 800,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      backgroundColor: "#006d5b"
    },
    textItem: {
      color: "white",
      alignItems: "initial",
      justifyContent: "center",
      textAlign: "initial",
      marginLeft: "10%",
      marginRight: "10%"
    },
    text: {
        margin: "5px"
    },
    leftColumn: {
        flexDirection: "row",
        alignItems: "initial",
        justifyContent: "initial"
    },
    button:{
        margin: "5%",
        verticalAlign: "bottom"
    }
  });

function AlertComponent(props){
    const { id, code, creationDate } = props;
    const validateUrl = "https://registrolocales-api.azurewebsites.net/api/alerts/validate";
    const deleteUrl = "https://registrolocales-api.azurewebsites.net/api/alerts/deleteNotValid";
    const [state, setState] = useState({
        showAlert: true
    });
    const styles = useStyles();

    async function validateAlert(){
        const response = await getPost(validateUrl, {_id: id});
        if(response.status == 200){
            setState({
                showAlert: false
            });
        }
    }

    async function deleteAlert(){
        const response = await getPost(deleteUrl, {_id: id});
        if(response.status == 200){
            setState({
                showAlert: false
            });
        }
    }

    if(state.showAlert){
        return(
            <Card variant="outlined" className={styles.root}>
                <Grid container spacing={2} style={{justifyContent: "center", alignItems: "center"}}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} className={styles.leftColumn}>
                            <Grid item className={styles.textItem}>
                                <p className={styles.text}>Código: {code}</p>
                            </Grid>
                            <Grid item className={styles.textItem}>
                                <p className={styles.text}>Fecha: {creationDate}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} container direction="row">
                        <Button variant="contained" color="primary" className={styles.button} onClick={validateAlert}>
                            Validar
                        </Button>
                        <Button variant="contained" color="secondary" className={styles.button} onClick={deleteAlert}>
                            Eliminar
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
    else{
        return(null);
    }
}

export default AlertComponent;