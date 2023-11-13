import { clientCredentials } from '../utils/client';

const getAllStatuses = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/api/allStatuses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export default getAllStatuses;
