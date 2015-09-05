/**
 * Created by wyd on 8/26/15.
 */

var React = require('react');
var JiraBugShow = require('./JiraBugShow.js');
var Sidebar = require('./Sidebar.js');



module.exports = React.createClass({
    propTypes: {
        sideBar: React.PropTypes.object,
        table: React.PropTypes.object
    },
    getDefaultProps: function () {
        var sidebarInit = {};
        sidebarInit.defaultIndex = 0;
        sidebarInit.items = [];
        sidebarInit.urls = [];
        var tableInit = {};
        tableInit.header = [];
        tableInit.body = [];
        tableInit.sort = {number: 1, asc: -1};
        return {sideBar:sidebarInit,table:tableInit};
    },
    getInitialState: function () {
        console.log(this.props.sideBar.urls[this.props.sideBar.defaultIndex]);
        return {showUrl: this.props.sideBar.urls[this.props.sideBar.defaultIndex]};
    },
    changeUrl: function (barUrl) {
        this.setState({showUrl: barUrl});
    },
    render: function () {
        return <div className='row'>
            <div className='col-sm-3 col-md-2 sidebar'>
                <Sidebar items={this.props.sideBar.items} urls={this.props.sideBar.urls} defaultIndex={this.props.sideBar.defaultIndex}
                         callbackParent={this.changeUrl}/>
            </div>
            <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2'>
                <h1>Dashboard</h1>

                <JiraBugShow url={this.state.showUrl} header={this.props.table.header} body={this.props.table.body} sort={this.props.table.sort}/>
            </div>
        </div>;
    }
});