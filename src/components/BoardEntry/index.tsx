import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Meta from "antd/es/card/Meta";

const BoardEntry = () => {
  const navigate = useNavigate();
  return (
    <div className="entry-wrapper">
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" src={"/1.jpeg"} />}
        onClick={() => navigate("/allfactor")}
      >
        <Meta title="菜品要素占比信息（少维度）" />
      </Card>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" src={"/2.jpeg"} />}
        onClick={() => navigate("/factor")}
      >
        <Meta title="单个菜品要素占比信息" />
      </Card>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" src={"/3.jpeg"} />}
        onClick={() => navigate("/test")}
      >
        <Meta title="（多天）按照固定入库量推荐" />
      </Card>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" src={"/4.jpeg"} />}
        onClick={() => navigate("/testkind")}
      >
        <Meta title="（多天）按照固定入库量和种类推荐" />
      </Card>
    </div>
  );

  // return (
  //   <div className="entry-wrapper">
  //     <Button onClick={() => navigate("/allfactor")}>
  //       菜品要素占比信息（少维度）
  //     </Button>

  //     <Button onClick={() => navigate("/factor")}>单个菜品要素占比信息</Button>
  //     {/* <Button onClick={() => navigate("/sale-category-one")}>
  //       按照固定种类数推荐
  //     </Button>
  //     <Button onClick={() => navigate("/sale-stock")}>
  //       按照固定入库量推荐
  //     </Button> */}
  //     <Button onClick={() => navigate("/test")}>
  //       （多天）按照固定入库量推荐
  //     </Button>
  //     <Button onClick={() => navigate("/testkind")}>
  //       （多天）按照固定入库量和种类推荐
  //     </Button>
  //   </div>
  // );
};

export default BoardEntry;
