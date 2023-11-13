import { clientCredentials } from '../utils/client';

const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/allOrders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserOpenOrders = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/getUserOpenOrder/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const addItemToOpenOrder = (id, item) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/itemtoorder/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/CreateOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const getUserOpenOrder = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/getUserOrders/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserOrder = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/UserOrders/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const checkOutOrder = (id, order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/closeOrder/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then(resolve)
    .catch(reject);
});

const getOrderItems = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/OrderDetails/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getOrderById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/OrderById/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllOrders,
  getUserOpenOrders,
  addItemToOpenOrder,
  createOrder,
  getUserOpenOrder,
  checkOutOrder,
  getUserOrder,
  getOrderItems,
  getOrderById,
};
