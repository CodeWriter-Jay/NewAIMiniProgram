// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
  const tencentcloud = require("tencentcloud-sdk-nodejs");

  const NlpClient = tencentcloud.nlp.v20190408.Client;

  const clientConfig = {
    credential: {
      secretId: "AKID5nfPsDEjkZVUK1JzDh4YppmgeU9epSUN",
      secretKey: "VP9i8arMkRuMepmYWJKYaPuRkqkV4Vmu",
    },
    region: "ap-guangzhou",
    profile: {
      httpProfile: {
        endpoint: "nlp.tencentcloudapi.com",
      },
    },
  };

  const client = new NlpClient(clientConfig);
  const { Query } = event
  const params = { Query };
  let result = null

  await client.ChatBot(params).then(
    (data) => {
      result = data
    },
    (err) => {
      result = err
    }
  );

  return {
    ...result
  }
}