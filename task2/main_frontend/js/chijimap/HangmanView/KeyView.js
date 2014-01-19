define("HangmanView_KeyView",["backbone","underscore","jquery","CHIJI_model","HangmanCollection_objCommon","HangmanView_Keyboard","HangmanCollection_WordCollection","HangmanView_Jumbotron"],function(Backbone,_,$,ChijiModel,HangmanCollection_objCommon,HangmanView_Keyboard,HangmanCollection_WordCollection,HangmanView_Jumbotron){
// 一个 KeyView 与一个 ChijiModel一一对应
var Keyview = Backbone.View.extend({

	tagName: 'div',

	//template: _.template($('#HangmanView_KeyView').html()),

	// 为每个Todo条目绑定通用事件
	events: {
		'click': 'clickResponse',
	},

	dependency:{},

	initialize: function() {
		this.listenTo(this.model, 'destroy', this.remove);
		this.dependency.KeyboardView = HangmanCollection_objCommon.get("KeyboardView").get('view');
		this.dependency.WordCollection = HangmanCollection_WordCollection;
	},

	// Re-render the titles of the todo item.
	render: function() {
		this.$el.addClass('span1');
		this.$el.addClass('key');
		this.$el.text(this.model.label);
		return this;
	},

	// Response for the click event on the current key
	clickResponse: function(){
		this.$el.hide('normal',$.proxy(this.clear,this));
		var request = HangmanCollection_objCommon.get('request');
		var user = HangmanCollection_objCommon.get('user');
		// console.log(this.dependency.KeyboardView);
		// console.log(this.dependency.WordCollection);
		request.rebuild();
		request.set('action','guessWord');
		request.set('guess',this.$el.text());
		request.set('userId',user.userId);
		request.set('secret',user.secret);
		request.send(function(msg){
			this.dependency.KeyboardView.alert('error',msg + '.');
			return;
		},function(data,msg){
			// Logic Deciding
			if (this.dependency.WordCollection.current != null) {
				console.log('currentWord',this.dependency.WordCollection.current.get('word'));
				console.log('dataWord',data.word);
				if (data.word == this.dependency.WordCollection.current.get('word')) {
					if (data.data.numberOfGuessAllowedForThisWord == 0) {
						this.dependency.KeyboardView.alert('warning',"TERRIBLE, You've only to click the NextWord___T_T_");
						this.dependency.KeyboardView.end();
					}else{
						// Fetch Suggestion Support
						if (this.dependency.KeyboardView.$('div.key:visible').length<20) {
							var keyArr = new Array();
							for (var i = 0; i < this.dependency.KeyboardView.$('div.key:visible').length; i++) {
								var tmpLabel = this.dependency.KeyboardView.$('div.key:visible')[i].innerHTML;
								if (tmpLabel == this.model.label) { continue; };
								keyArr.push();
							};
							var support = HangmanCollection_objCommon.get('support');
							support.set('likeStr',data.word);
							support.set('keyArr',keyArr);
							console.log(support.toJSON());
							support.send(function(msg){},function(data,msg){
								console.log(data);
								this.dependency.KeyboardView.renderKey(data);
							},this);
							this.dependency.KeyboardView.alert('warning',"INCORRECT GUESS....FINGHT→_→");
						};
					};
				}else{
					// Fetch Suggestion Support
					if (this.dependency.KeyboardView.$('div.key:visible').length<20) {
						var keyArr = new Array();
						for (var i = 0; i < this.dependency.KeyboardView.$('div.key:visible').length; i++) {
							var tmpLabel = this.dependency.KeyboardView.$('div.key:visible')[i].innerHTML;
							if (tmpLabel == this.model.label) { continue; };
							keyArr.push();
						};
						var support = HangmanCollection_objCommon.get('support');
						support.set('likeStr',data.word);
						support.set('keyArr',keyArr);
						console.log(support.toJSON());
						support.send(function(msg){},function(data,msg){
							console.log(data);
							this.dependency.KeyboardView.renderKey(data);
						},this);
					};
					if ((/\*+/).test(data.word)) {
						this.dependency.KeyboardView.alert('success','GOOD Guess ~~ (*^ω^*)');
					}else{
						this.dependency.KeyboardView.alert('success','TERRIFIC, You can go to the "NextWord", Good Luck~~');
					};
				};
			};
			this.dependency.WordCollection.add(data);
		},this);
	},
	// Remove the item, destroy the model from *localStorage* and delete its view.
	clear: function() {
		this.model.destroy();
		this.$el.remove();
	}
});
return Keyview;

});define("app/hangmanview-keyview",function(){});requirejs(["HangmanView_KeyView"]);


