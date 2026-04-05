import express from "express";
import { getAllCustomers , createCustomer
} from "../controllers/customer.controller.js";

const router = express.Router();


router.get("/", getAllCustomers);


router.post("/", createCustomer);

export default router;