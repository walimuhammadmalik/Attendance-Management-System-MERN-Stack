// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


// mongoose.connect("mongodb://localhost:27017/mernblog", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const blogSchema = new mongoose.Schema({
//   title: String,
//   content: String,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// app.post("/blogs", async (req, res) => {
//   const newBlog = new Blog(req.body);
//   console.log(req.body);
//   await newBlog.save();
//   res.json(newBlog);
// });

// app.get("/blogs", async (req, res) => {
//   const blogs = await Blog.find();
//   res.json(blogs);
// });

// app.put("/blogs/:id", async (req, res) => {
//   const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(blog);
// });

// app.delete("/blogs/:id", async (req, res) => {
//   await Blog.findByIdAndDelete(req.params.id);
//   res.send("Blog deleted");
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
//nnew code


const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
