import React, { useEffect, useState } from 'react';

export function HistoricoPedido() {
  const [Pedidos, setPedidos] = useState([]);
  const tokenUser = localStorage.getItem('token');

  const listaPedidos = (tokenUser) => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        setPedidos(pedidos);
      });
  };

  useEffect(() => {
    listaPedidos(tokenUser);
  }, [tokenUser]);

 
  const handleExcluir = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos(tokenUser);
      });
    });
  };

  return (
    <main className="page" style={{display:  'block',}    }>
      <section> 
      {Pedidos.map((pedido) => {
        return (
          <section style={{  display: 'flex', flexDirection: 'column', width: '50%',  textAlign: 'center', margin: '0 auto'}} className="container-pending" key={pedido.id}>
            <div className="details-client">
              <p>PedidoOOOOOOOO nº {pedido.id}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Cliente: {pedido.client_name}</p>
            </div>
            <div className="details-status">
              <h2>Status:</h2>
              <h2>
                {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </h2>
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
              <button className="btn-delete">
                <img
                  className="icon-trash"
                   alt="icon-trash"
                  onClick={() => handleExcluir(pedido)}
                />
              </button>
            </div>
          </section>
        );
      })}
   </section>
    </main>
  );
}

