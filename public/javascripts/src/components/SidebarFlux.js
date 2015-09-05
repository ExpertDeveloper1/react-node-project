/**
 * Created by wyd on 8/24/15.
 */

var React = require('react');
var SidebarStore=require('../stores/SidebarStore.js');
var SidebarActionCreator = require('../actions/SidebarActionCreator.js');


function getInit(){
    return SidebarStore.getInitMenu();
}
module.exports = React.createClass({

    getInitialState: function () {
        return getInit();
    },
    clickProcess: function (indexValue) {
        this.setState({index: indexValue});
        SidebarActionCreator.clickSidebar(this.state.urls[indexValue]);
    },

    render: function () {
        return <div>
            <ul className='nav nav-sidebar'>
                {this.state.items.map(function (data) {
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
