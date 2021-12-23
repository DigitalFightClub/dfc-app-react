import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export default function FighterSelection() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid container item xs={12} spacing={3}>
                <Grid container justifyContent="center">
                    <Typography variant="h2" component="h2">
                        Active Fighters | Retired Fighters
                    </Typography> 
                </Grid>
            </Grid>
        </Grid>
    );
}