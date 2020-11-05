export default (email, password) =>
    fetch("http://localhost:3001/login", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((res) => (res.error ? Promise.reject(res.error) : res));
