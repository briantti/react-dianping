import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item/index.js'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        //所有商户信息的集合
        const data = this.props.data
        return (
            <div className="list-container">
                {
                    this.props.data.map((item,index) => {
                        return <Item key={index} data={item}/>
                    })
                }

            </div>
        )
    }
}


export default List