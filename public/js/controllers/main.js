var app  = angular.module('tasksApp');

// inject the Todo service and user service factory into our controller
app.controller('mainController', ['$scope','$http','$sessionStorage','$location', 'Todos', 'Users', mainController]);
function mainController($scope, $http, $sessionStorage, $location, Todos, Users) {
	$scope.formData = {};
	$scope.loading = true;

	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	Todos.get()
		.then(function(result) {
			if(result.data.success) {
				$scope.todos = result.data.todos;
				$scope.loading = false;
			} else {
				alert('Not authorized. Please Login!');
				$location.path('/');
			}

		});

	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.text != undefined) {
			$scope.loading = true;

			// call the create function from our service (returns a promise object)
			Todos.create($scope.formData)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data; // assign our new list of todos
				});
		}
	};

	// DELETE ==================================================================
	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$scope.loading = true;

		Todos.delete(id)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				$scope.loading = false;
				$scope.todos = data; // assign our new list of todos
			});
	};

	$scope.logout = function(){
		$sessionStorage.authToken = null;
		$location.path('/');
	};
}
