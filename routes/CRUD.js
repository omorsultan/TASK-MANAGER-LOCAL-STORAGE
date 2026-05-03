let tasks = []; 
let id = 1;


const Route = require("express").Router();

Route.post("/create", (req, res) => {

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

Route.get("/read", (req, res) => {
  let result = [...tasks];
  const { status, search, sort } = req.query;

  if (status) {
    result = result.filter(t => t.status === status);
  }

  if (search) {
    result = result.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "asc") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "desc") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  res.json(result);
});



Route.put("/update/:id", (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (!tasks[index]) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (title) tasks[index].title = title;
    if (description) tasks[index].description = description;
    if (status) tasks[index].status = status;

    res.json(tasks[index]);

});



Route.delete("/delete/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));

  if (!tasks[index]) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });

});

module.exports = Route;