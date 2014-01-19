define("CHIJI_model",["jquery","backbone","underscore"],function($,Backbone,_){

/**
 *
 * 千木数据抽象模型类
 *
 * @author Richard Lea <chigix@zoho.com>
 *
 **/

var model = Backbone.Model.extend({
	validate: function(reta) {
		if (reta.status && !(reta.status < 300 && reta.status >= 200)) {
			return reta.info || ("[" + reta.status || 000 + "] ERROR without any error.");
		};
	},
	parse: function(reta, options) {
		return reta.data;
	}
});
return model;

});define("app/chiji_model",function(){});requirejs(["CHIJI_model"]);


