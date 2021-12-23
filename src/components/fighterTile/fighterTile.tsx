import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        fighter: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '200px'
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export default function GymHeader() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.fighter}>xs=6</Paper>
            </Grid>
            <Grid container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
