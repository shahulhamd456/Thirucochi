import Chart from "react-apexcharts";

const BarChart = (props) => {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      type="bar"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default BarChart;

