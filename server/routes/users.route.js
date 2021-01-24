const { Router } = require("express");

const UserService = require("../services/user.service");
const authMiddleware = require("../middlewares/auth.middleware");
const currentUserMiddleware = require("../middlewares/currentUser.middleware");

const router = Router();

router.get("/is_saved/:id", [authMiddleware], async (req, res) => {
  try {
    // TODO: Return either or key-value obj or just value
    res.status(200).json(await UserService.isSavedProduct(req.user._id, req.params.id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/save/:id", [authMiddleware], async (req, res) => {
  try {
    // FIXME: Should return product not user
    res.status(200).json({ product: await UserService.saveProduct(req.user._id, req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/saved", [authMiddleware], async (req, res) => {
  try {
    res.status(200).json(await UserService.getSavedProducts(req.user._id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/bought", [authMiddleware], async (req, res) => {
  try {
    res.status(200).json(await UserService.getBoughtProducts(req.user._id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.put("/:id", [authMiddleware, currentUserMiddleware], async (req, res) => {
  try {
    res.status(200).json(await UserService.updateOneById(req.params.id, req.body));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.delete("/:id", [authMiddleware, currentUserMiddleware], async (req, res) => {
  try {
    res.status(200).json(await UserService.deleteOneById(req.params.id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await UserService.getOneById(req.params.id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/", [authMiddleware], async (req, res) => {
  try {
    res.status(200).json(await UserService.getAll(req.query));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
