import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import BuyAndStore from '../../../components/BuyAndStore'
import * as storeActionsFormFile from '../../../actions/store.js'


class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore:false
        }
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }

    componentDidMount(){
        // 验证当前商户是否收藏
        this.checkStoreState()
    }

    //检验当前商户是否已被收藏
    checkStoreState(){
        const id = this.props.id;
        const store = this.props.store;

        //some只要有一个满足即可
        store.some(item=>{
            if(item.id === id){//商户已经被收藏
                this.setState({
                    isStore:true
                });
                //跳出循环
                return true
            }
        })


    }

    //购买事件
    buyHandle(){
        //验证登录
        const loginFlag = this.loginCheck();
        if(!loginFlag){
            return
        }

        // 此过程为模拟购买，因此可省去复杂的购买过程

        //跳转到用户
        hashHistory.push('/User/')


    }

    //收藏事件
    storeHandle(){
        //验证登录
        const loginFlag = this.loginCheck();
        if(!loginFlag){
            return
        }

        //已登录
        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if (this.state.isState){
            //当前商户已经被收藏，点击时即要取消收藏
            storeActions.rm({id:id})
        }else{
            //当前商户尚未被被收藏，点击时即要执行收藏
            storeActions.add({id:id})
        }

        //修改状态
        this.setState({
            isStore:!this.state.isStore
        })


    }

    //验证登录状态
    loginCheck(){
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if(!userinfo.username){
            //跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            hashHistory.push('/Login/' + encodeURIComponent('/detail' +id));
            return false
        }
        return true
    }
}




function mapStateToProps(state){
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch){
    return {
        storeActions: bindActionCreators(storeActionsFormFile,dispatch)

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)