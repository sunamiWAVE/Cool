import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseSummary({ totalSpent, totalDeposit }) {
  const hasData = totalSpent > 0 || totalDeposit > 0;
  const data = {
    datasets: hasData
      ? [
          {
            data: [totalSpent, totalDeposit],
            backgroundColor: ['#f87171', '#60a5fa'],
            hoverBackgroundColor: ['#ef4444', '#22c55e'],
            borderColor: ['#1f2937', '#1f2937'],
            borderWidth: 4,
          },
        ]
      : [],
  };
  const message = -totalSpent > totalDeposit ? "Spending too much? 😭 Time to be frugal! 💸" : "Saved too much?😎 Go for a shopping!";
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">
      <div className="bg-gray-800 bg-opacity-75 p-7 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-400">Expense Summary</h1>
        
        <div className="mt-6 w-70 h-60 mx-auto">
          {hasData ? (
            <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          ) : (
            <p className="text-gray-400 pt-25">No data available</p>
          )}
        </div>
        {hasData && <p className="mt-6 text-lg font-semibold text-yellow-400">{message}</p>}
      </div>
    </div>
  );
}