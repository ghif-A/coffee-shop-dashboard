import Table from "../components/Table";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const Tables = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <ThemeToggle />
      <h1>Tables</h1>
      <Table />
    </div>
  );
};

export default Tables;
