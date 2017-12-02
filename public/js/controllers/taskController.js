var app  = angular.module('tasksApp');

app.controller('taskController', ['$scope', '$routeParams', '$timeout', '$sessionStorage','$location', 'Categories', 'Tasks', taskController]);

function taskController($scope, $routeParams, $timeout, $sessionStorage, $location, Categories, Tasks){

    $scope.task = {};
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
            $scope.tasks.push({title:'Task1', description:'Lorem ipsum'});
        }else{
            displayAlert(result.data.msg);
        }
    }, function(err){
        console.log(err);
    });

    $scope.createTask = function(){

    };

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Tasks.create($scope.formData)

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

        Tasks.delete(id)
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

    var displayAlert = function(message){
        $scope.alerts.alertMessage = message;
        $scope.alerts.isAlert =  true;
        $timeout(function(){
            $scope.alerts.isAlert =  false;
        }, 1500);
    };

}