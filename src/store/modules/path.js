import { INIT_DATA } from './mutations-types.js'
export default{
    state:{
        list:[]
    },
    getters:{
        //筛选出默认值为1的地址
        defaultPath( state ){
            return state.list.filter(v=>{
                return v.isDefault == 1;
            })
        }
    },
    mutations:{
        [INIT_DATA]( state , arrPath ){
            state.list = arrPath;
        }
    }
}