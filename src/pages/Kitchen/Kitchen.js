import React, {  useState } from 'react';
import {  NavBar, useStyles, SubToolbar2 } from "../../components/Header/Hearder.js";
import { Footer } from "../../components/Footer/Footer.js";
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { KitchenOrders } from '../../components/Cards/KitchenOrders.js'

export const Kitchen = () => {
  const classes = useStyles();

  return (
  
    <div className={classes.HallConteiner}>
      <NavBar />
      <SubToolbar2 />
      <Box className={classes.customertable}>
        <Typography component="h1" variant="h4" style={{ paddingRight: '50px', textAlign: 'center', fontWeight: 'bolder', color: '#ce5f18', marginLeft: '0.5rem', marginBottom:  '3px'}}>
          Funcionário(a): {localStorage.getItem('name')} <br/>
          Pedidos Pendentes
        </Typography>
      
      </Box>
     
        
        <KitchenOrders />
       
      <Footer />
          
    </div>
  )
  };