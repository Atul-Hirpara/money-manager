import { Plus } from "lucide-react";
import { prepareLineChartData } from "../util/lineChartData";
import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({transactions, onAddExpense}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="text-md text-gray-400 mt-0.5">
                        Track your spending trends over time and gain insights into where your money goes.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddExpense}>
                    <Plus size={15} className="text-lg" /> Add Expense
                </button>
                
            </div>
            <div className="mt-10">
                {chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
                ) : (
                    <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-violet-200 bg-violet-50/30">

                        <h3 className="text-lg font-semibold text-gray-800">
                            No expense data available
                        </h3>

                        <p className="mt-2 max-w-xs text-center text-sm text-gray-500">
                            Add your first expense to start tracking your spending habits.
                        </p>

                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpenseOverview;