export default ({ username, email, password, password_confirmation }) =>
    fetch("http://localhost:3001/register", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password, password_confirmation }),
    })
        .then((res) => res.json())
        .then((res) => (res.error ? Promise.reject(res.error) : res));
