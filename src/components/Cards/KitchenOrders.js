import React, { useEffect, useState } from 'react';
import {ConvertDate, ConvertTime} from './ConvertTime';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

export function KitchenOrders() {
  const tokenUser = localStorage.getItem('token');
  const [PedidosAFazer, setPedidosAFazer] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        const pedidosPendentes = pedidos.filter(
          (itens) =>
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setPedidosAFazer(pedidosPendentes);
      });
  };

  useEffect(() => {
    listaPedidos();
  }, []);

  
    const handlePreparar = (pedido, e) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'preparing' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos();
      });
    });
  };

  const handleFinalizar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos();
      });
    });
  };

  return (
    
    <main style={{gap: '10vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginInline: '50px',  }} className="Cozinha">
    
      {PedidosAFazer.map((pedido) => {
        return (
          <Card style={{ textTransform: 'uppercase',  backgroundColor: '#f5f5f5' , color: '#222', textAlign: 'center',
          borderRadius: '3px', position: 'relative', width: '29vw',padding: '30px 31px',}} key={pedido.id}   >
            <div className="details-client">
            <h5 style={{color: '#cf5e18'}} >Status: {pedido.status 
                  .replace('pending', 'Pendente')
                  .replace('preparing', 'Preparando...')}
              </h5>
              <p>Pedido nº {pedido.id}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p  className="date">Data: {ConvertDate(pedido.createdAt)} {ConvertTime(pedido.createdAt)}</p>

            </div>
            <div className="details-status">
              
             
            </div>
            <section className="container-order">
              {pedido.Products.map((itens, index) => (
                <div className="details-order-pending" key={index}>
                  <p>
                    
                    {' '}
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <div style={{ paddingLeft: '5px'}}>
              <Button  style={{backgroundColor: '#f5a970', color: '#fff'}}
                className="btn-preparar"
                onClick={(e) => handlePreparar(pedido, e)}
              >
                PREPARAR
              </Button>
              <Button style={{backgroundColor: '#cf5e18', color: '#fff'}}
                className="btn-finalizar"
                onClick={() => handleFinalizar(pedido)}
              >
                FINALIZAR
              </Button>
            </div>
          </Card>
        );
      })}
    </main>
  );
}

