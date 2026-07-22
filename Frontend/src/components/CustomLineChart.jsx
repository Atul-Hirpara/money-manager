import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { addThousandsSeparator } from "../util/util";

const CustomTooltip = ({ active, payload }) => {

    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (

        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4">

            <p className="font-semibold mb-2"> {data.date} </p>

            <p className="text-purple-700">
                Total: ₹{addThousandsSeparator(data.total)}
            </p>

            <hr className="my-2 border-gray-200 opacity-200" />

            <p className="text-sm font-semibold text-gray-700 mb-1">Details:</p>

            <div className="space-y-1">

                {data.details.map((item, index) => (

                    <div
                        key={index}
                        className="flex justify-between gap-8 text-sm"
                    >
                        <span>{item.source}</span>

                        <span> ₹{addThousandsSeparator(item.amount)} </span>

                    </div>

                ))}

            </div>

        </div>

    );
};

const CustomLineChart = ({ data }) => {

    return (

        <div className="w-full h-[350px]">

            <ResponsiveContainer>

                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 0
                    }}
                >

                    <defs>

                        <linearGradient
                            id="incomeGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="0%"
                                stopColor="#7C3AED"
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="100%"
                                stopColor="#7C3AED"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        width={70}
                        tickFormatter={(value) => addThousandsSeparator(value)}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                    />

                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        fill="url(#incomeGradient)"
                    />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        dot={{
                            r: 4
                        }}
                        activeDot={{
                            r: 7
                        }}
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );
};

export default CustomLineChart;