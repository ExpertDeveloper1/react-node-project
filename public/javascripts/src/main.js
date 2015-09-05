var React = require('react');

var SidebarPage = require('./components/SidebarPage.js');


var option = {};
option.header = ['姓名', 'commits数', '新增行数', '删除行数', '净增行数'];
option.body = ['name', 'commits', 'addline', 'subline', 'totalline'];
option.sort = {number: 5, asc: -1};
option.url='json';


var initPara = {};
initPara.defaultIndex = 0;
initPara.items = ['7月', '8月'];
initPara.urls = ['json', 'json'];



React.render(<SidebarPage table={option} sideBar={initPara}/>, document.getElementById('body'));

