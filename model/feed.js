// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const feedSchema = new mongoose.Schema(
//   {
//     uuid: {
//       type: String,
//       default: uuidv4,
//       unique: true, // Unique identifier for each feed
//     },
//     content: {
//       type: String,
//       required: true, // Feed content (required)
//     },
//     author: {
//       type: String,
//       required: true, // Author name (required)
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now, // Automatically set to current time
//     },
//     likes: [{ type: String }], // Array of usernames who liked the feed
//   },
//   (this.collection = "feed")
// ); // Explicitly specify the collection name

// module.exports = mongoose.model("Feed", feedSchema);

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const feedSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [{ type: String }],
    
    // ✅ NUEVO: Campo de comentarios
    comments: [
      {
        user: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { collection: "feed" } // 👈 usa un objeto, no una asignación
);

module.exports = mongoose.model("Feed", feedSchema);
