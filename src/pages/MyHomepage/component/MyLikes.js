import { useEffect, useState } from "react";
import { getArticleListAPI } from "../../../apis/article";
import { Card, List } from "antd";

const MyLikes= ()=>{
    // 获取文章列表
    const [list, setList] = useState();
    const [count, setCount] = useState(0);
    // 准备参数
    const [reqData, setReqData] = useState({
      status: "all",
      channel_id: "0",
      page: 1,
      per_page: 4,
    });
  
    useEffect(() => {
      async function getList() {
        const res = await getArticleListAPI(reqData);
        setList(res.data.articleData);
        setCount(res.data.total_count);
        // console.log("文章列表表单数据", res);
      }
      getList();
    }, [reqData]);

    return(
        <div>
        <Card className="card">
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href="/articleDetailLayout" target="_blank">
                      {item.title}
                    </a>
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>read_count {item.read_count} |</div>
                <div>like_count {item.like_count} |</div>
                <div>pubdate {item.pubdate} |</div>
              </List.Item>
            )}
          />
        </Card></div>
    )
}

export default MyLikes