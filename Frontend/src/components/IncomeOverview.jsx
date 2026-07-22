import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { prepareLineChartData } from "../util/lineChartData";
import CustomLineChart from "./CustomLineChart";

const IncomeOverview = ({transactions, onAddIncome}) => {

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
                        Income Overview
                    </h5>
                    <p className="text-md text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddIncome}>
                    <Plus size={15} className="text-lg" /> Add Income
                </button>
                
            </div>
            <div className="mt-10">
                {chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
                ) : (
                    <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-violet-200 bg-violet-50/30">

                        <h3 className="text-lg font-semibold text-gray-800">
                            No income data available
                        </h3>

                        <p className="mt-2 max-w-xs text-center text-sm text-gray-500">
                            Add your first income to view your earnings trend.
                        </p>

                    </div>
                )}
            </div>
        </div>
    )
}

export default IncomeOverview;