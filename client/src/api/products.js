export function getAll() {
  return fetchData("/products");
}

export function popular() {
  return fetchData("/products/popular");
}

export function getOne(id) {
  return fetchData(`/products/${id}`);
}

export function saved(token) {
  return fetchData("/products/saved", {
    headers: {
      Authorization: token,
    },
  });
}

export function bought(token) {
  return fetchData("/products/bought", {
    headers: {
      Authorization: token,
    },
  });
}

export function isSaved(id, token) {
  return fetchData(`/products/is_saved/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function saveOrUnsave(id, token) {
  return fetchData(`/products/save/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}

// TODO: Rewrite headers
function fetchData(url, options) {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, options)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}
