/**
 * Created by wyd on 8/24/15.
 */

var React = require('react');


module.exports = React.createClass({
    propTypes: {
        defaultIndex: React.PropTypes.number,
        items: React.PropTypes.array.isRequired,
        urls:React.PropTypes.array.isRequired,
        callbackParent:React.PropTypes.func.isRequired
    },
    getDefaultProps: function () {

        return {defaultIndex:0,items:[],urls:[]};
    },
    getInitialState: function () {
        return {index: this.props.defaultIndex};
    },
    clickProcess: function (indexValue) {
        this.setState({index: indexValue});
        this.props.callbackParent(this.props.urls[indexValue]);
    },
    render: function () {
        return <div>
            <ul className='nav nav-sidebar'>
                {this.props.items.map(function (data) {
                    return <li key={arguments[1]} onClick={this.clickProcess.bind(this,arguments[1])}
                               className={arguments[1]===this.state.index? 'active':''}>
                        <a href='#'>{data}</a>
                    </li>;
                }, this)}
            </ul>
        </div>;
    }
})
;
