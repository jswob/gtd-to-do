import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('unauth', function() {
    this.route('sign-up');
    this.route('sign-in');
  });
  this.route('auth', function() {
    this.route('collection');
  });
});

export default Router;
