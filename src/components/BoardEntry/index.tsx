import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

const BoardEntry = () => {
  const navigate = useNavigate();
  return (
    <div className="entry-wrapper">
      <Button onClick={() => navigate("/factor")}>
        菜品要素占比信息（少维度）
      </Button>
      <Button onClick={() => navigate("/sale-category")}>
        按照固定种类数推荐（N=120,K=4）
      </Button>
      <Button onClick={() => navigate("/sale-stock")}>
        按照固定入库量推荐（N=140）
      </Button>
    </div>
  );
};

export default BoardEntry;
