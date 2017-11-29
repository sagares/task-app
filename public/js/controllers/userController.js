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
					$sessionStorage.authToken = result.data.token;
					$location.path('/category');
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
};
