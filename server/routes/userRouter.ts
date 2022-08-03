import express from "express";

import * as authController from "../controllers/authController";

const router = express.Router();

router.get('/test', (req, res)=>{
    res.send({test:'hi'});
})

router.post("/login", authController.login);
router.post("/create", authController.signUp);

export default router;
