
import express from "express";
import {createInvoice, getAllInvoices, getInvoiceById} from "../controllers/invoice.controller.js";


const router = express.Router();


router.post("/",createInvoice );

router.get("/", getAllInvoices);

router.get("/:id", getInvoiceById);

export default router;