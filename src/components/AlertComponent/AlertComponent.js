import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
      marginLeft: "20%",
      marginRight: "10%"
    },
    text: {
        margin: "0px"
    },
    leftColumn: {
        flexDirection: "row",
        alignItems: "initial",
        justifyContent: "initial"
    },
    button:{
        margin: "10px", 
        verticalAlign: "bottom"
    }
  });

function AlertComponent(props){
    const { id, creationDate } = props;

    return(
        <Card variant="outlined" className={useStyles().root}>
            <Grid container spacing={2} style={{justifyContent: "center", alignItems: "center"}}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2} className={useStyles().leftColumn}>
                        <Grid item className={useStyles().textItem}>
                            <p className={useStyles().text}>ID: {id}</p>
                        </Grid>
                        <Grid item className={useStyles().textItem}>
                            <p className={useStyles().text}>Fecha: {creationDate}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} container direction="row">
                    <Button variant="contained" color="primary" className={useStyles().button}>
                        Validar
                    </Button>
                    <Button variant="contained" color="secondary" className={useStyles().button}>
                        Eliminar
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default AlertComponent;