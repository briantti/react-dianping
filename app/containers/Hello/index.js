import React from 'react';
import Header from '../../components/Header';
import Carousel from './subpage/Carousel';
import Recommend from './subpage/Recommend';
import List from './subpage/List';

class Hello extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            now: Date.now()
        }
    }
    render() {
        var arr = [1,2,3];
        return (
            <div>
                <Header title="hello页面的·"/>
                <p onClick={this.clickHandler.bind(this)}>hello world {this.state.now}</p>
                <hr/>
                <Carousel/>
                <Recommend/>
                <List/>
                <ul>
                    {arr.map(function (item, index) {
                                return <li key={index}>{item}</li>
                            }
                        )}
                </ul>
            </div>
        )
    }
    clickHandler() {
        this.setState({
            now: Date.now()
        })
    }
}

export default Hello
