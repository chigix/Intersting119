define("Hangman_index",["backbone","HangmanCollection_KeyCollection","HangmanView_Keyboard","CGA","CHIJI_bootstrap","HangmanCollection_objCommon","HangmanCollection_WordCollection"],function(Backbone,HangmanCollection_KeyCollection,HangmanView_Keyboard,CGA,Bootstrap,HangmanCollection_objCommon,HangmanCollection_WordCollection){
// Initialize routing and start Backbone.history()
// 定义路由
/*
var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param) {
		// param → 当前路由名称，即null 或 active 或 completed
		if (param) {
			TodoView_objCommon.TodoFilter = param.trim();
		} else {
			TodoView_objCommon.TodoFilter = '';
		};
		// 为Todos Collection 触发filter事件，该事件绑定于TodoApp中
		TodoCollection_objTodos.trigger('filter');
	}
});
//启动路由
new Workspace();
*/
Backbone.history.start();
// Initialize the application view
var staticCollection = HangmanCollection_objCommon;
staticCollection.add([
	{id:'user'},
	{id:'request'},
	{id:'support'}
]);
var user = staticCollection.get('user');
var request = staticCollection.get('request');
var support = staticCollection.get('support');
support.set('requestUrl',null);
support.send = function(errfn,sucfn,scope){
	console.log(this.toJSON());
	if (this.get('requestUrl')!=null) {
		$.ajax({
			url: this.get('requestUrl'),
			type:'post',
			dataType: 'json',
			data: JSON.stringify(this),
			error: function(XHR){
				var status = XHR.status;
				var msg = XHR.statusText;
				$.proxy(errfn,scope)(msg);
			},
			success: function(data,msg,xhr){
				console.log(data);
				$.proxy(sucfn,scope)(data,msg);
			}
		});
	};
};
request.rebuild = function(){
	request.attributes = {};
}
request.send = function(errfn,sucfn,scope){
	console.log(user.get('requestUrl'));
	console.log(this.toJSON());
	$.ajax({
		url: user.get('requestUrl'),
		type:'post',
		dataType: 'json',
		data: this.toJSON(),
		error: function(XHR){
			var status = XHR.status;
			var msg = XHR.statusText;
			$.proxy(errfn,scope)(msg);
		},
		success: function(data,msg,xhr){
			console.log(data);
			$.proxy(sucfn,scope)(data,msg);
		}
	});
};


});define("app/hangman-index",function(){});requirejs(["Hangman_index"]);


