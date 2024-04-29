import Table from "../components/Table";
import { useTheme } from "../contexts/ThemeContext";

const Tables = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '10px' }}>Products</h4>
      <Table />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Stores</h4>
    </div>
  );
};

export default Tables;
