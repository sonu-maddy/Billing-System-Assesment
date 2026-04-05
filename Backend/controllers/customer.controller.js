
import { pool } from "../config/db.js";

export const getAllCustomers = async (req, res) => {
  const data = await pool.query("SELECT * FROM customers ORDER BY id DESC");
  res.json(data.rows);
};

export const createCustomer = async (req, res) => {
  const { name, address, pan, gst, is_gst_registered } = req.body;

  await pool.query(
    `INSERT INTO customers 
    (name, address, pan, gst, is_gst_registered) 
    VALUES ($1,$2,$3,$4,$5)`,
    [name, address, pan, gst, is_gst_registered],
  );

  res.json({ message: "Customer added successfully" });
};
