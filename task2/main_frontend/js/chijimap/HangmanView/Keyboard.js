define("HangmanView_Keyboard",["backbone","jquery","underscore","CHIJI_model","HangmanView_KeyView","HangmanCollection_KeyCollection","HangmanCollection_objCommon"],function(Backbone,$,_,ChijiModel,HangmanView_KeyView,HangmanCollection_KeyCollection,HangmanCollection_objCommon){
var KeyboardView = Backbone.View.extend({

	el: '#HangmanView_Keyboard',

	//template: _.template($('#HangmanView_KeyView').html()),

	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed. Kick things off by
	// loading any preexisting todos that might be saved in *localStorage*.
	initialize: function() {
		this.listenTo(HangmanCollection_KeyCollection, 'add', this.addKey);
		this.listenTo(HangmanCollection_KeyCollection, 'reset', this.start);
		this.end();
	},

	// To be called When a new round start
	start: function(){
		var afterHide = $.proxy(function(){
			this.$el.html('');
			for (var i = 0+65; i < 26+65; i++) {
				var objModel = new ChijiModel();
				objModel.label = String.fromCharCode(i);
				HangmanCollection_KeyCollection.add(objModel);
			};
			this.$el.show('normal');
		},this);
		this.$el.hide('fast',afterHide);
	},

	renderKey: function(array){
		var afterHide = $.proxy(function(){
			this.$el.html('');
			for (var i = 0; i < array.length; i++) {
				var objModel = new ChijiModel();
				objModel.label = array[i];
				HangmanCollection_KeyCollection.add(objModel);
			};
			this.$el.show('normal');
		},this);
		this.$el.hide('fast',afterHide);
	},

	alert: function(level,msg){
		this.$el.prev('div.alert').show().removeClass('alert-error').removeClass('alert-success').removeClass('alert-info')
			.addClass('alert-' + level).html(
  			'<strong>' + level.toUpperCase() +'!</strong>'+ msg +'');
	},

	// add a key to the current keyboard
	addKey: function(key){
		var view = new HangmanView_KeyView({
			model:key
		});
		this.$el.append(view.render().el);
	},

	// To be called When the current round end
	end: function(){
		// Clear and write the waiting message
		var collection = HangmanCollection_KeyCollection;
		if (collection.length>0) {
			this.$el.hide('normal',$.proxy(function(){
				while ( collection.length > 0) collection.pop();
				this.$el.html('<div class="span3 offset2"><h3>Waiting for Start...^_^<h3></div>');
				this.$el.show('normal');
			},this));
		}else{
			this.$el.html('<div class="span3 offset2"><h3>Waiting for Start...^_^<h3></div>');
			this.$el.show('normal');
		};
	},
	// Re-rendering the App just means refreshing the statistics -- the rest
	// of the app doesn't change.
	render: function() {
	}
});
// console.log('COMMON',HangmanCollection_objCommon);
var newView = new KeyboardView();
HangmanCollection_objCommon.add({'id':'KeyboardView','view':newView});
return newView;

});define("app/hangmanview-keyboard",function(){});requirejs(["HangmanView_Keyboard"]);


