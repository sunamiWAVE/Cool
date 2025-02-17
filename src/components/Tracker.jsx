import { React, useState } from "react";
import { Trash, Edit } from "lucide-react";
import ExpenseSummary from "./PieChart";

const Tracker = () => {
    const [budget, setBudget] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [amount, setAmount] = useState("");
    const [label, setLabel] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleTransaction = (type) => {
        const value = parseFloat(amount);
        if (!label || isNaN(value)) return alert("Can't leave any field empty.");
        let newTransactions = [...transactions];
        const transactionValue = type == "deposit" ? value : -value;        

        transactionValue > 0 ? setTotalDeposit(totalDeposit + transactionValue) : setTotalSpent(totalSpent + transactionValue);

        if (editingIndex !== null) {
            newTransactions[editingIndex] = { label, value: transactionValue };
            setEditingIndex(null);
        } else {
            newTransactions.push({ label, value: transactionValue });
        }

        setTransactions(newTransactions);
        setBudget(budget + transactionValue);
        setAmount("");
        setLabel("");
    };

    const handleEditTransaction = (index) => {
        setLabel(transactions[index].label);
        setAmount(Math.abs(transactions[index].value));
        setEditingIndex(index);
    };

    const handleDeleteTransaction = (index) => {
        const value = transactions[index].value;
        setTransactions(transactions.filter((_, i) => i !== index));
        setBudget(budget - value);

        console.log(value);
        value > 0 ? setTotalDeposit(totalDeposit + value) : setTotalSpent(totalSpent + value);
        
    };

    return (
        <>
            <div className="min-h-screen max-[700px]:flex-col bg-gray-900 text-white flex justify-center items-center p-4">

                <div className="w-full max-w-lg bg-gray-800 rounded-2xl p-6">
                    <div>
                        <h1 className="text-4xl font-bold text-center text-blue-400">Expense Tracker</h1>
                        <p className="text-center text-lg mt-4">Budget: <span className="font-semibold">${budget.toFixed(2)}</span></p>

                        <div className="mt-4">

                            <input type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600" />

                            <input type="number" min="1" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600" />

                            <div className="flex gap-2">

                                <button className="w-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded" onClick={() => handleTransaction("deposit")}>Deposit</button>

                                <button className="w-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded" onClick={() => handleTransaction("spend")}>Spend</button>

                            </div>
                        </div>

                        <table className="mt-4 w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="p-2">Label</th>
                                    <th className="p-2">Amount</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="p-2">{transaction.label}</td>
                                        <td className={`p-2 ${transaction.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>${transaction.value.toFixed(2)}</td>
                                        <td className="p-2 flex gap-2">
                                            <button className="text-yellow-400" onClick={() => handleEditTransaction(index)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="text-red-400" onClick={() => handleDeleteTransaction(index)}>
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ExpenseSummary totalDeposit={totalDeposit} totalSpent={totalSpent} budget={budget}/>
            </div>

            


        </>
    );
}

export default Tracker
