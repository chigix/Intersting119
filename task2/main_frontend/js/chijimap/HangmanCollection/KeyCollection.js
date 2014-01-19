define("HangmanCollection_KeyCollection",["underscore","backbone","CHIJI_model"],function(_,Backbone,ChijiModel){
var collection = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: ChijiModel,

	// url: 'http://five/Hangman/index.php/ajax/todo.html',
	// url: 'http://five/Hangman/index.php/todo/todo_chigix_restful',

	// We keep the Todos in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order number for new items.
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Todos are sorted by their original insertion order.
	comparator: function(ClsTodo) {
		return ClsTodo.get('order');
	}
});

return new collection();

});define("app/hangmancollection_keycollection",function(){});requirejs(["HangmanCollection_KeyCollection"]);


