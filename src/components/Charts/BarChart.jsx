import React from "react";
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
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeUp, SlideLeft } from "../Animations/animation";
import quizHelper from "@/utils/helperfunctions";

const CustomBarChart = ({questions,answers}) => {
  const {barData}=quizHelper.generateChartData(questions,answers)
  console.log(barData);
  
  return (
    <SlideLeft x={-200} duration={2} delay={1}>
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>Correct/Incorrect</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={400}
          className="border-2 border-dotted rounded-md py-4 "
        >
          <BarChart data={barData} barSize={50}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].payload?.name}
                          </span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value) =>
                value === "value" ? "Correct / Incorrect" : value
              }
            />
           
            <Bar dataKey="value"  radius={8}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    </SlideLeft>

  );
};

export default CustomBarChart;
