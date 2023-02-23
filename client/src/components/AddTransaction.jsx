import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
	const [text, setText] = useState("");
	const [amount, setAmount] = useState(0);
	const { addTransaction } = useContext(GlobalContext);

	const submitHandler = (e) => {
		e.preventDefault();
		const newTransaction = {
			id: Math.floor(Math.random() * 10000000),
			text,
			amount: +amount, // type casting amount-str --> amount-number
		};
		addTransaction(newTransaction);
		setText("");
		setAmount(0);
	};
	return (
		<>
			<h3>Add new Transaction</h3>
			<form onSubmit={submitHandler}>
				<div className="form-control">
					<label htmlFor="text">Name of Transaction</label>
					<input
						type="text"
						name="text"
						id="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter name of Transaction..."
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br /> (negative - expense, positive - income)
					</label>
					<input
						type="number"
						name="amount"
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>
				<button className="btn" type="submit">
					Add Transaction
				</button>
			</form>
		</>
	);
};

export default AddTransaction;
