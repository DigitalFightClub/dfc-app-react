import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';

import GymTile from '../gymTile';
import GymHeader from '../gymHeader';

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
            padding: theme.spacing(3),
        },
    }),
);

export default function Gym() {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid container item xs={12} spacing={3}>
                    <Grid container justifyContent="center">
                        <GymHeader/>
                    </Grid>
                </Grid>
                
                <Grid container item xs={12} spacing={3}>
                    <Grid container justifyContent="center">
                        <GymTile /> <GymTile /> <GymTile />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid container justifyContent="center">
                        <GymTile /> <GymTile /> <GymTile />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}