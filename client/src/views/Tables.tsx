import Table from "../components/Table";
import { useTheme } from "../contexts/ThemeContext";

const Tables = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Table />
    </div>
  );
};

export default Tables;
