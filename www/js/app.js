// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Database instance.
var db;var user_exit = false;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform,$ionicPopup,$cordovaSQLite,$location,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
     //function will be called when device ready
       if (window.cordova && window.SQLitePlugin) {
            
          // App syntax
          db = $cordovaSQLite.openDB("antflow2.db",1);
        
        } else {
            
          // Ionic serve syntax
          db = window.openDatabase("antflow2.db", "1.0", "antflow app1", 20000);
          
        }
     
    db.transaction(populatedb,errdb,sucdb);  
      
    function populatedb(tx){
       
        tx.executeSql("CREATE TABLE IF NOT EXISTS user_domain (id integer primary key,username text,password text,domain text,fullname text,dateOfBirth text,gender text,religion text,prof_pic_url text, user_id integer)");
        console.log(tx);
        return true;
    }
    function errdb(tx){
        console.log(tx);
    }
     function sucdb(tx){
           console.log(tx);
     }
    
      
  //checking for internet connection   
    if(window.Connection) {

        if(navigator.connection.type == Connection.NONE) {
           var alertPopup = $ionicPopup.alert({
                title: 'Connection Failed!',
                template: 'There is no internet connection available!'
                });
           
            }else{
               // alert(navigator.connection.type);
            }
    }else{
       //  alert('Cannot find Window.Connection');
    }
    $location.path('/domain-login');
    $rootScope.$apply();
    
  });
  //---------------------------------------------------------------------------
  
  
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  //*****************************************************************************
// Developer : Oshan Mujithafa
// Date : 2015-05-26
// Description : User Login (App.js)
//*****************************************************************************

    .state('domain-login', {
      url: '/domain-login',
      templateUrl: 'templates/domain-login.html',
      controller: 'DomainLoginCtrl'
  })
// End of login state ...  
  
//*****************************************************************************
// Developer : Oshan Mujithafa
// Date : 2015-05-26
// Description : User Login (App.js)
//*****************************************************************************

   .state('antflow', {
      url: '/antflow',
      templateUrl: 'templates/antflow.html',
      controller: 'LoginCtrl'
  })



    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
// End of login state ...  

  
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.reminds', {
    url: '/reminds',
    views: {
      'tab-reminds': {
        templateUrl: 'templates/tab-reminds.html',
        controller: 'ReminCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('tab.remind-detail', {
      url: '/reminds/:remindId',
      views: {
        'tab-reminds': {
          templateUrl: 'templates/remind-detail.html',
          controller: 'RemindDetailCtrl'
        }
      }
    }); 
               ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/domain-login');
 
       
});

       
      
    
