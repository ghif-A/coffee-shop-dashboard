import Table from "../components/Table";
import { useTheme } from "../contexts/ThemeContext";

const Tables = () => {
  const { theme } = useTheme();
  return (
    <div className={theme} style={{ padding: '15px', margin: '15px' }}>
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black' }}>Products</h4>
      <Table />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Stores</h4>
      TBA
    </div>
  );
};

export default Tables;
