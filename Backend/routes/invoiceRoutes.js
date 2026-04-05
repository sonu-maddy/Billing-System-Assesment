import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// Generate Invoice ID
function generateInvoiceId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return "INVC" + num;
}

// CREATE INVOICE
router.post("/", async (req, res) => {
  const { customer, items } = req.body;

  const invoiceId = generateInvoiceId();

  let total = 0;

  items.forEach(i => {
    total += i.price * i.qty;
  });

  const gst = customer.is_gst_registered ? 0 : total * 0.18;
  const finalTotal = total + gst;

  const invoice = await pool.query(
    "INSERT INTO invoices (invoice_id, customer_name, total) VALUES ($1,$2,$3) RETURNING *",
    [invoiceId, customer.name, finalTotal]
  );

  const invoiceDbId = invoice.rows[0].id;

  for (let item of items) {
    await pool.query(
      "INSERT INTO invoice_items (invoice_id, name, qty, price) VALUES ($1,$2,$3,$4)",
      [invoiceDbId, item.name, item.qty, item.price]
    );
  }

  res.json({ message: "Invoice Created", invoiceId });
});

// GET ALL
router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM invoices");
  res.json(data.rows);
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const invoice = await pool.query(
    "SELECT * FROM invoices WHERE id=$1",
    [id]
  );

  const items = await pool.query(
    "SELECT * FROM invoice_items WHERE invoice_id=$1",
    [id]
  );

  res.json({
    ...invoice.rows[0],
    items: items.rows
  });
});

export default router;