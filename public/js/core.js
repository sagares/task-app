var app  = angular.module('tasksApp', ['ngRoute', 'todoService', 'userService']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/tasks', {
    templateUrl: 'templates/tasks.html'
  });

  $locationProvider.hashPrefix('!');
});
