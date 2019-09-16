"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "gtd-to-do",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    "ember-simple-auth": {
      authenticationRoute: "unauth.sign-in",
      routeAfterAuthentication: "auth.collection",
      routeIfAlreadyAuthenticated: "auth.collection"
    },
    "ember-simple-auth-token": {
      refreshAccessTokens: true,
      refreshLeeway: 300,
      serverTokenEndpoint: "http://localhost:8080/auth/login/",
      serverTokenRefreshEndpoint: "/auth/refresh-token/"
    }
  };

  if (environment === "development") {
    ENV["ember-cli-mirage"] = {
      enabled: false
    };
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    ENV["ember-cli-mirage"] = {
      enabled: true
    };

    ENV["ember-simple-auth-token"] = {
      refreshAccessTokens: false,
      tokenExpirationInvalidateSession: false,
      serverTokenEndpoint: "http://localhost:8080/auth/login/"
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
