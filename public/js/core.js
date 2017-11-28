var app  = angular.module('tasksApp', ['ngRoute', 'ngStorage', 'todoService', 'userService']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/tasks', {
    templateUrl: 'templates/tasks.html'
  });

  $httpProvider.interceptors.push(function($sessionStorage, $location) {
    return {
      'request': function(config) {
        config.headers.authorization = $sessionStorage.authToken;
        return config;
      },

      'response': function(response) {
        return response;
      },

      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
            
            $location.path('/');
        }
        return response;
      }
    };
  });
  $locationProvider.hashPrefix('!');
});
