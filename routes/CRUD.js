let tasks = []; 
let id = 1;

const Route = require("express").Router();

Route.post("/create", (req, res) => {
  try {
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

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


Route.get("/read", (req, res) => {
  try {
    let result = [...tasks];
    const { status, search, sort } = req.query;

    if (status) {
      result = result.filter(t => t.status === status);
    }

    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


Route.put("/update/:id", (req, res) => {
  try {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) tasks[index].title = title;
    if (description !== undefined) tasks[index].description = description;
    if (status !== undefined) tasks[index].status = status;

    res.json(tasks[index]);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


Route.delete("/delete/:id", (req, res) => {
  try {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);
    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = Route;