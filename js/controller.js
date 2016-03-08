"use strict";

var app = angular.module("timeSheetApp", ["ngRoute"]);

//App Configs
function appConfig($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'form.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}

appConfig.$inject = ["$routeProvider"];

//Controller used by the login form
function formController($scope, $timeout, $location) {
  //set the default type value
  $scope.type = 1;

  //handle for resetting the form
  $scope.clear = function() {
    $scope.submissionForm.$setPristine();
    $scope.email = "";
    $scope.time = "";
    $scope.message = "";
    $scope.type = "1";
  },

  //handler for submitting the form
  $scope.submit = function() {
    $scope.isLoading = true;
    $timeout(function(){
      $scope.isLoading = false;
      $scope.isConfirmed = true;
    }, 1000);
  },

  //handler for start over the flow
  $scope.startOver = function() {
    $scope.clear();
    $scope.isConfirmed = false;
  }
}

formController.$inject = ["$scope", "$timeout", "$location"];

//Inject the parameters separately so the arguments will not be minified.
app.config(appConfig);
app.controller("formController", formController);

//Validator for the time string
app.directive('validateTime', function (){
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {

          //For DOM -> model validation
          ngModel.$parsers.unshift(function(value) {

             var timeStrings = value.split(" ");
             var valid = true;

             //the timeStrings array should be even
             if(timeStrings.length % 2 !== 0) {
               valid = false;
             }

             else {
               //Check to see if there's an entry for hours
               for(var i = 0; i < timeStrings.length; i++)
               {
                 var timeString = timeStrings[i];

                 // the first and third entry should always be a number
                 if(i === 0 || i === 2)
                 {
                   var number = parseInt(timeString);
                   if(number === NaN)
                   {
                     valid = false;
                     break;
                   }
                 }

                 //the second entry can be hours or minute
                 else if(i === 1)
                 {
                   if(timeString.toLowerCase() !== "hour" && timeString.toLowerCase() !== "hours" && timeString.toLowerCase() !== "h" &&
                      timeString.toLowerCase() !== "minute" && timeString.toLowerCase() !== "minutes" && timeString.toLowerCase() !== "m")
                      {
                        valid = false;
                        break;
                      }
                 }

                 //the fourth entry has to be minute
                 else if(i === 3)
                 {
                   if(timeString.toLowerCase() !== "minute" && timeString.toLowerCase() !== "minutes" && timeString.toLowerCase() !== "m")
                   {
                     valid = false;
                     break;
                   }
                 }
               }
             }

             ngModel.$setValidity('invalidTimeString', valid);
             return valid ? value : undefined;
          });
      }
   };
});
