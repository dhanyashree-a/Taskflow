import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import "./TaskChart.css";

function TaskChart({ tasks }) {

    if (tasks.length === 0) {

        return (

            <div className="chart-empty">

                <div className="chart-empty-icon">
                    📊
                </div>

                <h3>No Analytics Yet</h3>

                <p>
                    Create your first task to view productivity insights.
                </p>

            </div>

        );

    }

    const data = [

        {
            name: "Completed",
            value: tasks.filter(
                t => t.status === "Completed"
            ).length
        },

        {
            name: "Pending",
            value: tasks.filter(
                t => t.status === "Pending"
            ).length
        },

        {
            name: "In Progress",
            value: tasks.filter(
                t => t.status === "In Progress"
            ).length
        }

    ];

    const COLORS = [
        "#22C55E",
        "#FACC15",
        "#3B82F6"
    ];

    return (

        <div className="chart-container">

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={110}
                        innerRadius={55}
                        paddingAngle={5}
                        isAnimationActive={true}
                        animationDuration={1200}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            background: "#1E1B2E",
                            border: "1px solid #8B5CF6",
                            color: "white"
                        }}
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TaskChart;