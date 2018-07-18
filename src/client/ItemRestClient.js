import { Issue, SEVERITY, ValidationError, ApiError } from '../shared/core';
import fetch from 'node-fetch';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const itemUrl = 'http://localhost:3000/api/item';

const fetchItem = (path, { method = 'GET', body = null }) => {
  const options = { method, headers };
  if (body) {
    options.body = body;
  }
  return fetch(`${itemUrl}/${path}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
          .then(json => (
            response.status === 404
              ? Promise.resolve(null)
              : Promise.reject(new ApiError(json.issues)))
          );
      }
    });
}

export class ItemRestClient {
  async create(item) {
    return await fetchItem('', { method: 'POST', body: JSON.stringify(item) });
  }

  async read(id) {
    return await fetchItem(`${id}`, { method: 'GET' });
  }

  async update(item) {
    return await fetchItem(`${item.id}`, { method: 'PUT', body: JSON.stringify(item) });
  }

  async remove(id) {
    return await fetchItem(`${item.id}`, { method: 'DELETE' });
  }

  async search(props) {
    const params = Object.keys(props).map(key => `&${key}=${props[key]}`);
    return await fetchItem(`?${params.length > 0 ? params.substring(1) : ''}`, { method: 'GET' });
  }
}
