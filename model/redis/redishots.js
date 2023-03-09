const {redis} = require('./index')

// 视频热度增加 观看+1 点赞+2 评论+2 收藏+3
exports.hotInc = async (videoId,incNum) => {
    var data = await redis.zscore('myvideohots',videoId)
    if(data){
        var inc = await redis.zincrby('myvideohots',incNum,videoId)
    }else{
        var inc = await redis.zadd('myvideohots',incNum,videoId)
    }
    return inc
}
//获取视频热度列表
exports.hotList = async (num) => {
    //获取所有数据，并切按分数从大到小排序
    var hotlist = await redis.zrevrange('myvideohots',0,-1,'withscores')
    var newArr = hotlist.slice(0,num*2)
    console.log('newArr',newArr)
    var obj = {}
    for(let i = 0;i < newArr.length; i++){
        if(i%2 === 0){
            obj[newArr[i]] = newArr[i+1]
        }
    }
    console.log('obj',obj)
    return obj
}