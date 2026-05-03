let tasks = []; // in-memory storage
let id = 1;


const createRoute = require("express").Router();

createRoute.post("/", (req, res) => {

  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: id++,
    title,
    description: description || "",
    status: status || "To Do",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = createRoute;
