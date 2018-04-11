import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader/index.js'
import Category from '../../components/Category/index.js'
import Ad from './subpage/Ad.js'
import List from './subpage/List.js'
import HomeAd from "../../components/HomeAd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userInfoActionsFormOtherFile from "../../actions/userinfo";

class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        return(
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height:'15px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userinfo:state.userinfo

    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)