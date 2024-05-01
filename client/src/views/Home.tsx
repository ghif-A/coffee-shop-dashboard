import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import TreeMap from "../components/TreeMap";
import { useTheme } from "../contexts/ThemeContext";
import Cards from "../components/Cards";
import GeoMap from "../components/GeoMap";

const Home: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Cards />
      <BarChart />
      <LineChart />
      <TreeMap />
      <GeoMap />
    </div>
  );
};

export default Home;
