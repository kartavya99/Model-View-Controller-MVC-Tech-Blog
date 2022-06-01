console.log("comment");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const newComment = document.querySelector("#new-comment").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ newComment, post_id }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(newComment);

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#comment")
  .addEventListener("submit", commentFormHandler);
