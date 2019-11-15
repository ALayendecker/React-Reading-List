const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// I think this goes here
router.get("/books", (req, res) => {
  axios
    // .get("google api address here", {params: req.query})
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
