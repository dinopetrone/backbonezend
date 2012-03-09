var HowItWorks = HowItWorks || {}

HowItWorks.PageCollection = Backbone.Collection.extend({
	model : HowItWorks.CenterModulePageModel
});

HowItWorks.HowItWorksModel = Backbone.Model.extend({
	initialize : function() {
		var self = this;
		var tempArr = [];
		$('#how-it-works-subnav .backbone-url').each(function() {
			var viewArr = self.get('viewArray');
			var url = $(this).attr('href');
			var pageModel = new HowItWorks.CenterModulePageModel({templateUrl:url})
			tempArr.push(pageModel)
		})
		self.get('pageCollection').add(tempArr);
	},
	defaults : {
		currentView : null,
		direction : null,
		pageCollection : new HowItWorks.PageCollection()
	},
	isOnThe : function(key) {
		return 'right';
	}
});



HowItWorks.CenterModulePageModel = Backbone.Model.extend({
	initialize : function() {
		var self = this;
		$.ajax({
			url : self.get('templateUrl'),
			type : 'POST',
			dataType : 'html',
			success : function(template) {
				self.set({template:template})
			}
		});
	},
	defaults : {
		templateUrl : "/How-it-works/",
		template : null,
		index : 0
	}
})

HowItWorks.CenterModulePage = Backbone.View.extend({
	initialize : function() {
		var self = this;
		appModel.bind('change:currentView', function() {
			self.onViewChange();
		})
	},
	container : $('#how-it-works-container'),
	onViewChange : function() {
		if(this != appModel.get('currentView')) {
			//i'm not the current view...i need to die
			this.animateOut()
		}
	},
	render : function() {
		var template = null;
		var url = "/How-it-works/" + this.options.path;
		this.container.append(this.$el);
		this.$el.append(this.options.model.get('template'))
		this.$el.hide(0);
		this.animateIn()
		return this;
	},
	animateIn : function() {
		this.$el.fadeIn();
	},
	animateOut : function() {
		this.$el.fadeOut();
	}
});

HowItWorks.HowItWorksRouter = Backbone.Router.extend({
	routes : {
		//"": "index",
		"*actions" : "defaultRoute"
	},
	defaultRoute : function(path) {
		//get current view model based on path, create a new view, and pass the correct model
		var collection = appModel.get('pageCollection');
		var selectedModel = collection.find(function(model){
			return model.get('templateUrl').indexOf(path) != -1;
		})
		//console.log(JSON.stringify(selectedModel))
		var page = new HowItWorks.CenterModulePage({
			model : selectedModel
		})
		page.render()
		appModel.set({
			currentView : page
		})
	}
});

$(function() {
	// setup button listeners
	$('.backbone-url').on('click', function() {
		var path = $(this).attr('href')
		// have to kill the prefix so that this works on ie7
		path = path.replace('/How-it-works', '');
		router.navigate(path, {
			trigger : true,
			root : "/How-it-works/"
		});
		return false;
	})
})
var appModel = new HowItWorks.HowItWorksModel();
var router = new HowItWorks.HowItWorksRouter();
new HowItWorks.CenterModulePage({
	el : $('#how-it-works-container>div')
})

Backbone.history.start({
	pushState : true,
	root : "/How-it-works/",
	silent : true
})