import { pool } from "../config/db.js";

export const getAllItems = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM items ORDER BY id DESC");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};


export const createItem = async (req, res) => {
  try {
    const { name, price, status } = req.body;

  
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price required" });
    }

    await pool.query(
      "INSERT INTO items (name, price, status) VALUES ($1,$2,$3)",
      [name, Number(price), status || "Active"],
    );

    res.json({ message: "Item added successfully" });
  } catch (err) {
    console.error("ERROR:", err.message); 
    res.status(500).json({ error: err.message });
  }
};

