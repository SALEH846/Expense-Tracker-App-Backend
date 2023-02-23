import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/amountFormat";

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);
	return (
		<div>
			<li className={transaction.amount < 0 ? "minus" : "plus"}>
				{transaction.text}{" "}
				<span>
					{transaction.amount < 0 ? "-" : "+"}$
					{numberWithCommas(Math.abs(transaction.amount))}
				</span>
				<button
					className="delete-btn"
					onClick={() => deleteTransaction(transaction._id)}
				>
					x
				</button>
			</li>
		</div>
	);
};

export default Transaction;
