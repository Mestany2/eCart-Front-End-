import { clientCredentials } from '../utils/client';

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/allItems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const deleteItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/OrderItem/${orderId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// const getOrderItems = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/api/OrderDetails/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve((data)))
//     .catch(reject);
// });

const createItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/additem`, {
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

const updateItem = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const getItemDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/item/${id}`, {
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
  getAllItems,
  deleteItem,
  createItem,
  updateItem,
  getItemDetails,
};
