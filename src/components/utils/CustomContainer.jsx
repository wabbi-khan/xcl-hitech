import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        marginLeft: 0,
        marginTop: 15,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: -15,
      },
    },  
}));

const CustomContainer = ({children}) => {
  const classes = useStyles();

    return (
        <Container className={classes.mainContainer}>
            {children}
        </Container>
    )
}

export default CustomContainer;