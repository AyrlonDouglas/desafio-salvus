import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme, Typography } from "@mui/material";
import theme from "../../../theme";
import { capitalizeText } from "../../../utils/strings";
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    showOnlyOne,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#ccc"}>
        {capitalizeText(payload.name)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={theme(undefined).palette.secondary.main}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {percent !== 1 && (
        <>
          {" "}
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={theme(undefined).palette.secondary.main}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`  ${(percent * 100).toFixed(0)}%`}
          </text>
        </>
      )}

      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text> */}
    </g>
  );
};
interface PieChart {
  data: any[];
  showOnlyOne?: boolean;
}
export default function PieRChart(props: PieChart) {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  return (
    <>
      <ResponsiveContainer>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={props.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={theme.palette.primary.main}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
