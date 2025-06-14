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
document.addEventListener("DOMContentLoaded", function () {
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
});

