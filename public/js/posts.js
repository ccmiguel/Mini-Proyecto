// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".like-button").forEach((btn) => {
//     btn.addEventListener("click", async function () {
//       const postId = this.dataset.id;

//       const res = await fetch(`/posts/${postId}/like`, {
//         method: "POST",
//       });

//       if (res.ok) {
//         const data = await res.json();
//         const isLiked = this.dataset.liked === "true";
//         this.textContent = isLiked ? "🤍" : "❤️";
//         this.dataset.liked = (!isLiked).toString();

//         const likesSpan = this.nextElementSibling;
//         likesSpan.textContent = `${data.likesCount} likes`;
//       }
//     });
//   });
// });


// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".like-button").forEach((btn) => {
//     btn.addEventListener("click", async function () {
//       const postId = this.dataset.id;
//       console.log("Click detected on postId:", postId);

//       const res = await fetch(`/posts/${postId}/like`, {
//         method: "POST",
//       });

//       if (res.ok) {
//         const data = await res.json();
//         const isLiked = this.dataset.liked === "true";
//         this.textContent = isLiked ? "🤍" : "❤️";
//         this.dataset.liked = (!isLiked).toString();

//         const likesSpan = this.nextElementSibling;
//         likesSpan.textContent = `${data.likesCount} likes`;
//       } else {
//         console.error("Error in like request:", res.status);
//       }
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  // Like button logic...
  document.querySelectorAll(".like-button").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const postId = this.dataset.id;
      console.log("Click detected on postId:", postId);

      const res = await fetch(`/posts/${postId}/like`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const isLiked = this.dataset.liked === "true";
        this.textContent = isLiked ? "🤍" : "❤️";
        this.dataset.liked = (!isLiked).toString();

        const likesSpan = this.nextElementSibling;
        likesSpan.textContent = `${data.likesCount} likes`;
      } else {
        console.error("Error in like request:", res.status);
      }
    });
  });

  // ✅ Add comment logic
  document.querySelectorAll(".add-comment").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const postDiv = btn.closest(".post");
      const commentInput = postDiv.querySelector(".comment-input");
      const commentText = commentInput.value.trim();
      const uuid = postDiv.dataset.uuid;

      if (!commentText || !uuid) return;

      try {
        const res = await fetch(`/posts/${uuid}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `comment=${encodeURIComponent(commentText)}`,
        });

        if (res.ok) {
          const commentsDiv = postDiv.querySelector(".comments");
          const newComment = document.createElement("p");
          newComment.innerHTML = `<strong>You:</strong> ${commentText}`;
          commentsDiv.appendChild(newComment);
          commentInput.value = "";
        } else {
          console.error("Failed to post comment:", res.status);
          alert("Error al publicar el comentario");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error en la solicitud");
      }
    });
  });
});

