import {getMenulist,getRolelist,getUserlist,getCatelist,getSpecslist} from '../util';
export default {
    gettableDataAction({commit}){
            getMenulist({istree:1}).then((res) => {
              commit('SET_TABLEDATA',res.list)
            })
    },
    getRoleDataAction({commit}){
            getRolelist().then(res=>{
              commit('SET_ROLEDATA',res.list)
            })
    },
    getUserDataAction({commit},userInfo){
            getUserlist(userInfo).then(res=>{
              commit('SET_USERDATA',res.list)
            })
    },
    getCateDataAction({commit}){
            getCatelist({istree:1}).then(res=>{
              commit('SET_CATEDATA',res.list)
            })
    },
    getSpecsDataAction({commit},paInfo){
      getSpecslist(paInfo).then(res=>{
        commit('SET_SPECSDATA',res.list)
      })
}
}