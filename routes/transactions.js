const express = require("express");
const router = express.Router();
// controller imports
const {
	getTransactions,
	addTransactions,
	deleteTransactions,
} = require("../controllers/transactionsController");

router.route("/").get(getTransactions).post(addTransactions);
router.route("/:id").delete(deleteTransactions);

module.exports = router;
