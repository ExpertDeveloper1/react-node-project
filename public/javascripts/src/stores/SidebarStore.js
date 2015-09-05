/**
 * Created by superjames on 9/5/15.
 */

var SideAppDispatcher = require('../dispatcher/SideAppDispatcher.js');
var SideConstants = require('../constants/SideConstants.js');

var ActionTypes = SideConstants.ActionTypes;

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

//先定义给component提供数据变更的事件

var MENU_CHANGE='menuChange';

var SidebarStore = assign({},EventEmitter.prototype,{
    emitChange: function() {
        this.emit(MENU_CHANGE);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(MENU_CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(MENU_CHANGE, callback);
    },
    getInitMenu:function(){
        return {
            index:0,items:['7月', '8月'],urls:['/json', '/json']
        }
    }
});

//定义注册dispatcher的事件
SidebarStore.dispatchToken =SideAppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.CLICK_SIDEBAR:
            SidebarStore.emitChange();
            break;

        default:
        // do nothing
    }
});

module.exports=SidebarStore;