import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import BoardEntry from "./components/BoardEntry";
import FactorBar from "./components/FactorBar";
import SaleRecommend from "./components/SaleRecommend";
import SaleCondition from "./components/SaleCondition";
import { HomeOutlined } from "@ant-design/icons";
import AllFactorBar from "./components/AllFactorBar";
import SaleComponent from "./components/SaleComponent";
import SaleCategory from "./components/SaleRecommend2";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="home">
        <Button onClick={() => navigate("/")}>
          <HomeOutlined /> 返回首页
        </Button>
      </div>
      <Routes>
        <Route path="/" element={<BoardEntry />} />
        <Route path="factor" element={<FactorBar />} />
        <Route path="allfactor" element={<AllFactorBar />} />
        <Route path="sale-category" element={<SaleRecommend />} />
        <Route path="sale-category-one" element={<SaleCategory />} />

        <Route path="sale-stock" element={<SaleCondition />} />
        <Route
          path="test"
          element={
            <SaleComponent
              title={"按照固定入库量推荐"}
              url={"/randomForest/getMaxSaleSpeedCountSort"}
              isKind={true}
            />
          }
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </div>
  );
}

export default App;
