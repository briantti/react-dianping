import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from "react-redux";
import * as userInfoActionsFormOtherFile from "../../actions/userinfo";
import {bindActionCreators} from "redux";
import { hashHistory} from 'react-router'
import Header from "../../components/Header";
import LoginComponent from "../../components/Login";

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            //检查中，还没检查完成
            checking: true
        }
    }
    render() {
        return (
            <div>
                <Header title='登录'/>
                {
                    // 等待验证之后，再显示登录信息
                    this.state.checking
                    ?<div>{/*等待中*/}</div>
                    :<LoginComponent loginHandle={this.LoginHandle.bind(this)}/>
                }
            </div>
        )
    }

    componentDidMount(){
        // 判断是否已经登录
        this.doCheck()
    }
    //登陆成功后的处理
    LoginHandle(username){
        //保存用户名
        const action = this.props.userInfoActions;
        let userinfo = this.props.userinfo;
        userinfo.username = username;
        action.update(userinfo);

        //跳转链接
        const params = this.props.params;
        const router = params.router;
        if(router){
            //跳转到指定页面
            hashHistory.push(router)
        }else{
            //跳转到默认页面,即用户中心页
            this.goUserPage()
        }
    }
    //从未登陆过时，username是没有的，走doCheck的else，一旦登陆就有值了，userinfo.username是true，进入用户界面
    doCheck(){
        const userinfo = this.props.userinfo;
        if(userinfo.username){
            //已经登录
            this.goUserPage()
        }else{
            //尚未登录
            this.setState({
                checking: false
            })
        }
    }
    //跳转到用户中心页
    goUserPage(){
        hashHistory.push('/User')
    }
}

//----------------------------redux react 绑定-------------------------------

function mapStateToProps(state){
    return {
        userinfo:state.userinfo

    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
