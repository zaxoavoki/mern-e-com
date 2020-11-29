const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export function login(email, password) {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    headers,
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

export function signup({ username, email, password, password_confirmation }) {
  return fetch(`${process.env.REACT_APP_API_URL}/register`, {
    headers,
    method: "POST",
    body: JSON.stringify({ username, email, password, password_confirmation }),
  })
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

export function refreshToken(token) {
  return fetch(`${process.env.REACT_APP_API_URL}/refresh/token`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : Promise.resolve(res)));
}

// TODO: Replace all .then
