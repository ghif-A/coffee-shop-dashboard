import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
// import DiskUsageChart from "../components/DiskUsageChart";
import DiskUsageTreeMap from "../components/DiskUsageTreeMap";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const Home: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <ThemeToggle />
      <h1>Analytics Dashboard</h1>
      <BarChart />
      <LineChart />
      {/* <DiskUsageChart /> */}
      <DiskUsageTreeMap />
    </div>
  );
};

export default Home;
