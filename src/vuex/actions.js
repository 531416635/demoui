// import axios from '@/api/axios'
import axios from 'axios'
import {router} from '../router/index'
/**
 * 解决跨域请求时，session丢失的问题（需与后台跨域请求一起设置Credentials）
 * @type {boolean}
 */
axios.defaults.withCredentials=true;

const hostUrl = "http://27.22.125.135:1502/huzhengserver/"
//图片大小限制 5M的大小为 5*1024*1024 即 1048576*5
var imgSize = 5242880;
// const hostUrl = "http://localhost:8090/huzhengserver/"
// const hostUrl = "http://192.168.222.18:8090/huzheng/"

// 声明 actions事件
const actions = {

  // todo 首页获取后台返回的用户信息和三条历史记录
  getUserAndThreehistory({ commit,state},val){
      axios({
      method: 'post',
      url: hostUrl + 'getUserDate.do',
    }).then((response) => {
        console.log(response)
      //重新渲染state数据
      commit('setIndexUserAndThreeHistory',response.data)
    }).catch((err) =>{
//          console.log(err)
    })
  },
// todo 历史记录查询
  getHistoryListData({ commit,state},page){

    axios({
      method: 'post',
      url: hostUrl + 'getAllHistory.do',
      data : {
            "type":null,
            "page":page.page,
            // "userId":state.userDate.user_id
            "userId":state.userDate.userid
      },
    }).then((response) => {
      //重新渲染state数据
      commit('setHistoryListData',response.data)
    }).catch((err) =>{
//          console.log(err)
    })
  },

    // todo 新生儿数据提交
    submitBirthData({ commit,state},val){
        //结婚证内页照片
        if(this.state.birthModel.jhzzp == ''){
            alert('请上传结婚证内页照片')
            return false
        }
        //落户地户口簿首页
        if(this.state.birthModel.hkbsyzp == ''){
            alert('请上传落户地户口簿首页')
            return false
        }
        //父亲/母亲户口簿内页
        if(this.state.birthModel.hkbnyzp == ''){
            alert('请上传父亲/母亲户口簿内页')
            return false
        }
        //出生医学证明
        if(this.state.birthModel.cszmzp== ''){
            alert('请上传出生医学证明')
            return false
        }
        //父亲身份证照片人像面
        if(this.state.birthModel.fqsfzzp == ''){
            alert('请上传父亲身份证照片人像面')
            return false
        }
        //父亲身份证照片国徽面
        if(this.state.birthModel.fqsfzzpFm == ''){
            alert('请上传父亲身份证照片国徽面')
            return false
        }
        //母亲身份证照片
        if(this.state.birthModel.mqsfzzp == ''){
            alert('请上传母亲身份证照片')
            return false
        }
        //母亲身份证照片国徽面
        if(this.state.birthModel.mqsfzzpFm == ''){
            alert('请上传母亲身份证照片国徽面')
            return false
        }
        //入户申请照片
        if(this.state.birthModel.rhsqzp == ''){
            alert('请上传入户申请照片')
            return false
        }
        //校验通过再进行
        else{
            axios({
                method: 'post',
                url: hostUrl + 'birth/uploadBirth.do',
                data : state.birthModel,
            }).then((response) => {
                if(response.data.code === '1'){
                    this.$router.push({path:'/Brith1/SubmitSuccess'})
                }
            }).catch((err) =>{
//          console.log(err)
            })
        }
    },




    //支付宝选择照片
    chooseImg({ commit,state},page){
        var u = navigator.userAgent;
        var wid;
        var hei;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isAndroid) {
            wid=900;
            hei=563;
        }else{
            wid=300
            hei=187
        }
        AlipayJSBridge.call('photo', {
            dataType: 'dataURL',
            imageFormat: 'png',
            quality: 75,//png的图片质量, 取值1到100
            maxWidth: wid,
            maxHeight: hei,
            allowEdit: false,
            multimediaConfig: { // 可选，仅当该项被配置时，图片被传输至 APMultimedia
                compress: 2, // 可选，默认为4。 0-低质量，1-中质量，2-高质量，3-不压缩，4-根据网络情况自动选择
                business: "multiMedia" // 可选，默认为“NebulaBiz”
            }
        }, function (result) {

            var srcImg = result.dataURL;
            var fileURL =  result.fileURL;//图片文件URL
            //判断图片大小
            var srcImg1 = result.dataURL;
            var equalIndex= srcImg1.indexOf('=');
            srcImg1=srcImg1.substring(0, equalIndex);
            var strLength=srcImg1.length;
            var fileLength=parseInt(strLength-(strLength/8)*2);
            if(fileLength > imgSize){
                alert("图片大小不能超过"+imgSizeInfo+",请重新上传！");
                return false;
            }
            //将选择的图片上传到服务器中
            axios({
                url: hostUrl + "uploadImg.do",
                method: 'post',
                data : {
                    srcImg: srcImg,
                    name: 'changeImg_' + page
                }
            }).then((response) => {
                $('.changeImg_'+page).attr("src","data:image/png;base64," + srcImg);
                $('.changeImg_'+page).attr("fileURL",fileURL);
                // $('.changeImg_'+page).attr("max-width","1.6rem");
                // $('.changeImg_'+page).attr("max-height","1rem");

                if(page == "1"){//结婚证内页照片
                    commit('setjhzzp',"changeImg_"+page)
                }else if(page == "2"){//落户地户口簿首页
                    commit('sethkbsyzp',"changeImg_"+page)
                }else if(page == "3"){//父亲/母亲户口簿内页
                    commit('sethkbnyzp',"changeImg_"+page)
                }else if(page == "4"){//出生医学证明
                    commit('setcszmzp',"changeImg_"+page)
                }else if(page == "5"){//父亲 身份证人像面
                    commit('setfqsfzzp',"changeImg_"+page)
                }else if(page == "6"){//父亲 身份证国徽面
                    commit('setfqsfzzpFm',"changeImg_"+page)
                }else if(page == "8"){//母亲 身份证人像面
                    commit('setmqsfzzp',"changeImg_"+page)
                }else if(page == "9"){//母亲 身份证国徽面
                    commit('setmqsfzzpFm',"changeImg_"+page)
                }else if(page == "7"){//入户申请照片
                    commit('setrhsqzp',"changeImg_"+page)
                }

                else if(page == "11"){//死亡 -- 申请人身份证正面
                    commit('setsbrsfzzp1',"changeImg_"+page)
                }else if(page == "12"){//死亡 -- 申请人身份证反面
                    commit('setsbrsfzzpFm1',"changeImg_"+page)
                }else if(page == "13"){//死亡 -- 户口薄首页照片
                    commit('sethkbsyzp1',"changeImg_"+page)
                }else if(page == "14"){//死亡 -- 户口薄内页照片
                    commit('sethkbnyzp1',"changeImg_"+page)
                }else if(page == "15"){//死亡 -- 死亡证明照片
                    commit('setswzmzp1',"changeImg_"+page)
                }

            }).catch((err) =>{
                alert("图片上传失败");
            });
        });
    },

    // todo s死亡数据提交
    submitDeathData({ commit,state},val){
        //结婚证内页照片
        if(this.state.deathModel.sbrsfzzp == ''){
            alert('请上传身份证正反面照片')
            return false
        }
        if(this.state.deathModel.sbrsfzzpFm == ''){
            alert('请上传身份证国徽面')
            return false
        }
        if(this.state.deathModel.swzmzp == ''){
            alert('请上传结婚证内页照片')
            return false
        }
        else{
            axios({
                method: 'post',
                url: hostUrl + 'death/uploadDeath.do',
                data : state.deathModel,
            }).then((response) => {
                let code = response.data.code
                if( code == 1){
                    alert('提交成功')
                    commit('initRouter',1)
                    // router.push('/Death/DeathSubmit')
                }
            }).catch((err) =>{
//          console.log(err)
            })
        }
    },


    /**
     * 调取支付宝选择组件 -- 选择家庭关系
     * @param index
     */
    chooseHuZhu : function ({ commit,state},index){
        AlipayJSBridge.call('beehiveOptionsPicker', {
            title:"关系选择",
            optionsOne:["父亲","母亲"],
            selectedOneIndex: 0,
        }, function(result) {
            if(null!=result.selectedOneOption
                &&result.selectedOneOption!=""
                &&result.selectedOneOption.length>0){
                if(index == "1"){// 新生儿 --- 与新生儿关系
                    commit('setyxsegx',result.selectedOneOption)
                }else if(index == "2"){//新生儿 --- 与户主关系
                    commit('setyhzgx',result.selectedOneOption)
                }else if(index == "3"){//死亡 --- 与死者关系
                    commit('setyszgx',result.selectedOneOption)
                }else if(index == "4"){//死亡 --- 与户主关系
                    commit('setyhzgx1',result.selectedOneOption)
                }
            }
        });
    },

    /**
     * 调取支付宝选择组件 -- 选择民族
     * @param index
     */
    chooseMinZu : function({ commit,state},index){
        console.log(index)
        commit('clearSelectComponets')
        axios({
            method: 'post',
            url: hostUrl + 'getDictMZ.do',
            data : {lx:"民族"},
        }).then((response) => {
            if(index.data == "1"){//新生儿 民族选择
                commit('setSelectComponets',response.data)
                commit('setSelectType',index.data)
            }
        }).catch((err) =>{
//          console.log(err)
        })
    },

    /**
     * 调取支付宝查询城市的API -- 市县区
     * @param index
     */
    chooseCitys : function({ commit,state},index){
        console.log(index)
        commit('clearSelectComponets')
        axios({
            method: 'post',
            url: hostUrl + 'getDictDQ.do',
        }).then((response) => {
            commit('setSelectComponets',response.data)
            commit('setSelectType',index.data)
        }).catch((err) =>{
//          console.log(err)
        })
    },

    /**
     * 调取支付宝查询城市的API -- 落户辖区派出所
     * @param index
     */
    choosePcs : function({ commit,state},index){
        console.log(index)
        commit('clearSelectComponets')
        axios({
            method: 'post',
            url: hostUrl + 'getDictPCS.do',
        }).then((response) => {
            commit('setSelectComponets',response.data)
            commit('setSelectType',index.data)
        }).catch((err) =>{
//          console.log(err)
        })
    },


    /**
     * 获取选择组件选中之后的值
     * @param index
     */
    getSelectComponetsVale : function({ commit,state},index){
        commit('setSelectComponetsVale',index.data)
        // this.$router.go(-1)
    },
    /**
     * 调取支付宝选择组件 -- 选择血型
     * @param index
     */
    chooseXuexing : function ({ commit,state},index){
        //todo 注意：此处是一个大坑
        let initAlipay= AlipayJSBridge
        // alert(index)
        axios({
            method: 'post',
            url: hostUrl + 'getDict.do',
            data : {lx:"血型"},
        }).then((response) => {
            let data = response.data
            // console.log(data)
            // console.log(window.AlipayJSBridge)
            initAlipay.call('beehiveOptionsPicker', {
                title:"血型选择",
                optionsOne:data,
                selectedOneIndex: 0,
            }, function(result) {
                if(null!=result.selectedOneOption
                    &&result.selectedOneOption!=""
                    &&result.selectedOneOption.length>0){
                    if(index == "1"){//新生儿血型选择
                        commit('setxx',result.selectedOneOption)
                    }
                }
            });
        }).catch((err) =>{
//          console.log(err)
        })
    },

    /**
     * 调取支付宝时间选择器的API
     * @param index
     */
    chooseDate : function ({ commit,state},index){
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var dateStr = year +"-"+month+"-"+date;
    AlipayJSBridge.call('datePicker',{
        beginDate: dateStr,
        minDate: '2000-01-01',
        maxDate: dateStr,
        mode:1,
        isIDCard: false,
    }, function(e){
        var dateString = e.date;
        var reg=/\//g;
        dateString=dateString.replace(reg,'-');
        if(index == "1"){//新生儿出生时间
            commit('setcsrq',dateString)
        }else if(index == "2"){//死亡日期
            commit('setswrq',dateString)
        }
    })
}
}

export default actions
