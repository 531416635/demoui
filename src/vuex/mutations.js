/**
 * Mutations of Vuex
 */

// 声明 mutations事件以使用actions提交
const mutations = {
    //  渲染首页数据 用户信息和前三条历史记录
    setIndexUserAndThreeHistory(state, stateOfChange){
        state.userDate = stateOfChange.userInfo
        state.indexThreeHistory = stateOfChange.list
        state.indexHistorySize = stateOfChange.size
    },
    // 历史记录 == 更多
    setHistoryListData(state, stateOfChange){

        if(state.historyCounter > 0){
            state.historyListDate = state.historyListDate.concat(stateOfChange.list)
        }else{
            state.historyListDate = stateOfChange.list
        }
        state.historySize = stateOfChange.total
        state.historyCounter++
    },
    //进入页面时初始化 页面参数
    clearHistoryCounter(state, stateOfChange){
        // 历史记录 当前条数
        state.historyCounter = 0
        // 历史记录总条数 ==
        state.historySize = 0
    },

// 结婚证内页照片
    setjhzzp(state, stateOfChange){
        state.birthModel.jhzzp = stateOfChange
    },
// 落户地户口簿首页
    sethkbsyzp(state, stateOfChange){
        state.birthModel.hkbsyzp = stateOfChange
    },
    // 父亲/母亲户口簿内页
    sethkbnyzp(state, stateOfChange){
        state.birthModel.hkbnyzp = stateOfChange
    },
// 出生医学证明
    setcszmzp(state, stateOfChange){
        state.birthModel.cszmzp = stateOfChange
    },
    // 父亲 身份证人像面
    setfqsfzzp(state, stateOfChange){
        state.birthModel.fqsfzzp = stateOfChange
    },
    // 父亲 身份证国徽面
    setfqsfzzpFm(state, stateOfChange){
        state.birthModel.fqsfzzpFm = stateOfChange
    },// 母亲 身份证人像面
    setmqsfzzp(state, stateOfChange){
        state.birthModel.mqsfzzp = stateOfChange
    },
    // 母亲 身份证国徽面
    setmqsfzzpFm(state, stateOfChange){
        state.birthModel.mqsfzzpFm = stateOfChange
    },
    // 入户申请照片
    setrhsqzp(state, stateOfChange){
        state.birthModel.rhsqzp = stateOfChange
    },
    // 与新生儿关系
    setyxsegx(state, stateOfChange){
        state.birthModel.yxsegx = stateOfChange
    },
    // 新生儿 --与户主关系
    setyhzgx(state, stateOfChange){
        state.birthModel.yhzgx = stateOfChange
    },
    // 新生儿 --血型
    setxx(state, stateOfChange){
        state.birthModel.xx = stateOfChange
    },
    // 新生儿 --出生日期
    setcsrq(state, stateOfChange){
        state.birthModel.csrq = stateOfChange
    },

    // 死亡 --与死者关系
    setyszgx(state, stateOfChange){
        state.deathModel.yszgx = stateOfChange
    },
    // 死亡 --死亡日期
    setswrq(state, stateOfChange){
        state.deathModel.swrq = stateOfChange
    },
    // 死亡 --与户主关系
    setyhzgx1(state, stateOfChange){
        state.deathModel.yhzgx = stateOfChange
    },
    // 死亡 --申请人身份证正面
    setsbrsfzzp1(state, stateOfChange){
        state.deathModel.sbrsfzzp = stateOfChange
    },
    // 死亡 --申请人身份证反面
    setsbrsfzzpFm1(state, stateOfChange){
        state.deathModel.sbrsfzzpFm = stateOfChange
    },
    // 死亡 --户口薄首页照片
    sethkbsyzp1(state, stateOfChange){
        state.deathModel.hkbsyzp = stateOfChange
    },
    // 死亡 --户口薄内页照片
    sethkbnyzp1(state, stateOfChange){
        state.deathModel.hkbnyzp = stateOfChange
    },
    // 死亡 --死亡证明照片
    setswzmzp1(state, stateOfChange){
        state.deathModel.swzmzp = stateOfChange
    },

    // 设置拼音选择插件值
    setSelectComponets(state, stateOfChange){
        console.log("=============")
        console.log(stateOfChange)
        let cityList = stateOfChange
        let citys = []
        let pinyins = []
        let pinyinsList = []
        for(let i=0; i<cityList.length;i++){
            let city = cityList[i]
            let p = city.pinyin.charAt(0)
            if(pinyins.indexOf(p)< 0){
                let val =[]
                val.name=p
                val.adcode=0
                val.pinyin="maodian"+p
                citys.push(val)
                pinyinsList.push(val)
                pinyins.push(p)
            }
            citys.push(city)
        }
        state.selectPinyin = pinyinsList
        state.selectComponets = citys
    },

    //设置插件选择的类型
    setSelectType(state, stateOfChange){
        state.selectType = stateOfChange
    },
    // 清除拼音选择插件值
    clearSelectComponets(state){
        state.selectComponets = []
        state.selectPinyin = []
        state.selectType = ''
    },

    // 设置拼音选择 选中之后的值
    setSelectComponetsVale(state, stateOfChange){
        // let code =stateOfChange.code
        let code =stateOfChange.params
        let params = stateOfChange.params
        if("1"==state.selectType){
            state.birthModel.mz = code
            state.birthModel.mz_name = params
        }else if("2"==state.selectType){
            state.birthModel.csdssx = code
            state.birthModel.csdssx_name = params
        }else if("3"==state.selectType){
            state.birthModel.nlhxq = code
            state.birthModel.nlhxq_name = params
        }else if("4"==state.selectType){
            state.deathModel.hjdz = code
        }else if("5"==state.selectType){
            state.deathModel.hjdxq = code
        }
    },
     // 检测数据提交完成后控制路由跳转
        initRouter(state, stateOfChange){
            state.routerVal = stateOfChange
        }

}

export default mutations
