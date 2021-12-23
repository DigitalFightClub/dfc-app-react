import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';


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

export default function GymHeader() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h2" component="h2">
                    Red Dragon Gym
                </Typography>
            </CardContent>
        </Card>
    );
}