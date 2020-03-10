/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/pane.html',
], function ($, _, Backbone, paneTemplate) {
	'use strict';

	var PaneView = Backbone.View.extend({

		tagName:  'div',

		template: _.template(paneTemplate),

		// The DOM events specific to an item.
		events: {
      'blur [contenteditable*=true]':	'updateField',
      'click .pane-container__toggle': 'toggle',
      'click .pane-container__delete':	'clear',
      'click .pane-container__duplicate':	'duplicate',
      'click .pane-container__up':	'goUp',
      'click .pane-container__down':	'goDown',
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
      this.$el.attr('class', this.model.getClass());
      this.$el.attr(this.model.getCssProperties());
      return this;
		},

		updateField: function (e) {
        var field = e.target.id;
        var value = e.target.innerText.trim();
        if (value) {
          this.model.set(field, value);
          this.model.save();
        } else {
          console.log('fetxhing')
          this.model.fetch();
        }
		},

    goUp: function (e) {
      Backbone.trigger("pane:moveup", this);
    },

    goDown: function (e) {
      Backbone.trigger("pane:movedown", this);
    },

    duplicate: function () {
      Backbone.trigger("pane:duplicate", this);
    },

		// Toggle the `"completed"` state of the model.
		toggle: function () {
			this.model.toggle();
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});

	return PaneView;
});
