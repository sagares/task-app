var app  = angular.module('tasksApp', ['ngRoute', 'ngStorage',
    'todoService', 'userService', 'categoryService']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/category', {
    templateUrl: 'templates/category.html'
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

app.directive('addCategory', function(){//add-category
  var directive = {};

  directive.restrict = 'A';
  directive.compile = function(element, attributes) {
      var linkFunction = function($scope, element, attributes) {
        element[0].addEventListener('click', function(e){
          var target = e.target;

        });
      }
      return linkFunction;
  }

  return directive;
});
