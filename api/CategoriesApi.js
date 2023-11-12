import { clientCredentials } from '../utils/client';

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/allCategories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getCategoryItems = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/getCategoryItems/${id}`, {
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
  getAllCategories,
  getCategoryItems,
};
