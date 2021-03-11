import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

export const ListaPedidosProntos = () => {
  const tokenUser = localStorage.getItem('token');
  const [PedidosProntos, setPedidosProntos] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const pedidosEntregar = products.filter((itens) =>
          itens.status.includes('ready')
        );
        setPedidosProntos(pedidosEntregar);
      });
  };

  const handleAtualizar = () => {
    listaPedidos();
  };

  useEffect(() => {
    listaPedidos();
  }, []);

  const handleEntregar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'finished' };

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
    <main style={{ display: 'block' }} className="page">
     <Typography component="h1" variant="h4" style={{paddingBottom: '20px', paddingRight: '50px', textAlign: 'center', fontWeight: 'bolder', color: '#ce5f18', marginLeft: '0.5rem' }}>
     Pedidos Prontos
        </Typography> 
      <section style={{ display: 'flex',  width: '100%', textAlign: 'center', margin: '0 auto' }}>
        
        {PedidosProntos.map((pedido) => {
          return (
            <section style={{
              overflow: 'scroll',  width: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center'
            }} className="container-pending" key={pedido.id}>
             <Card style={{ padding: '.5rem',backgroundColor: '#e5e5e5',
    display: 'flex',flexDirection: 'column',width: '95%',height: '100%', margin: '0 0 1rem'}}>
                <div className="details-client">
                  <p>Pedido nº {pedido.id}</p>
                  <p>Mesa: {pedido.table}</p>
                  <p>Cliente: {pedido.client_name}</p>
                </div>
                <div className="details-status">

                </div>
                <section className="container-order scroll">
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
                <div>
                  <button
                    className="btn-finalizar"
                    onClick={() => handleEntregar(pedido)}
                  >
                    ENTREGAR
              </button>
                </div>
                 </Card>
          </section>
        
          );
        })}
      </section>
    </main>
  );
};

