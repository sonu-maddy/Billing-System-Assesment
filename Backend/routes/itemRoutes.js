import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM items ORDER BY id DESC");
  res.json(data.rows);
});

// CREATE item
router.post("/", async (req, res) => {
  const { name, price } = req.body;

  await pool.query(
    "INSERT INTO items (name, price) VALUES ($1,$2)",
    [name, price]
  );

  res.json({ message: "Item added successfully" });
});

export default router;