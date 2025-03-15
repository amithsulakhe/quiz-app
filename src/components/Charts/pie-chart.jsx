import {
  Bar,
  CartesianGrid,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeUp, SlideRight } from "../Animations/animation";
import quizHelper from "@/utils/helper-functions";

// Custom tooltip to display percentage
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className=" p-2 border bg-background  rounded shadow-sm">
        <p className="text-[0.70rem] uppercase text-muted-foreground">{`${data.name}: ${data.value}`}</p>
        <p>{`${data.percentage}%`}</p>
      </div>
    );
  }
  return null;
};
const CustomPieChart = ({questions,answers}) => {
  const {pieData}=quizHelper.generateChartData(questions,answers)
  const COLORS = ["#22577A", "#FF7F50"]; 
  return (
    <SlideRight delay={2} duration={1} x={200}>
      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
          <CardDescription>Performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer
            width={"100%"}
            height={400}
            className="border-2 border-dotted rounded-md py-4"
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                // label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </SlideRight>
  );
};

export default CustomPieChart;
