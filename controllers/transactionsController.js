const Transaction = require("../models/Transaction");

// @desc -- Get all transactions
// @route -- GET /api/v1/transactions
// @access -- Public
exports.getTransactions = async (request, response, next) => {
	try {
		const transactions = await Transaction.find();
		return response.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "Server Error!",
		});
	}
};

// @desc -- Add transactions
// @route -- POST /api/v1/transactions
// @access -- Public
exports.addTransactions = async (request, response, next) => {
	try {
		const { text, amount } = request.body;
		const transaction = await Transaction.create(request.body);
		return response.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (error) {
		// check if the error is caused by MongoDB validation
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map(
				(value) => value.message
			);
			return response.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			// error in the server
			return response.status(500).json({
				success: false,
				error: error.message,
			});
		}
	}
};
// @desc -- Delete transactions
// @route -- DELETE /api/v1/transactions/:id
// @access -- Public
exports.deleteTransactions = async (request, response, next) => {
	try {
		const transaction = await Transaction.findById(request.params.id);
		if (!transaction) {
			return response.status(404).json({
				success: false,
				error: "No Transaction found!",
			});
		}
		await transaction.remove();
		return response.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "Server Error!",
		});
	}
};
