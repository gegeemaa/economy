import { API_URL } from "./functions";

export async function fetchLogin(body: any) {
  const { username, password } = body;

  const response = await fetch(API_URL + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = response.json();
  return data;
}
