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