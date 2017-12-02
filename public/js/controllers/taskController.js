var app  = angular.module('tasksApp');

app.controller('taskController', ['$scope', '$routeParams', '$timeout', '$sessionStorage','$location', 'Categories', 'Tasks', taskController]);

function taskController($scope, $routeParams, $timeout, $sessionStorage, $location, Categories, Tasks){

    $scope.task = {
        categoryId: $routeParams.id
    };
    $scope.toggleLoader = false;
    $scope.toggleTasks = true;

    //Manage all alert messages
    $scope.alerts = {
        isAlert: false,
        alertMessage: ''
    };

    // GET =====================================================================
    // when landing on the page, get all tasks by category and show them
    // use the service to get all the tasks
    Categories.find($routeParams.id).then(function(result){
        if(result.data.success){
            $scope.categoryName = result.data.category.title;
            $scope.tasks = result.data.category.tasks;
        }else{
            displayAlert(result.data.msg);
        }
    }, function(err){
        console.log(err);
    });

    // CREATE ==================================================================
    // create task into a category and save it
    $scope.createTask = function(){
        $scope.toggleLoader = true;
        $scope.toggleList = false;
        Tasks.create($scope.task).then(function(result){
           if(result.data.success){
               $scope.tasks = result.data.tasks;
           } else {
               displayAlert(result.data.msg);
           }
           $scope.toggleLoader = false;
           $scope.toggleList = true;
        });
        $scope.task = angular.copy({categoryId: $routeParams.id});
    };


    // DELETE ==================================================================
    // delete a task after checking it
    $scope.deleteTodo = function(self) {
        debugger;
        $scope.toggleLoader = true;
        $scope.toggleList = false;

        Tasks.delete(self.task._id, $routeParams.id)
            .then(function(result) {
                if(result.data.success){
                    $scope.tasks = result.data.tasks;
                } else {
                    displayAlert(result.data.msg);
                }
                $scope.toggleLoader = false;
                $scope.toggleList = true;
            });
    };

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