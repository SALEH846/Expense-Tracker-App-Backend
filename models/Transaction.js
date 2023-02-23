const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			trim: true,
			required: [true, "Please add some description about the transaction"],
		},
		amount: {
			type: Number,
			required: [
				true,
				"Please provide positive or negative amount for the transaction",
			],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
