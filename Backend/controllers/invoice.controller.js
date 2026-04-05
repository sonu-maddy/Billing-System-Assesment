import { pool } from "../config/db.js";

function generateInvoiceId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return "INVC" + num;
}

export const createInvoice = async (req, res) => {
  try {
    const { customer_id, items, total, gst, final_total } = req.body;

    const invoiceId = generateInvoiceId();

    const customerRes = await pool.query(
      "SELECT name FROM customers WHERE id=$1",
      [customer_id],
    );

    const customerName = customerRes.rows[0]?.name;

    const invoice = await pool.query(
      `INSERT INTO invoices (invoice_id, customer_id, customer_name, total, gst, final_total)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [invoiceId, customer_id, customerName, total, gst, final_total],
    );

    const invoiceDbId = invoice.rows[0].id;

    for (let item of items) {
      const itemData = await pool.query(
        "SELECT name, price FROM items WHERE id=$1",
        [item.item_id],
      );

      await pool.query(
        `INSERT INTO invoice_items (invoice_id, item_id, name, qty, price)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          invoiceDbId,
          item.item_id,
          itemData.rows[0].name,
          item.qty,
          itemData.rows[0].price,
        ],
      );
    }

    res.json({ message: "Invoice Created", invoiceId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllInvoices = async (req, res) => {
  const data = await pool.query(`
    SELECT 
      inv.*,
      COALESCE(
        json_agg(
          json_build_object('name', ii.name)
        ) FILTER (WHERE ii.id IS NOT NULL),
        '[]'
      ) AS items
    FROM invoices inv
    LEFT JOIN invoice_items ii ON ii.invoice_id = inv.id
    GROUP BY inv.id
    ORDER BY inv.id DESC
  `);

  res.json(data.rows);
};

export const getInvoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await pool.query(`
      SELECT 
        inv.*,
        c.address,
        c.pan,
        c.gstin
      FROM invoices inv
      LEFT JOIN customers c ON inv.customer_id = c.id
      WHERE inv.id = $1
    `, [id]);

    
    if (!invoice.rows || invoice.rows.length === 0) {
      return res.status(200).json(null); 
    }

    const items = await pool.query(
      "SELECT * FROM invoice_items WHERE invoice_id=$1",
      [id]
    );

    res.json({
      ...invoice.rows[0],
      items: items.rows || []
    });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};