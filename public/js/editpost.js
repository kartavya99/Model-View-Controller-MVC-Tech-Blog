console.log("edit-post");

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();

  const content = document.querySelector("#post-content").value.trim();

  const updateButton = document.querySelector("#update-btn");

  // const id = window.location.toString().split("/")[
  //   window.location.toString().split("/").length - 1
  // ];
  // console.log(window.location.toString());
  // console.log(window.location.toString().split("/"));
  const id = updateButton.dataset.id;
  console.log(updateButton.dataset.id);

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#update-btn")
  .addEventListener("click", editFormHandler);
