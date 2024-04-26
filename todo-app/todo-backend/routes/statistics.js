const express = require("express");
const redisTodos = require("../redis");

const router = express.Router();

/* GET statistics */
router.get("/", async (_, res) => {
  const totalTodos = await redisTodos.getAsync("added_todos");
  numberToReturn = totalTodos ? Number(totalTodos) : 0;
  res.json({ added_todos: numberToReturn });
});

module.exports = router;
