import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import FighterSelection from '../fighterSelection';
import FighterTile from '../fighterTile';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

export default function GymFighters() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} justifyContent="center">
                <FighterSelection/>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} justifyContent="center">
                    <FighterTile />
                </Grid>
                <Grid item xs={6} justifyContent="center">
                    <FighterTile />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} justifyContent="center">
                    <FighterTile />
                </Grid>
                <Grid item xs={6} justifyContent="center">
                    <FighterTile />
                </Grid>
            </Grid>
        </Grid>
    );
}