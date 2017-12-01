var app  = angular.module('tasksApp');

// inject the Todo service and user service factory into our controller
app.controller('categoryController', ['$scope','$timeout', '$sessionStorage','$location', 'Todos', 'Categories', categoryController]);
function categoryController($scope, $timeout, $sessionStorage, $location, Todos, Categories) {
    $scope.toggleLoader = false;
    $scope.toggleList = true;

    $scope.alerts = {
    	isAlert: false,
		alreadyExists: ''
	};

    Categories.get().then(function(result){
        if(result.data.success) {
            $scope.categories = result.data.categories;
        } else {
            alert('Not authorized. Please Login!');
            $location.path('/');
        }
	}, function(err){
    	console.log(err);
	});

	$scope.category = {};
	$scope.addCategory = function (valid) {
		if(valid) {
            $scope.toggleLoader = true;
            $scope.toggleList = false;
            //call create category method from service
            Categories.create($scope.category)
            // if successful creation, call our get function to get all the new categories
                .then(function(result) {
                	if(result.data.success) {
                        $scope.categories = result.data.categories; // assign our new list of todos
                    } else {
                        $scope.alerts.alreadyExists = result.data.msg;
                        $scope.alerts.isAlert =  true;
                        $timeout(function(){
                            $scope.alerts.isAlert =  false;
                        }, 1500);
					}
                    $scope.toggleLoader = false;
                    $scope.toggleList = true;
                    $scope.category = angular.copy({});
                });
		}
    }

    $scope.event = {
		redirectToTasks: function(){
			console.log('Category block clicked');
		},
		deleteCategory: function(self, e){
			e.stopPropagation();
			console.log(self.category);
			console.log(e);
			console.log('Deleting');
		}
	}
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
