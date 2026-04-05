-- CREATE TABLE customers (
--   id SERIAL PRIMARY KEY,
--   name TEXT,
--   address TEXT,
--   pan TEXT,
--   gst TEXT,
--   is_gst_registered BOOLEAN
-- );

-- SELECT * FROM customers;

SELECT * FROM customers LIMIT 1;

ALTER TABLE customers RENAME COLUMN gst TO gstin;

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT,
  price NUMERIC,
  status TEXT 
);

SELECT * FROM items;

TRUNCATE items;


ALTER TABLE items 
ALTER COLUMN status SET DEFAULT 'Active';


DROP TABLE items;




CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invoice_id VARCHAR(20),
  customer_id INT,
  customer_name TEXT,
  total NUMERIC,
  gst NUMERIC,
  final_total NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM invoices;

TRUNCATE invoices;




CREATE TABLE invoice_items (
  id SERIAL PRIMARY KEY,
  invoice_id INT,
  item_id INT,
  name TEXT,
  qty INT,
  price NUMERIC
);

SELECT * FROM invoice_items;

TRUNCATE invoice_items;