export async function loginQuery(data) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    const err = new Error(json.error || "Something went wrong");
    err.status = response.status;
    throw err;
  }
  return json;
}

export async function registerQuery(data) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    const err = new Error(json.error || "Something went wrong");
    err.status = response.status;
    throw err;
  }
  return json;
}
