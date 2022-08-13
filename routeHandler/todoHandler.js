const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//***(In this case I have to use anyone either (async + await with try + catch)
// or (callback like err) ANY ONE ** both are given*/

// GET all ther todos  **(if i need to find by select use exec)
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    // .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All todos are here successfully!",
        });
      }
    });
  /* Todo.find({ status: "active" }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "All todos are here successfully!",
      });
    }
  }); */
});

// GET a todo by Id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Todo was find successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// POST a todo
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// POST multiple todo
router.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

// PUT todo **(I also can show result in action video=26 (45min))
router.put("/:id", (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!",
        });
      }
    }
  );
});

// DELETE todo
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully!",
      });
    }
  });
});

module.exports = router;
