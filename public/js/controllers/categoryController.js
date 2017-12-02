var app  = angular.module('tasksApp');

// this controller handles the category page functions
app.controller('categoryController', ['$scope','$timeout', '$sessionStorage',
	'$location', 'Categories', categoryController]);
function categoryController($scope, $timeout, $sessionStorage, $location, Categories) {
    //Loader settings
	$scope.toggleLoader = false;
    $scope.toggleList = true;

    //Manage all alert messages
    $scope.alerts = {
    	isAlert: false,
		alertMessage: ''
	};

    // GET =====================================================================
    // when landing on the page, get all categories and show them
    // use the service to get all the categories
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

	//ADD =====================================================================
	//add a new category and fetch the new list and render new list
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
                        displayAlert(result.data.msg);
					}
                    $scope.toggleLoader = false;
                    $scope.toggleList = true;
                    $scope.category = angular.copy({});
                });
		}
    };

    //DELETE and REDIRECT ===============================================================
    $scope.event = {
		redirectToTasks: function(self){
			console.log(self);
            $location.path('/tasks/'+self.category._id);
		},
		deleteCategory: function(self, e){
			e.stopPropagation();
            $scope.toggleLoader = true;
            $scope.toggleList = false;
			Categories.delete(self.category._id).then(function(result){
				if(result.data.success) {
					$scope.categories = result.data.categories;
				} else{
					displayAlert(result.data.msg);
				}
                $scope.toggleLoader = false;
                $scope.toggleList = true;
			}, function(err){
				console.log(err);
			});
		}
	}

	//LOGOUT ==========================================================================
	$scope.logout = function(){
		$sessionStorage.authToken = null;
		$location.path('/');
	};

    var displayAlert = function(message){
        $scope.alerts.alertMessage = message;
        $scope.alerts.isAlert =  true;
        $timeout(function(){
            $scope.alerts.isAlert =  false;
        }, 1500);
    };
}
