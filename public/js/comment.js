console.log("comment");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#new-comment").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ comment_text, post_id }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(comment_text);

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#comment")
  .addEventListener("submit", commentFormHandler);
