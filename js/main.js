import 'es5-shim';

import AppView from 'views/app';
import Backbone from 'backbone';
import Workspace from 'routers/router';
import $ from 'jquery';

import 'styles/main.css';

// Initialize routing and start Backbone.history()
new Workspace();
Backbone.history.start();

// Initialize the application view
$(function() {
  new AppView()
});
