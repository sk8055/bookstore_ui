import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('http://127.0.0.1:8000/api/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedOrders = res.data.orders.map(order => ({
          ...order,
          created_at: formatDate(order.created_at),
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}/cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
      console.log('Order cancelled successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container">
      <h2 className="my-4">Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Product - Price</th>
              <th>Total Price</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id}>
              <td>{index + 1}</td>
              <td>{order.order_id}</td>
              <td>
                {order.items.map((item, index) => (
                  <span key={index}>{item.book_name} - ${item.book_price}<br/></span>
                ))}
              </td>
              <td>{order.total_points}</td>
              <td>{order.created_at}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => cancelOrder(order.order_id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;




/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('http://127.0.0.1:8000/api/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/orders/${id}/cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
      console.log('Order cancelled successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Points</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.total_points}</td>
                <td>{order.created_at}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => cancelOrder(order.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;


*/