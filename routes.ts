import { Router } from "express";
import { ExtractImageController } from "./controllers/ExctractImageController";
const router: Router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    connected: "ok"
  });
});

router.post("/v1/extractImages", async (req, res) => {
  new ExtractImageController().extractImage(req, res);
});
export default router;