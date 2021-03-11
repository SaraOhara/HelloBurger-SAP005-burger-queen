import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});




export const KitchenOrders = () => {
      const classes = useStyles();
      const [pending, setPending] = useState([]);
      const [progress, setProgress] = useState([]);
      /*const [ready, setReady] = useState([]);*/    
      useEffect(() => {
        const userToken = localStorage.getItem("token")
    
        fetch('https://lab-api-bq.herokuapp.com/orders', {
          headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            const orders = data
            const filterPending = orders.filter(order => order.status === "pending")
            const filterinProgress = orders.filter(inProgre => inProgre.status === "em preparo")
            /*const filterReady = orders.filter(readyGo => readyGo.status === "pronto")*/            
            setPending(filterPending)  
            setProgress(filterinProgress)  
            /*setReady(filterReady)*/
            })
          .catch(erro => console.log(erro))
      },
      []
      );

    return (
      
      <div className="Cozinha">
        <h1 className="CozinhaTitle">Histórico de Pedidos</h1>
          <section className="orders-received">
            <h3>Recebidos</h3>
            {/*<div className={classesCard.root}>*/}        
            <Card className={classes.root} variant="outlined">
            <CardContent>>
              {
                pending.length > 0 && 
                pending.map(pendency => {
                  return (
                    <div key={pendency.id}>
                      <p>Cliente: {pendency.client_name}</p>
                      <p>Mesa: {pendency.table}</p>
                      <p>Status: {pendency.status}</p>
                      <p>Pedidos</p>
                        <div>
                          {
                            pendency.Products.map((commands) => {
                              return (
                                <div key={commands.id}>
                                  <p>Produto: {commands.name}</p>
                                  {/*<p>Sabor: {commands.flavor}</p>*/}
                                  <p>Quantidade: {commands.qtd}</p>
                                  {/*<p>Complemento: {commands.complement}</p>*/}
                                </div>
                              )
                            })
                          }
                          {/*<p>Processado em: {pendency.processedAt}</p>*/}
                          {/*<p>Atualizado em: {pendency.updatedAt}</p>*/}
                        </div>
                        <button>Pedido em Preparo</button>
                      </div>
                      )
                })
              }
              </CardContent>
             </Card>
          </section>
          <section className="orders-preparing">
              <h3>Já estão em preparo</h3>
            <div className="cards-pending">
              {
                progress.length > 0 && 
                progress.map(progressing => {
                  return (
                    <div key={progressing.id}>
                      <p>Cliente: {progressing.client_name}</p>
                      <p>Mesa: {progressing.table}</p>
                      <p>Status: {progressing.status}</p>
                      <p>Pedidos</p>
                        <div>
                          {
                            progressing.Products.map((commands) => {
                              return (
                                <div key={commands.id}>
                                  <p>Produto: {commands.name}</p>
                                  {/*<p>Sabor: {commands.flavor}</p>*/}
                                  <p>Quantidade: {commands.qtd}</p>
                                  {/*<p>Complemento: {commands.complement}</p>*/}
                                </div>
                              )
                            })
                          }
                          {/*<p>Processado em: {progressing.processedAt}</p>*/}
                          {/*<p>Atualizado em: {progressing.updatedAt}</p>*/}
                        </div>
                    <button>Pedido Pronto</button>
                    </div>
                  )
                })
              }
            </div>
            
          </section>
        </div>
        
        );
    }
