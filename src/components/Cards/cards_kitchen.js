import React, { useState, useEffect } from 'react';
/* import { useStyles, OutlinedCard } from '../../components/Cards/card_structure.js';*/

export const KitchenOrders = () => {
      /*const classesCard = useStyles();*/
      const [pending, setPending] = useState([]);
      const [progress, setProgress] = useState([]);
      const [ready, setReady] = useState([]);
    
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
            const filterReady = orders.filter(readyGo => readyGo.status === "pronto")
            setPending(filterPending)  
            setProgress(filterinProgress)  
            setReady(filterReady)  
          })
          .catch(erro => console.log(erro))
      },
      []
      );

    return (
      //<OutlinedCard>
      <div className="Cozinha">
        <h1 className="CozinhaTitle">Histórico de Pedidos</h1>
          <div className="orders-received">
            <h4>Recebidos</h4>
          {/*<div className={classesCard.root}>*/}             
          <div>
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
            </div>
          </div>
          <div className="orders-preparing">
              <h4>Já estão em preparo</h4>
            <div>
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
          </div>
          <div className="orders-ready">
              <h4>Estão prontos </h4>
            <div>
              {
                ready.length > 0 && 
                ready.map(readytoGo => {
                  return (
                    <div key={readytoGo.id}>
                    <p>Cliente: {readytoGo.client_name}</p>
                    <p>Mesa: {readytoGo.table}</p>
                    <p>Status: {readytoGo.status}</p>
                    <p>Pedidos</p>
                    <div>
                      {
                        readytoGo.Products.map((commands) => {
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
                      {/*<p>Processado em: {readytoGo.processedAt}</p>*/}
                      {/*<p>Atualizado em: {readytoGo.updatedAt}</p>*/}
                    </div>
                    <button>Atualizar Salão</button>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        //</OutlinedCard>
        );
    }
