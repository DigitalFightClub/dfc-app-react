import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    }
});

export default function GymTile() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h2" component="h2">
                    4
                </Typography>
                <Typography variant="body2" component="p">
                    Active Fighters
                </Typography>
            </CardContent>
        </Card>
    );
}
