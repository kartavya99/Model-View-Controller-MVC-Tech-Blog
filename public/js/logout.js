const res = require("express/lib/response");

const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Cotent-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);
