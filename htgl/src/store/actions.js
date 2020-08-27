import {getMenulist,getRolelist,getUserlist,getCatelist,getSpecslist,getGoodsList,getBannerlist,getSecklist} from '../util';
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
    },
    getGoodsDataAction({commit},paInfo){
      getGoodsList(paInfo).then(res=>{
        commit('SET_GOODSDATA',res.list)
      })
    },
    getBannerDataAction({commit}){
      getBannerlist().then(res=>{
        commit('SET_BANNERDATA',res.list)
      })
    },
    getSeckDataAction({commit}){
      getSecklist().then(res=>{
        commit('SET_SECKDATA',res.list)
      })
    }

}