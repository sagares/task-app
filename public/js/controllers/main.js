var app  = angular.module('tasksApp');

app.controller('userController', ['$scope','Users', userController]);
function userController($scope, Users) {
	$scope.user = {};
	$scope.login = {};
	$scope.signUp = function() {
		Users.create($scope.user).then(function(data) {
			console.log(data);
		}).error(function(err){
			console.log(err);
		});
	};
}

// inject the Todo service and user service factory into our controller
app.controller('mainController', ['$scope','$http','Todos', 'Users', mainController]);
function mainController($scope, $http, Todos, Users) {
	$scope.formData = {};
	$scope.loading = true;

	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	Todos.get()
		.then(function(data) {
			$scope.todos = data;
			$scope.loading = false;
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
}
