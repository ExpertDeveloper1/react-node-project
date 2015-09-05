/**
 * Created by superjames on 9/5/15.
 */

var SideAppDispatcher = require('../dispatcher/SideAppDispatcher.js');
var SideConstants = require('../constants/SideConstants.js');

var ActionTypes = SideConstants.ActionTypes;

module.exports= {
    clickSidebar:function(contentURL){
        SideAppDispatcher.dispatch({
            type:ActionTypes.CLICK_SIDEBAR,
            url:contentURL
        })
    }
}