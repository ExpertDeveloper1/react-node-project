var React = require('react');

var SidebarPage = require('./component/SidebarPage.js');


var option = {};
option.header = ['姓名', 'commits数', '新增行数', '删除行数', '净增行数'];
option.body = ['name', 'commits', 'addline', 'subline', 'totalline'];
option.sort = {number: 5, asc: -1};
option.url='';


var initPara = {};
initPara.defaultIndex = 0;
initPara.items = ['', ''];
initPara.urls = ['', ''];



React.render(<SidebarPage table={option} sideBar={initPara}/>, document.getElementById('body'));

