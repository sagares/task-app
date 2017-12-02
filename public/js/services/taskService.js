angular.module('taskService', [])

// super simple service
// each function returns a promise object
    .factory('Tasks', ['$http', function ($http) {
        return {
            create: function (task) {
                return $http.post('/api/tasks', task);
            },
            delete: function (id, categoryId) {
                return $http.delete('/api/tasks/' + categoryId+"/"+id);
            }
        }
    }]);
