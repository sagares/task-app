var app  = angular.module('tasksApp', ['ngRoute', 'ngStorage',
    'taskService', 'userService', 'categoryService']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/category', {
    templateUrl: 'templates/category.html'
  })
  .when('/tasks/:id', {
    templateUrl: 'templates/task.html'
  })
  .otherwise({
      templateUrl: 'templates/error.html'
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

app.directive('materialInput', function(){//add-category
  var directive = {};

  directive.restrict = 'C';
  directive.compile = function(element, attributes) {
      var linkFunction = function($scope, element, attributes) {
        var parent = element[0].parentNode;
        var input = parent.querySelector('.form-control');
        input.addEventListener('focus', function(e){
            element[0].style.width = '100%';
        });
        input.addEventListener('blur', function(e){
            element[0].style.width = '0%';
        });
      }
      return linkFunction;
  }

  return directive;
});
