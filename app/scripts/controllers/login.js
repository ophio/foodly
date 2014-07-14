/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ophioFoodly
 */
app.controller('LoginCtrl',
   function ($scope, $location , $firebaseSimpleLogin, $firebase ,OPHIO_CONST, userlogged, OphioLocalStorage) {

        var Logref = new Firebase(OPHIO_CONST.FBURL);
        $scope.auth = $firebaseSimpleLogin(Logref);
        $scope.userInfo = userlogged;
        $scope.login = function(){
          $scope.auth.$login('google', {
        			  rememberMe: true,
        		}).then(function(user){
                  if(checkMembership(user.email, "@ophio.co.in")){
                    userlogged.id = user.id;
                    OphioLocalStorage.setValue(OPHIO_CONST.AUTH_TOKEN,user.accessToken);
                    OphioLocalStorage.setValue(OPHIO_CONST.AUTH_ID,user.id);
                    //$location.path('/main');
                  }else{
                    $scope.auth.$logout();
                    alert('You are not a valid member.');
                  }


          		}), function(error){
          			alert('Error in Login.');
          		};
        };

        $scope.logout = function(){
          auth.logout();
        	$location.path('/login');
        };

        function checkMembership(email, suffix){
          return email.indexOf(suffix, email.length - suffix.length) !== -1;
        }
  });
