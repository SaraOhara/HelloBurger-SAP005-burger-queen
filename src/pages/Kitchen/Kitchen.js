import React, {  useState } from 'react';
import {  NavBar, useStyles, SubToolbar } from "../../components/Header/Hearder.js";
import { Footer } from "../../components/Footer/Footer.js";
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { KitchenOrders } from '../../components/Cards/cards_kitchen.js'

export const Kitchen = () => {
  const classes = useStyles();

  return (
  
    <div className={classes.HallConteiner}>
      <NavBar />
      <SubToolbar />
        <Box className={classes.customertable}>
        <KitchenOrders />
        </Box>
      <Footer />
          
    </div>
  )
  };