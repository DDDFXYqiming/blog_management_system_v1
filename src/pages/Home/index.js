import BarChart from "./component/BarChart";
import "./index.scss";

const Home = () => {
  return (
    <div id="chart">
      <BarChart title={"三大框架满意度"} />
      <BarChart title={"三大框架使用度"} />
    </div>
  );
};

export default Home;
