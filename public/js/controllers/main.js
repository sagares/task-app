var app  = angular.module('tasksApp');

app.controller('userController', ['$scope', '$timeout', '$sessionStorage',
								'$location', 'Users', userController]);
function userController($scope, $timeout, $sessionStorage, $location, Users) {
	$scope.user = {};
	$scope.isSuccess = false;
	$scope.isFailure =  false;

	//handle sign up
	$scope.signUp = function(valid) {
		if(valid) {
			Users.create($scope.user).then(function(result) {
				//if signup successfull display success message
				if(result.data.success) {
					$scope.sucessMessage = result.data.msg;
					$scope.isSuccess =  true;
					$timeout(function(){
						$scope.isSuccess =  false;
					}, 3000);
				} else { //in case of unsuccessful signup display error message
					$scope.failureMessage = result.data.msg;
					$scope.isFailure =  true;
					$timeout(function(){
						$scope.isFailure =  false;
					}, 3000);
				}
			}, function(err){
				console.log(err);
			});
			//reset validations
			$timeout(function() {
      	$scope.signUpForm.$setPristine();
      	$scope.signUpForm.$setUntouched();
      	$scope.signUpForm.$submitted = false;
    	});
			$scope.resetSignUpForm();
		};
	};

//rest sign up form
	$scope.resetSignUpForm = function() {
        $scope.user = angular.copy({});
  };

	$scope.login = {};
	$scope.isLoginFailure = false;
	//handle login
	$scope.authenticate = function(valid) {
		if(valid) {
			Users.authenticate($scope.login).then(function(result){
				//if succesfully logged in store token in session storage and redirect to home
				if(result.data.success) {
					console.log(result);
					$sessionStorage.authToken = result.data.token;
					$location.path('/tasks');
				}else { //if login unsuccessful display error message
					$scope.isLoginFailure = true;
					$scope.loginFailure = result.data.msg;
				}
			}, function(err){
				$scope.isLoginFailure = true;
				$scope.loginFailure = err;
			});
			$timeout(function(){
				$scope.isLoginFailure =  false;
			}, 3000);
			$scope.reseLoginForm();
			//reset validations
			$timeout(function() {
      	$scope.loginForm.$setPristine();
      	$scope.loginForm.$setUntouched();
      	$scope.loginForm.$submitted = false;
    	});
		}
	};
	//Reset the login form
	$scope.reseLoginForm = function(){
		$scope.login = angular.copy({});
	}
}

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
