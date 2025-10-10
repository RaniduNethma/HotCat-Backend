import { Router } from "express";
import * as staffAuthController from '../controllers/staff.controllers/staff.auth.controller.js';

const staffAuthRouter = Router();

staffAuthRouter.post('/signup', staffAuthController.staffSignup);
staffAuthRouter.post('/login', staffAuthController.staffLogin);

export default staffAuthRouter;