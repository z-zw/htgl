import http from './axios'

//菜单添加接口
export function getMenuadd(data){
    return http.post('/menuadd',data)
}
//菜单列表接口
export function getMenulist(params){
    return http.get('/menulist',{
        params
    })
}
//菜单获取接口
export function getMenuinfo(params){
    return http.get('/menuinfo',{
        params
    })
}
//菜单修改接口
export function getMenuedit(data){
    return http.post('/menuedit',data)
}
//菜单删除接口
export function getMenudelete(data){
    return http.post('/menudelete',data)
}


//角色添加接口
export function getRoleadd(data){
    return http.post('/roleadd',data)
}
//角色列表接口
export function getRolelist(){
    return http.get('/rolelist')
}
//角色获取接口
export function getRoleinfo(params){
    return http.get('/roleinfo',{
        params
    })
}
//角色修改接口
export function getRoleedit(data){
    return http.post('/roleedit',data)
}
//角色删除接口
export function getRoledelete(data){
    return http.post('/roledelete',data)
}


//管理员添加接口
export function getUseradd(data){
    return http.post('/useradd',data)
}
//管理员列表接口
export function getUserlist(params){
    return http.get('/userlist',{
        params
    })
}
//管理员总数（用于计算分页）
export function getUsercount(){
    return http.get('/usercount')
}
//管理员获取接口
export function getUserinfo(params){
    return http.get('/userinfo',{
        params
    })
}
//管理员修改接口
export function getUseredit(data){
    return http.post('/useredit',data)
}
//管理员删除接口
export function getUserdelete(data){
    return http.post('/userdelete',data)
}
//管理员登录
export function getUserlogin(data){
    return http.post('/userlogin',data)
}


//商品分类添加接口
export function getCateadd(data){
    return http.post('/cateadd',data)
}
//商品分类列表接口
export function getCatelist(params){
    return http.get('/catelist',{
        params
    })
}
//商品分类获取接口
export function getCateinfo(params){
    return http.get('/cateinfo',{
        params
    })
}
//商品分类修改接口
export function getCateedit(data){
    return http.post('/cateedit',data)
}
//商品分类删除接口
export function getCatedelete(data){
    return http.post('/catedelete',data)
}


//商品规格添加接口
export function getSpecsadd(data){
    return http.post('/specsadd',data)
}
//商品规格列表接口
export function getSpecslist(params){
    return http.get('/specslist',{
        params
    })
}
//商品规格总数（用于计算分页）
export function getSpecscount(){
    return http.get('/specscount')
}
//商品规格获取接口
export function getSpecsinfo(params){
    return http.get('/specsinfo',{
        params
    })
}
//商品规格修改接口
export function getSpecsedit(data){
    return http.post('/specsedit',data)
}
//商品规格删除接口
export function getSpecsdelete(data){
    return http.post('/specsdelete',data)
}


//添加商品管理
export function getGoodsAdd(data){
    return http.post('/goodsadd',data)
}
//商品管理总数（用于计算分页）
export function getGoodsCount(){
    return http.get('/goodscount')
}
//商品管理列表接口(分页)
export function getGoodsList(params){
    return http.get('/goodslist',{
        params
    })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/goodsinfo',{
        params
    })
}
//商品管理编辑事件
export function getGoodsEdit(data){
    return http.post('/goodsedit',data)
}
//商品管理删除事件
export function getGoodsDel(data){
    return http.post('/goodsdelete',data)
}


//轮播图添加接口
export function getBanneradd(data){
    return http.post('/banneradd',data)
}
//轮播图列表接口
export function getBannerlist(){
    return http.get('/bannerlist')
}
//轮播图获取接口
export function getBannerinfo(params){
    return http.get('/bannerinfo',{
        params
    })
}
//轮播图修改接口
export function getBanneredit(data){
    return http.post('/banneredit',data)
}
//轮播图删除接口
export function getBannerdelete(data){
    return http.post('/bannerdelete',data)
}


//秒杀活动添加接口
export function getSeckadd(data){
    return http.post('/seckadd',data)
}
//秒杀活动列表接口
export function getSecklist(){
    return http.get('/secklist')
}
//秒杀活动获取接口
export function getSeckinfo(params){
    return http.get('/seckinfo',{
        params
    })
}
//秒杀活动修改接口
export function getSeckedit(data){
    return http.post('/seckedit',data)
}
//秒杀活动删除接口
export function getSeckdelete(data){
    return http.post('/seckdelete',data)
}