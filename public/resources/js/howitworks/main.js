var HowItWorks = HowItWorks || {}

HowItWorks.HowItWorksModel = Backbone.Model.extend({
	initialize: function() {

	},
	defaults: {
		currentView:null,
		previousView:null,
		direction:null,
	}
});

HowItWorks.CenterModulePage = Backbone.View.extend({
	el: $('#how-it-works-container'),
	render: function () {
		var template = null;
		var url = "/How-it-works/" + this.options.path;
		var that = this;
		$.ajax({
			url: url,
			type:'POST',
			dataType:'html',
			success: function(data) {
				$(that.el).append(data);
			}
		});
	},
	animateIn: function() {
		$(this.el).fadeIn();
	},
	animateOut: function() {
		$(this.el).fadeOut();
	}
});

HowItWorks.HowItWorksRouter = Backbone.Router.extend({
	routes: {
		//"": "index",
		"*actions": "defaultRoute"
	},
	index: function(  ) {

	},
	defaultRoute: function(path) {
		if(!this.ignoreFirst) {
			this.ignoreFirst = true;
			return
		}
		//set model
		//appModel set previous view to model current view
		//appModel set current view
		var page = new HowItWorks.CenterModulePage({
			path:path
		})
		page.render()

	}
});

$( function() {
	// setup button listeners
	$('.backbone-url').on('click', function() {
		var path = $(this).attr('href')
		// have to kill the prefix so that this works on ie7
		path = path.replace('/How-it-works','');
		router.navigate(path, {
			trigger: true,
			root: "/How-it-works/"
		});
		return false;
	})
})

var appModel = new HowItWorks.HowItWorksModel();
var router = new HowItWorks.HowItWorksRouter();
Backbone.history.start({
	pushState: true,
	root: "/How-it-works/"
})