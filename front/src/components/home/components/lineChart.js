import { PureComponent } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-background text-foreground">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export default function ({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="_id"
          // aria-sort="ascending"
          aria-sort="descending"
          height={60}
          tick={(props) => <CustomizedAxisTick {...props} />}
        />
        <YAxis />
        {/* <Tooltip /> */}
        {/* <Tooltip content={(props) => <CustomTooltip {...props} />} /> */}
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          // label={(props) => <CustomizedLabel {...props} />}
        />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
