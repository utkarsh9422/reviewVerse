app.controller("restaurantController", [
    '$scope', '$http', 'authentication', '$auth', '$location', 'Upload', '$timeout',
    function($scope, $http, authentication, $auth, $location, Upload, $timeout) {
        $scope.isDisabled = false;
        $scope.getCategories = function() {
            $http({method: 'GET',
                url: getCategories}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.categories = response.data;
                    }, function(response) {
                        $scope.categories = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getCategories();

        //File Upload  or Topic P{ost      
        $scope.uploadPic = function(file) {
            console.log("Entered Controller");
            console.log(file);

            file.upload = Upload.upload({
                url: getTopics,
                data: {name: $scope.newName,
                    description: $scope.newDescription,
                    category: $scope.newCategory,
                    file: file},
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data"

            });

            file.upload.then(function(response) {
                console.log(response);
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                $scope.getTopics();
            });
        }

        //Logout
        $scope.logout = function() {
            console.log("Logout Button Clicked");
            $auth.logout()
                    .then(function() {
                        alert('You have been logged out');
                        $location.path('/login');
                    });
        };

        $scope.getProfile = function() {
            $http({method: 'GET',
                url: getProfile}).
                    then(function(response) {
                        if (response.data.google) {
                            $scope.status = response.status;
                            $scope.username = response.data.google.name;
                            $scope.img = response.data.google.picture;
                        }
                        else if (response.data.facebook) {
                            $scope.status = response.status;
                            $scope.username = response.data.facebook.name;
                            var imgURL = response.data.facebook.picture;
                            $scope.img = response.data.facebook.picture;
                        }
                        else {
                            $scope.status = response.status;
                            $scope.username = response.data.local.name;
                        }
                    }, function(response) {
                        $scope.status = response.status;
                        $scope.username = "Cannot Fetch Username";
                        $scope.img = "Cannot Fetch Profile Picture";
                    });

        };
        $scope.getProfile();
//Get Topics

        $scope.getTopics = function() {
            $http({method: 'GET',
                url: getTopics}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.topics = response.data;
                    }, function(response) {
                        $scope.topics = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getTopics();
//Post Topics


        // NOW UPLOAD THE FILES. Image Upload
        $scope.uploadFiles = function() {
            var formData = new FormData();
            formData.append("name", $scope.newName);
            formData.append("description", $scope.newDescription);
            formData.append("category", $scope.newCategory);

            $scope.getTheFiles = function($files) {
                angular.forEach($files, function(value, key) {
                    formData.append(key, value);
                    consloe.log(key + value);
                });

            };
            console.log(formData);
            var request = {
                method: 'POST',
                url: getTopics,
                data: formData,
                headers: {
                    'Content-Type': undefined
                },
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data"
            };

            // SEND THE FILES.
            $http(request)
                    .success(function(response, request) {
                        console.log(response);
                        console.log(request);
                    })
                    .error(function(response, request) {
                        console.log(response);
                        console.log(request);
                    });
        };

//Get Reviews
        $scope.getReviews = function() {
            $http({method: 'GET', url: getReviews}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.reviews = response.data;
                    }, function(response) {
                        $scope.reviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getReviews();
//Add Review
        $scope.addReview = function(topicId, newReview, reviewRating) {
            var data = {
                body: newReview,
                ownerTopicId: topicId,
                authorId: "User Name",
                rating: reviewRating
            };
            var url = getTopics.concat(topicId, "/reviews/");
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http.post(url, data, config)
                    .success(function(response) {
                        alert("Review Posted");
                        $scope.getReviews();
                    }).error(function(response) {
                alert("Failure");
            });
        };
//Topic Upvote          
        $scope.incrementUpvotes = function(topicId) {
            $http({method: 'PUT',
                url: getTopics.concat(topicId, "/upvote"),
                "async": true,
                "crossDomain": true,
            }).
                    then(function(response) {
                        console.log(response);
                        var hasLiked = false;
                        if (!hasLiked) {
                            hasLiked = true;
                            $scope.liked = 'Unlike';
                            topic.upvotes++;
                        } else {
                            hasLiked = false;
                            $scope.liked = 'Like';
                            topic.upvotes--;
                        }            
                    }, function(response) {
                        console.log(error);
                    });
        };
//Review Upvote
        $scope.incrementReviewUpvotes = function(reviewId) {
            $http({method: 'PUT',
                url: getReviews.concat(reviewId, "/upvote"),
                "async": true,
                "crossDomain": true,
            }).
                    then(function(response) {
                        console.log(response);
                        review.upvotes++;
                    }, function(response) {
                        console.log(error);
                    });
        };

        $scope.IsHidden = true;
        $scope.ShowHide = function() {
            //If DIV is hidden it will be visible and vice versa.
            $scope.IsHidden = $scope.IsHidden ? false : true;
        };
        $scope.reviewRating = {rating: 1};
    }]
        ).directive("starRating", function() {
    return {
        restrict: "EA",
        template: "<ul class='rating' ng-class='{readonly: readonly}'>" +
                "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                "    <i class='fa fa-star'></i>" + //&#9733
                "  </li>" +
                "</ul>",
        scope: {
            ratingValue: "=ngModel",
            max: "=?", //optional: default is 5
            onRatingSelected: "&?",
            readonly: "=?"
        },
        link: function(scope, elem, attrs) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: (i < scope.ratingValue.rating)
                    });
                }
            }
            ;
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false) {
                    scope.ratingValue.rating = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.rating", function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
}).directive("averageStarRating", function() {
    return {
        restrict: "EA",
        template: "<div class='average-rating-container'>" +
                "  <ul class='rating background' class='readonly'>" +
                "    <li ng-repeat='star in stars' class='star'>" +
                "      <i class='fa fa-star'></i>" + //&#9733
                "    </li>" +
                "  </ul>" +
                "  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>" +
                "    <li ng-repeat='star in stars' class='star filled'>" +
                "      <i class='fa fa-star'></i>" + //&#9733
                "    </li>" +
                "  </ul>" +
                "</div>",
        scope: {
            averageRatingValue: "=ngModel",
            max: "=?", //optional: default is 5
        },
        link: function(scope, elem, attrs) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 100; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            ;
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
}).directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                    .success(function() {
                    })
                    .error(function() {
                    });
        };
    }]);