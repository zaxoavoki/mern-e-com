export function getAll(query) {
  return fetchData(`/categories?${query}`);
}

export function getOne(id) {
  return fetchData(`/categories/${id}`);
}

export function add(data, token) {
  return fetchData("/categories", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
      // "Content-Type": "application/json",
    },
  });
}

export function remove(id, token) {
  return fetchData(`/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
}

// TODO: Extract to another helper file
function fetchData(url, options) {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, options)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}
