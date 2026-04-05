import express from "express";
import { getAllItems, createItem } from "../controllers/item.controller.js";


const router = express.Router();


router.get("/", getAllItems);


router.post("/", createItem );

export default router;
