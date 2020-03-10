/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/panes',
	'views/pane',
	'text!templates/controls.html',
], function ($, _, Backbone, Panes, PaneView, controlsTemplate) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#app',

		// Compile our stats template
		template: _.template(controlsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #add-pane': 'createPane',
			'click #add-title': 'createTitle',
			'click #add-cover': 'createCover',
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.$panes = this.$('#pane-container');
			this.$topControl = this.$('#top-control');

			this.listenTo(Panes, 'add', this.addPane);
			this.listenTo(Panes, 'reset', this.addAllPanes);
			this.listenTo(Panes, 'all', this.render);
			this.listenTo(Backbone, 'pane:moveup', this.moveUp);
			this.listenTo(Backbone, 'pane:movedown', this.moveDown);
			this.listenTo(Backbone, 'pane:duplicate', this.duplicate);

			Panes.fetch({reset:true});

		},

		render: function () {
			/* Panes */
			this.$topControl.html(this.template());
			if (Panes.length) {
				this.$panes.show();
			} else {
				this.$panes.hide();
			}
		},

		/* Panes */
		createPane: function (e) {
			Panes.create(Panes.fabriq('pane'));
		},

		createTitle: function (e) {
			Panes.create(Panes.fabriq('title'));
		},

		createCover: function (e) {
			Panes.create(Panes.fabriq('cover'));
		},

		duplicate: function (pane) {
			var model = Panes.clone(pane.model.toJSON());
			Panes.fetch({reset:true});
			console.log(model);
		},

		addPane: function (pane) {
			var view = new PaneView({ model: pane });
			this.$panes.append(view.render().el);
		},


		swapModels: function (model1, model2) {
			var orderSwap = model2.toJSON().order;
			model2.save({
				order: model1.toJSON().order
			});
			model1.save({
				order: orderSwap
			});
			return true;
		},

		moveUp: function (pane) {
			var model = pane.model;
			let prevId = null;
			for(var i in Panes.models) {
				if (Panes.models[i] === model && prevId !== null) {
					this.swapModels(model, Panes.models[prevId]);
					Panes.fetch({reset:true});
					return;
				}
				prevId = i;
			}
		},

		moveDown: function (pane) {
			var model = pane.model;
			let prevId = null;
			for(var i in Panes.models) {
				if (prevId !== null) {
					this.swapModels(Panes.models[prevId], Panes.models[i]);
					Panes.fetch({reset:true});
					return;
				}
				if (Panes.models[i] === model) {
					prevId = i;
				}
			}
		},

		addAllPanes: function () {
			this.$panes.empty();
			Panes.each(this.addPane, this);
		},
	});

	return AppView;
});
