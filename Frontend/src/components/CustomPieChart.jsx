import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend} from "recharts";

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor = false}) => {

    return (
        <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={2}
                        stroke="none"
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}

                    </Pie>

                    <Tooltip
                        formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                    />

                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="43%"
                                textAnchor="middle"
                                fill="#7c7c7c"
                                fontSize="14"
                            >
                                {label}
                            </text>

                            <text
                                x="50%"
                                y="52%"
                                textAnchor="middle"
                                fill="#222"
                                fontSize="28"
                                fontWeight="700"
                            >
                                ₹{totalAmount}
                            </text>
                        </>
                    )}

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
};

export default CustomPieChart;