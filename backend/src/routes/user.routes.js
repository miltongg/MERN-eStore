import {Router} from "express";
import signin from "../controllers/signin.controller.js";
import signup from "../controllers/signup.controller.js";
import editUser from "../controllers/editUser.controller.js";
import {isAuth} from "../utils.js";

const router = Router();

router.post('/user/signin', signin);

router.post('/user/signup', signup);

router.put('/user/profile', isAuth, editUser);

export default router;