angular.module('userService', [])

	// super simple service
	// each function returns a promise object
	.factory('Users', ['$http',function($http) {
		return {
			create : function(userData) {
				return $http.post('/api/signup', userData);
			}
		}
	}]);
