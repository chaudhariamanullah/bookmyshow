import { Router } from "express";
import UserController from "../controller/controller.users.js";

const route = Router();

route.get("/",UserController.getAll);
route.get("/:user_public_id",UserController.getOne);
route.post("/",UserController.add);
route.patch("/:user_public_id",UserController.edit);
route.delete("/:user_public_id",UserController.remove);

route.get("/:user_public_id/status",UserController.userStatus);
route.patch("/:user_public_id/activate",UserController.statusActivate);
route.patch("/:user_public_id",UserController.statusDeactivate);

route.patch("/:user_public_id/reset-password",UserController.resetPassword);
route.patch("/:user_public_id/setRole",UserController.setRole);

route.get("/:user_public_id/email-exists", UserController.emailExists);
route.get("/:user_public_id/phone-exists", UserController.phoneExists);

export default route;
