import { useEffect, useState } from "react";
import { getChannelAPI } from "../apis/article";

// 封装获取专栏列表逻辑
function useChannel(){

  // 获取专栏列表
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  return {
    channelList
  }
}

export {useChannel}