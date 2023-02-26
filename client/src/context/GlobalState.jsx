import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// actions
	// delete a transaction
	async function deleteTransaction(id) {
		try {
			await axios.delete(
				`https://expense-tracker-react-app-five.vercel.app/api/v1/transactions/${id}`
			);
			dispatch({ type: "DELETE_TRANSACTION", payload: id });
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.response.data.error,
			});
		}
	}
	// add a new transaction
	async function addTransaction(transaction) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await axios.post(
				"https://expense-tracker-react-app-five.vercel.app/api/v1/transactions",
				transaction,
				config
			);
			dispatch({ type: "ADD_TRANSACTION", payload: response.data.data });
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.response.data.error,
			});
		}
	}
	// fetch all transactions
	async function getTransactions() {
		try {
			const response = await axios.get(
				"https://expense-tracker-react-app-five.vercel.app/api/v1/transactions"
			);
			dispatch({ type: "GET_TRANSACTIONS", payload: response.data.data });
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.response.data.error,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
