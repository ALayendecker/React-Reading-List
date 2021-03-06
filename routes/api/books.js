const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router.route("/saved").get(booksController.findAll);
// .delete(booksController.remove)
// .put(booksController.update);

module.exports = router;
