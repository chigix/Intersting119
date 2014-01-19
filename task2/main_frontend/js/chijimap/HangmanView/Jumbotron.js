define("HangmanView_Jumbotron",["backbone","jquery","underscore","CHIJI_model","HangmanCollection_KeyCollection","HangmanCollection_objCommon","HangmanCollection_WordCollection","HangmanView_Keyboard"],function(Backbone,$,_,ChijiModel,HangmanCollection_KeyCollection,HangmanCollection_objCommon,HangmanCollection_WordCollection,HangmanView_Keyboard){
var view = Backbone.View.extend({

	el: '#HangmanView_Jumbotron',

	//template: _.template($('#HangmanView_KeyView').html()),

	btn: new Object(),

	// Delegated events for click start, keypressOnEnter
	events: {
		'click .btn': 'btnClick',
	},

	initialize: function() {
		this.$leadTxt = this.$('.lead');
		this.$informationTxt = this.$('h5.information');
		this.$inputUserId = this.$('#HangmanView_Jumbotron_userIdInput');
		this.$inputURL = this.$('#HangmanView_Jumbotron_url');
		this.btn.$el = this.$('.btn');
		this.btn.fn=this.initGame;
	},

	btnClick: function() {
		$.proxy(this.btn.fn,this)();
	},

	initGame: function() {
		this.$('.tmpAdd').remove();
		var user = HangmanCollection_objCommon.get('user');
		var support = HangmanCollection_objCommon.get('support');
		user.userId = this.$inputUserId.val();
		user.set('requestUrl',this.$inputURL.val());
		var regxp = /^\s*$/;
		if (regxp.test(user.userId)) {
			this.alert('error','Please ensure you have input a visible userId string.');
			return;
		};
		if (regxp.test(user.get('requestUrl'))) {
			this.alert('error','Please ensure you have input a visible userId string.');
			return;
		};
		if (!regxp.test(this.$('#HangmanView_Jumbotron_support').val())) {
			support.set('requestUrl',this.$('#HangmanView_Jumbotron_support').val());
		};
		var request = HangmanCollection_objCommon.get('request');
		request.rebuild();
		request.set('userId',user.userId);
		request.set('action','initiateGame');
		request.send(function(msg){
			this.alert('error',msg + '.');
			return;
		},function(data,msg){
			user.secret = data.secret;
			user.numberOfGuessAllowedForEachWord=data.data.numberOfGuessAllowedForEachWord;
			user.numberOfWordsToGuess = data.data.numberOfWordsToGuess;
			this.changeInfo(msg + ',then you should click the button bottom to start guessing.');
			this.$inputUserId.hide().val('');
			this.$inputURL.hide().val();
			this.$('#HangmanView_Jumbotron_support').hide().val('');
			this.$inputUserId.after('<p class="lead tmpAdd">userId : ' + user.userId + '</p>')
							.after('<p class="lead tmpAdd">number of words to guess : ' + user.numberOfWordsToGuess + '</p>')
							.after('<p class="lead tmpAdd">number of guess ALLOWED FOR EACH WORD : ' + user.numberOfGuessAllowedForEachWord + '</p>');
			this.btn.fn = this.skipWord;
			this.btn.$el.text('NextWord');
		},this);
	},

	skipWord: function(){
		var request = HangmanCollection_objCommon.get('request');
		var user = HangmanCollection_objCommon.get('user');
		request.rebuild();
		request.set('userId', user.userId);
		request.set('action', 'nextWord');
		request.set('secret', user.secret);
		request.send(function(msg){
			this.alert('error', msg+'.');
		},function(data,msg){
			// 结束游戏
			if (data.data.numberOfWordsTried == 80) {
				this.btn.$el.text('Get Score');
				this.btn.fn = this.getScore;
				HangmanView_Keyboard.end();
			}else{
				var collection = HangmanCollection_WordCollection;
				collection.add(data);
				HangmanCollection_KeyCollection.reset();
				this.changeInfo(msg + ',then you could give your choice click the character buttons below, ENJOY~~~.');
			};
		},this);
	},

	getScore: function(){
		var request = HangmanCollection_objCommon.get('request');
		var user = HangmanCollection_objCommon.get('user');
		request.rebuild();
		request.set('userId', user.userId);
		request.set('action', 'getTestResults');
		request.set('secret', user.secret);
		request.send(function(msg){
			this.alert('error', msg+'.');
		},function(data,msg){
			this.changeInfo(data.message);
			this.alert('info','SCORE : ' + data.data.totalScore + 
						' | Correct Words : ' + data.data.numberOfCorrectWords + 
						' | Wrong Guess : ' + data.data.numberOfWrongGuesses);
			// 提交成绩
			if (data.data.numberOfWordsTried == 80) {
				this.btn.$el.text('Submit Score');
				this.btn.fn = this.submitScore;
			};
		},this);
	},

	submitScore: function(){
		var request = HangmanCollection_objCommon.get('request');
		var user = HangmanCollection_objCommon.get('user');
		request.rebuild();
		request.set('userId', user.userId);
		request.set('action', 'submitTestResults');
		request.set('secret', user.secret);
		request.send(function(msg){
			this.alert('error', msg+'.');
		},function(data,msg){
			this.changeInfo(msg);
			this.alert('success',data.message);
			this.btn.$el.remove();
		},this);
	},
	changeUser: function() {
		console.log('NOT IMPLEMENT');
	},

	alert: function(level,msg){
		$(this.$('.information')[0]).after('<div class="tmpAdd alert alert-' + level + '">' + 
				'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
				'<strong>'+ level.toUpperCase() +'!</strong>'+
				'&nbsp;&nbsp;' + msg + '</div>');
	},

	changeInfo: function(msg){
		var tmpNew = this.$informationTxt.clone();
		var tmpOld = this.$informationTxt;
		tmpNew.text(msg).hide().insertAfter(this.$informationTxt);
		tmpOld.hide('fast');
		tmpNew.show('normal');
		this.$informationTxt = tmpNew;
	},

	// Re-rendering the App just means refreshing the statistics -- the rest
	// of the app doesn't change.
	render: function() {
	}
});

return new view();

});define("app/hangmanview-jumbotron",function(){});requirejs(["HangmanView_Jumbotron"]);


