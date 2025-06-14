const chalk = require("chalk");

const express = require("express");
const app = express();

const path = require("path");
const morgan = require("morgan");

const mongoose = require("mongoose");
const Feed = require("./model/feed");

app.use(express.urlencoded({ extended: true }));
const session = require("express-session");
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
    }, // 5 minutes
  })
);

app.use(morgan("common"));

app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));



// Connect to MongoDB (only once when the server starts)
mongoose
  .connect("mongodb://localhost:27017/my_first_db")
  .then(() =>
    console.log(chalk.bgHex("#b2ebf2").black.bold(" 🌤️ MongoDB Connected 🌤️ "))
  )
  .catch(console.error);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));

  res.render("index", { username: req.session.username });
});

app.get("/write", (req, res) => {
  if (req.session.username) {
    res.render("write", { username: req.session.username });
  } else {
    res.redirect("/");
  }
});





app.post("/write", async (req, res) => {
  const { content } = req.body;

  if (!req.session.username) {
    return res.redirect("/");
  }

  const newFeed = new Feed({
    content: content,
    author: req.session.username,
  });

  //Save the new feed to the database
  //and redirect to the posts page
  await newFeed
    .save()
    .then(() => {
      console.log(chalk.green("✅ New feed saved successfully"));
      res.redirect("/posts");
    })
    .catch((err) => {   
      console.error(chalk.red("❌ Error saving feed:", err));
      res.status(500).send("Error saving feed");
    }
  );

});






// app.get("/posts", async (req, res) => {
//   if (req.session.username) {
//     try {
//       const feeds = await Feed.find().sort({ createdAt: -1 });
//       res.render("posts", {
//         username: req.session.username,
//         feeds: feeds,
//       });
//     } catch (err) {
//       console.error(chalk.red("❌ Error fetching feeds:", err));
//       res.status(500).send("Error fetching posts");
//     }
//   } else {
//     res.redirect("/");
//   }
// });

app.get("/posts", async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/");
  }

  try {
    const username = req.session.username;
    // find user by username
    const user = await User.findOne({ username: req.session.username });

    // find all feeds where author is in user's friends or the user themselves
    const feeds = await Feed.find({
      // include friends and self
      author: { $in: [...user.friends, user.username] },
    }).sort({
      // createdAt: -1, sort by createdAt in descending order.
    });

    // Agregar campo isLiked a cada publicación
    const posts = feeds.map((feed) => ({
      ...feed.toObject(),
      isLiked: feed.likes.includes(username),
      // isLiked: feed.likes.includes(req.session.username), // 현재 사용자가 좋아요를 눌렀는지 여부
    }));

    // Renderizar la vista con posts y username
    res.render("posts", { posts, username });
  } catch (error) {
    console.error("Error loading posts", err);
    res.status(500).send("Error loading posts");
  }
});

app.post("/posts/:uuid/like", async (req, res) => {
  if (!req.session.username) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // const feed = await Feed.findOne(req.params.uuid);
    const feed = await Feed.findOne({ uuid: req.params.uuid }); // Find feed by uuid

    if (!feed) {
      return res.status(404).send("Feed not found");
    }

    const username = req.session.username;

    // Toggle like
    if (feed.likes.includes(username)) {
      // Remove like if already liked
      feed.likes = feed.likes.filter((user) => user !== username);
    } else {
      // Add like if not already liked
      feed.likes.push(username);
    }

    await feed.save();
    res.json({ likesCount: feed.likes.length }); // Return updated likes count
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).send("Error toggling like");
  }
});


// app.get("/posts", async (req, res) => {
//   if (!req.session.username) {
//     return res.redirect("/");
//   }

//   try {
//     const posts = await Feed.find({ author: req.session.username }).sort({
//       createdAt: -1,
//     }); // sort by createdAt in descending order.
//     res.render("posts", { posts });
//   } catch (error) {
//     console.error("Error loading posts", err);
//     res.status(500).send("Error loading posts");
//   }
// });

const bcrypt = require("bcryptjs");
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send("Invalid username or password!");
    }
    req.session.username = user.username;
    res.redirect("/posts");
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error during login");
  }
});

// Register route
app.get("/register", (req, res) => {
  res.render("register");
});


const User = require("./model/user");

// Handle registration
app.post("/register", async(req, res) => {
  const { username, password, name } = req.body;

  try{
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(chalk.yellow("⚠️ User already exists"));
      return res.status(400).send("User already exists");
    }  

    const newUser = new User({
      username,
      password,
      name
      });

    await newUser.save();
    res.redirect("/");

    } catch (error) {
      console.error(chalk.red("❌ Error registering user:", error));
      res.status(500).send("Error registering user");
  }

});




app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(
    chalk.bgHex("#ff69b4").white.bold(" 🎉 EXPRESS SERVER STARTED 🎉 ")
  );
  console.log(
    chalk.green("Running at: ") + chalk.cyan("http://localhost:3000")
  );
  console.log(chalk.gray("Press Ctrl+C to stop the server."));
});


//Friends
app.get("/friends/list", async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/");
  }
  try {
    const user = await User.findOne({ username :
    req.session.username });

    res.render("friends", {
      username: req.session.username,   
      friends: user.friends,
      findedfriends: []
    });
  } catch (err) {
    console.error("Error fetching friends list:", err);
    res.status(500).send("Error fetching friends list");
  }
});


app.post("/friends/search", async (req, res) => {
  const { friendUsername } = req.body;

  if (!req.session.username) {
    return res.redirect("/");
  }

  try {
    // Buscar el usuario logueado
    const user = await User.findOne({ username: req.session.username });

    // Buscar usuarios cuyo username contenga el término buscado,
    // excluyendo al propio usuario y sus amigos ya agregados
    const findedfriends = await User.find({
      $and: [
        { username: { $regex: friendUsername, $options: "i" } },
        { username: { $nin: [...user.friends, user.username] } },
      ],
    });

    res.render("friends", {
      username: req.session.username,
      friends: user.friends,
      findedfriends,
    });

  } catch (err) {
    console.error("Error searching for friends:", err);
    res.status(500).send("Error searching for friends");
  }
});





app.post("/friends/add", async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/");
  }

  const { friendUsername } = req.body;

  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.friends.includes(friendUsername)) {
      return res.status(400).send("Friend already added");
    }

    user.friends.push(friendUsername);
    await user.save();

    res.redirect("/friends/list");
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).send("Error adding friend");
  }
});

app.post("/friends/find", async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/");
  }

  const { findedUsername } = req.body;

  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const findedUser = await User.findOne({ username: findedUsername });
    if (!findedUser) {
      return res.status(404).send("Friend not found");
    }

    res.render("friends", {
      friends: user.friends,
      findedfriends: [findedUser],
    });
  } catch (err) {
    console.error("Error finding friend:", err);
    res.status(500).send("Error finding friend");
  }
});

// Sample code to create a new feed
// const sampleFeed = new Feed({
//   content: "This is my first SNS feed!",
//   author: "TEST_USER",
// });
// sampleFeed
//   .save()
//   .then(() => console.log("✅ Test fed saved"))
//   .then(() => {
//     Feed.find().then((feeds) => {
//       console.log(feeds);
//     });
//   })
//   .catch((err) => console.error("❌ Error:", err));