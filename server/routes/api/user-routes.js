const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  addFood,
  removeFood,
  login,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of the user
router.route("/").post(createUser).put(authMiddleware, addFood);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/foods/:foodId").delete(authMiddleware, removeFood);

module.exports = router;
