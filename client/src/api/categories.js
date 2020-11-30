export function getAll(query) {
  return fetch(`${process.env.REACT_APP_API_URL}/categories?${query}`)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

export function getOne(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

export function add(data, token) {
  return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

export function remove(id, token) {
  return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

// TODO: Rewrite with fetchData
