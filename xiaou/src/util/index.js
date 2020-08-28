import http from './axios'

export function getBannerList(){
    return http.get('/getbanner')
}
//获取分类树形结构
export function getCateTree(){
    return http.get('/getcatetree')
}
//获取商品信息(首页)
export function getGoods(){
    return http.get('/getindexgoods')
}
//获取分类商品
export function getGoodsList(params){
    return http.get('/getgoods',{
        params
    })
}

//注册
export function register(data){
    return http.post('/register',data)
}

//会员登录
export function login(data){
    return http.post('/login',data)
}