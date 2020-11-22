const { Router } = require("express");

const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

const commentsRouter = require("./comments");

const router = Router();

router.use("/", commentsRouter);

router.get("/", async (req, res) => {
    // get all products here
});

router.get("/:id", async (req, res) => {
    // get only one product by id here
    // id is stored in req.params.id
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    // update product's info in db
    // new data is stored in req.body
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    // delete product from DB
    // is is stored in req.params.id
    // only moderator or admin can delete products
    // no need to check role of user here
});

router.get("/saved", [authMiddleware], async (req, res) => {
    // get all saved products by user
    // use req.user._id as user's id
    // saved products are stored in User model

    // example code
    res.status(200).json(
        (await User.findOne({ _id: req.user._id }, "saved").populate("saved")).saved
    );
});

router.get("/bought", [authMiddleware], async (req, res) => {
    // get all products which user bought
    // hint: use Transcation table
    // user's id is stored in req.user._id
});

router.delete("/save/:id", async (req, res) => {
    // delete product from liked list
    // use id as req.params.id and req.user._id
});

router.get("/save/:id", async (req, res) => {
    // Save product via id to the liked by user
    const user = await User.findOne({ _id: req.user._id });
    const product = await Product.findOne({ _id: req.params.id });

    if (!user || !product) {
        return res.status(404).json({ error: "Product or user was not found." });
    }

    user.saved.push(product);
    await user.save();
    res.status(200).json(product);
});

module.exports = router;
