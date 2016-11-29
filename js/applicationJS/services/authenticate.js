(function() {

    angular
            .module('gascoApp')
            .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication($http, $window) {

        var saveToken = function(token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        register = function(user) {
            var headers = {'Content-Type': 'application/json'};
            return $http.post('http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/signup', user, headers).success(function(data) {
                saveToken(data.token);
            });
        };

        login = function(user) {
            var headers = {'Content-Type': 'application/json'};
            return $http.post('http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/login', user, headers).success(function(data) {
                saveToken(data.token);
            });
        };
        
         var getjwtToken = function() {
             var str1 = "JWT ";
             var str2 =getToken();
            return str1.concat(str2);
        }; 

        
        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

//        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
//                return {
//                    'request': function(config) {
//                        config.headers = config.headers || {};
//                        if ($localStorage.token) {
//                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                        }
//                        return config;
//                    },
//                    'responseError': function(response) {
//                        if (response.status === 401 || response.status === 403) {
//                            $location.path('/signin');
//                        }
//                        return $q.reject(response);
//                    }
//                };
//            }]);

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            getjwtToken: getjwtToken,
            logout: logout
        };
    }


})();