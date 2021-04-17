import React from 'react';
import Card from '@material-ui/core/Card';
import QRcode from 'qrcode.react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display: "flex",
      maxWidth: 1000,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px"
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
        alignItems: "initial",
        justifyContent: "center"
    }
  });

function PlaceComponent(props){
    const { placeName, id, address, capacity } = props;

    return(
        <Card variant="outlined" style={{backgroundColor: "#006d5b"}} className={useStyles().root}>
            <Grid container spacing={2} style={{justifyContent: "center", alignItems: "center"}}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2} className={useStyles().leftColumn}>
                        <Grid item className={useStyles().textItem}>
                            <p className={useStyles().text}>Nombre: {placeName}</p>
                        </Grid>
                        <Grid item className={useStyles().textItem}>
                            <p className={useStyles().text}>Dirección: {address}</p>
                        </Grid>
                        <Grid item className={useStyles().textItem}>
                            <p className={useStyles().text}>Aforo máximo: {capacity}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                <QRcode 
                    value={id} 
                    size={200}
                    style={{margin: "10px"}}
                />
                </Grid>
            </Grid>
        </Card>
    );
}

export default PlaceComponent;