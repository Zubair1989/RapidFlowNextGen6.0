angular.module('starter.controllers', [])


.controller('LoginController', function ($scope, $ionicModal, $timeout, $state, socket) {
   
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

        console.log('Doing login', $scope.loginData);
      //  console.log('Doing login', $scope.loginData.username);
       // console.log('Doing login', $scope.loginData.password);

        var credentials = new Object();
        credentials.userName = $scope.loginData.username;
        credentials.password = $scope.loginData.password;
       
        socket.sendMessage("AuthenticateUser", credentials, $state);

      
       // $state.go('app.playlists');

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
   	
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'LEAVE', id: 1 },
    { title: 'BTR', id: 2 },
    { title: 'EPO', id: 3 },
    { title: 'RPDM', id: 4 },
    { title: 'SNOW', id: 5 },
    { title: 'HR', id: 6 }
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams, $ionicPopover,$state) {
    //var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Process lookups</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    //$scope.popover = $ionicPopover.fromTemplate(template, {
    //    scope: $scope
    //});

    // .fromTemplateUrl() method
    $scope.title = $stateParams.playlistId
    $ionicPopover.fromTemplateUrl('templates/my-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.Lookups = [
   { title: 'Employees', id: 1 },
   { title: 'Departments', id: 2 },
   { title: 'organziations', id: 3 }
    ];
  //  $scope.processid = $stateParams.playlistId;

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    $scope.gotolookup = function (lookupid) {
        $scope.popover.hide();
        $state.go('app.page', { playlistId: $stateParams.playlistId, lookupid: lookupid })
    };
    
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });
})
.controller('LookuplistCtrl', function ($scope,$stateParams) {
    $scope.lookuptitle = $stateParams.lookupid
    
});
