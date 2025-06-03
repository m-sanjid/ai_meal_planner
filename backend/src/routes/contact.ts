import { Router } from "express";
import { sendContactEmail } from "../controllers/contactController";
import { subscribeToNewsletter } from "../controllers/newsletterController";

const router = Router();

router.post("/", sendContactEmail);
router.post("/newsletter", subscribeToNewsletter);

export default router;
