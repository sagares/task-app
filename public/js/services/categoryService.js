angular.module('categoryService', [])
    .factory('Categories', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('/api/categories');
            },
            find: function(id) {
                return $http.get('/api/categories/'+id);
            },
            create: function(category) {
                return $http.post('/api/categories', category)
            },
            delete: function(id){
                return $http.delete('/api/categories/' + id);
            }
        }
    }]);
