export function getAll(query) {
  return fetchData(`/users?${query}`);
}

export function getOne(id) {
  return fetchData(`/users/${id}`);
}

export function remove(id, token) {
  return fetchData(`/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
}

export function update(id, data, token) {
  return fetchData(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
}

function fetchData(url, options) {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, options)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}
