// 使用阿里云视频点播服务，下面代码没有具体的key和value，只是演示
// 文档地址：https://help.aliyun.com/document_detail/101351.html
var RPCClient = require('@alicloud/pop-core').RPCClient;

function initVodClient(accessKeyId, accessKeySecret,) {
    var regionId = 'cn-shanghai';   // 点播服务接入地域
    var client = new RPCClient({//填入AccessKey信息
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
        apiVersion: '2017-03-21'
    });

    return client;
}

// 获取vod视频上传凭证
module.exports.getVod = (req,res)=>{
    // 请求示例
var client = initVodClient('<Your AccessKeyId>','<Your AccessKeySecret>');

    const vodBack = client.request("CreateUploadVideo", {
        Title: 'this is a sample',
        FileName: 'filename.mp4'
    }, {})
    res.status(200).json({vod:vodBack})
}