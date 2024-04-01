import { useEffect, useState } from "react";
import { identityCodeAPI } from "../../../apis/user";

const VerificationCode = () => {
  const [identityCode, setIdentityCode] = useState("");

  const getNewCode = async () => {
    // console.log('test')
    try {
      const res = await identityCodeAPI();
      setIdentityCode(`data:image/png;base64,${res.image}`);
    } catch (error) {
      console.error("Error fetching identity code:", error);
    }
  };

  useEffect(() => {
    getNewCode(); // 初始化时获取验证码图片
  }, []);

  return (
    <img
      src={identityCode}
      alt="验证码"
      className="verification-image"
      onClick={getNewCode} // 点击图片时获取新验证码图片
    />
  );
};

export default VerificationCode;
