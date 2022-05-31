// functionality to add post which connect with dashboard handlebars

console.log("create Post");

const postFormHandler = async (event) => {
  event.preventDefault();

  //collect values from the create post form

  const title = document.querySelector("#post-title").value.trim();

  const content = document.querySelector("#content").value.trim();

  // send a POST request to the API endpoint
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(response);

  if (response.ok) {
    //IF successful, redirect the browser to the dashboard page
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", postFormHandler);
