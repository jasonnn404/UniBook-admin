import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1-2 hours",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "3-4 hours",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "5-6 hours",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "7-8 hours",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "9-12 hours",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "13-16 hours",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "17-24 hours",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "24+ hours",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1-2 hours",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "3-4 hours",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "5-6 hours",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "7-8 hours",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "9-12 hours",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "13-16 hours",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "17-24 hours",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "24+ hours",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numHours || 0;
      if (num >= 1 && num <= 2) return incArrayValue(arr, "1-2 hours");
      if (num >= 3 && num <= 4) return incArrayValue(arr, "3-4 hours");
      if (num >= 5 && num <= 6) return incArrayValue(arr, "5-6 hours");
      if (num >= 7 && num <= 8) return incArrayValue(arr, "7-8 hours");
      if (num >= 9 && num <= 12) return incArrayValue(arr, "9-12 hours");
      if (num >= 13 && num <= 16) return incArrayValue(arr, "13-16 hours");
      if (num >= 17 && num <= 24) return incArrayValue(arr, "17-24 hours");
      if (num > 24) return incArrayValue(arr, "24+ hours");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Booking duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
