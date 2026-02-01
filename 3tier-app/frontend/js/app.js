const API = "/api/v1/users";

async function loadUsers() {
  const res = await fetch(API);
  const users = await res.json();

  document.getElementById("users").innerHTML =
    users.map(u => `<li>${u.name} - ${u.email}</li>`).join("");
}

async function addUser() {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
    })
  });
  loadUsers();
}

loadUsers();
