document.addEventListener("DOMContentLoaded", function () {
  // 🟡 Fondo dinámico al mover el mouse
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const r = Math.round((x / width) * 255);
    const g = Math.round((y / height) * 255);
    const b = 200;

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });

  // 🔵 Funcionalidad de comentarios por post
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const addBtn = post.querySelector(".add-comment");
    const input = post.querySelector(".comment-input");
    const commentsDiv = post.querySelector(".comments");

    addBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (text !== "") {
        const comment = document.createElement("div");
        comment.classList.add("comment");

        const p = document.createElement("p");
        p.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", () => {
          comment.remove();
        });

        comment.appendChild(p);
        comment.appendChild(deleteBtn);
        commentsDiv.appendChild(comment);

        input.value = "";
      }
    });
  });
});
