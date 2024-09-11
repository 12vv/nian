import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

const BoardEntry = () => {
  const navigate = useNavigate();
  return (
    <div className="entry-wrapper">
      <Button onClick={() => navigate("/allfactor")}>
        菜品要素占比信息（少维度）
      </Button>
      <Button onClick={() => navigate("/factor")}>单个菜品要素占比信息</Button>
      <Button onClick={() => navigate("/sale-category-one")}>
        按照固定种类数推荐
      </Button>
      <Button onClick={() => navigate("/sale-stock")}>
        按照固定入库量推荐
      </Button>
      <Button onClick={() => navigate("/test")}>
        （多天）按照固定入库量推荐
      </Button>
    </div>
  );
};

export default BoardEntry;
