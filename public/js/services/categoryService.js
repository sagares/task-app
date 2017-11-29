angular.module('categoryService', [])
    .factory('Categories', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('/api/categories');
            },
            create: function(category) {
                return $http.post('/api/categories', category)
            }
        }
    }]);
