import { clientCredentials } from '../utils/client';

const getPayments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/allPayments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export default getPayments;
