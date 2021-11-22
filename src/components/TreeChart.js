import React, { useEffect, useState } from "react";
import { getTreeData } from "../services/TreeData";
import { Bar } from "react-chartjs-2";

const TreeChart = () => {
  // Initial state for our chart...
  const initTreeChartState = {
    labels: [],
    datasets: [],
  };

  // Let's say we had a requirement to choose from the last 3 years in the year filter...
  const yearsFromNowMinusThree = Array.from(
    { length: 3 },
    (v, k) => k + new Date().getFullYear() - 2
  );
  // Let's use the first year for the first fetch...
  const [selectedYear, setSelectedYear] = useState(yearsFromNowMinusThree[0]);

  // Set the chart data in state so it can be updated...
  const [treeData, setTreeData] = useState(initTreeChartState);

  // Returns a new chart configuration, with new data
  function refreshChart(data) {
    return {
      labels: data.map((item) => `${item.day} ${item.month}`),
      datasets: [
        {
          label: "Trees Planted",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: data.map((item) => item.trees),
        },
      ],
    };
  }

  // Let's call the data service once the component has rendered...
  useEffect(() => {
    getTreeData(selectedYear).then((data) => {
      setTreeData(refreshChart(data));
    });
  }, [selectedYear]);

  // Handles the drop down changes for year filter changes.
  function handleYearChange(event) {
    event.preventDefault();
    setSelectedYear(event.target.value);
  }

  return (
    <div>
      <label htmlFor="year">Choose a year:</label>
      <select id="year" onChange={handleYearChange}>
        {yearsFromNowMinusThree.map((yearToChoose) => {
          return <option key={ yearToChoose } label={yearToChoose}>{yearToChoose}</option>;
        })}
      </select>
      <Bar
        data={treeData}
        options={{
          title: {
            display: true,
            text: "Tree Planted",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default TreeChart;
