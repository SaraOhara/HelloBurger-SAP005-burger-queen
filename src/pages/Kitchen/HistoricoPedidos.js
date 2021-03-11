import React, {  useState } from 'react';
import {  NavBar, useStyles, SubToolbar2 } from "../../components/Header/Hearder.js";
import { Footer } from "../../components/Footer/Footer.js";
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { HistoricoPedido } from '../../components/Cards/GeneralHistory'

export const HistoricoPedidos = () => {
  const classes = useStyles();

  return (
  
    <div className={classes.HallConteiner}>
      <NavBar />
      <SubToolbar2 />
      <Box className={classes.customertable}>
        <Typography component="h1" variant="h4" style={{ paddingRight: '50px', textAlign: 'center', fontWeight: 'bolder', color: '#ce5f18', marginLeft: '0.5rem' }}>
          Funcionário(a): {localStorage.getItem('name')}
        </Typography>
      
      </Box>
        
        <HistoricoPedido />
       
      <Footer />
          
    </div>
  )
  };