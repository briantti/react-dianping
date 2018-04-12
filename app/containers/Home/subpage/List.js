import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home.js'

import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore/index'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data: [],//存储列表信息
            hasMore: false, //记录当前状态下，还有没有更多的数据可供加载
            isLoadingMore: false,//记录当前状态下，是“加载中...”还是“点击加载更多”
            page: 0 //下一页的页码，首页的页码是 0
        }
    }

    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                <div>
                    {
                        this.state.data.length
                        ?<ListComponent data={this.state.data}/>
                        :<div>加载中...</div>
                    }
                    {
                        this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        :<div></div>
                    }
                </div>
            </div>

        )
    }

    componentDidMount(){
        //获取首页数据
        this.loadFirstPageData()
    }
    //获取首屏数据
    loadFirstPageData(){
        const cityName = this.props.cityName
        const result = getListData(cityName,0)
        this.resultHandle(result)
    }
    //加载更多数据
    loadMoreData(){
        //用到this.resultHandle(result)
        //记录状态
        this.setState({
            isLoadingMore:true,
        });
        const cityName = this.props.cityName;
        const page = this.state.page; //下一页的页码
        const result = getListData(cityName,page);
        this.resultHandle(result);

        //增加page的计数
        this.setState({
            page:page +1,
            isLoadingMore:false
        })
    }


    //数据处理
    resultHandle(result){
        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore;
            const data = json.data;

            //存储数据
            this.setState({
                hasMore: hasMore,
                //如果直接用data：data，首先加载首屏数据，如果加载第二页，第二页会覆盖第一页的内容，要的是一直加载，越加越长，所以用数据拼接
                data: this.state.data.concat(data)
            })
        })
    }
}

export default List