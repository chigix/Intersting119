define("HangmanView_WordToGuess",["backbone","underscore","jquery","CHIJI_model","HangmanCollection_WordCollection"],function(Backbone,_,$,ChijiModel,HangmanCollection_WordCollection){
// 静态视图——HangmanView/WordToGuess
var view = Backbone.View.extend({

	//tagName: 'div',

	el: '#HangmanView_WordToGuess',

	template: _.template($('#HangmanView_WordToGuess_template').html()),

	events: {
	},

	initialize: function() {
		var wordCollection = HangmanCollection_WordCollection;
		this.listenTo(wordCollection, 'CurrentChange', this.render);
	},

	// Re-render the titles of the todo item.
	render: function(model) {
		this.model = model;
		this.$el.html(_.template($('#HangmanView_WordToGuess_template').html(), this.model.toJSON()));
		return this;
	},

	// Remove the item, destroy the model from *localStorage* and delete its view.
	clear: function() {
	}
});

return new view();

});define("app/hangmanview-wordtoguess",function(){});requirejs(["HangmanView_WordToGuess"]);


