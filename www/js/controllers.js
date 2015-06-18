 var db =null;
angular.module('starter.controllers', [])

//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : Login controller for USER DOMAIN LOGIN
//*****************************************************************************
.controller('DomainLoginCtrl', function($scope, $ionicPopup, $state, $http,$cordovaSQLite) { 
    $scope.data = {};
    //default it is check for database for user 
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {  
        if (window.cordova && window.SQLitePlugin) {

          // App syntax
          db = $cordovaSQLite.openDB("antflow2.db",1);
          
        
        db.transaction(populatedb,errdb,sucdb);  
      
        function populatedb(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS user_domain (id integer primary key,username text,password text,domain text,fullname text,dateOfBirth text,gender text,religion text,prof_pic_url text, user_id integer)");
            
            return true;
        }
        function errdb(tx){
            console.log(tx);
        }
        function sucdb(tx){
            console.log(tx);
        }
        
        db.transaction(function (tx) {
        
        tx.executeSql('SELECT * FROM user_domain', [], function (tx, results) {

            alert(results.rows[0].username);
            if(results.rows.length===0){

                  
            }else{
                
                   $state.go('login');
            }


            }, null);
         });
       }  
    } 
        
    if(!(window.cordova) && !(window.SQLitePlugin)) {
       
        // Ionic serve syntax
        db = window.openDatabase("antflow2.db", "1.0", "antflow app1", 20000);

        db.transaction(function (tx) {
        
        tx.executeSql('SELECT * FROM user_domain', [], function (tx, results) {

          
            if(results.rows.length===0){

                  
            }else{
               
                   $state.go('login');
            }


            }, null);
         });  
         
    }
     
    
    // Developer : GAMAGE NC
    // Date : 2015-05-28  
    $scope.domain_login = function() {
        alert($scope.data.domain);
        if (window.cordova && window.SQLitePlugin) {
           
           // App syntax
           db = $cordovaSQLite.openDB("antflow2.db",1);

        } else {
            
           // Ionic serve syntax
           db = window.openDatabase("antflow2.db", "1.0", "antflow app1", 20000);

        }  
        
                    // antflow GET request user auth :
                    $http({ method:'GET', 
                            url:'http://'+$scope.data.domain+'/api_services/auth/get', params:{uname: $scope.data.username, pword: $scope.data.password}
                           
                    }).
                     success(function(data, status, headers, config) {
                          console.log(data);
                        
                        
                       if(data.length===1){

                        db.transaction(function(tx){insertdomain(tx,$scope.data.username,$scope.data.password,$scope.data.domain)},errdb,sucdb);

                        function insertdomain(tx,username,passwrd,domain){

                            tx.executeSql("INSERT INTO user_domain(username,password,domain,fullname,dateOfBirth,gender,religion,prof_pic_url,user_id)values ('"+username+"','"+data[0].passwrd+"','"+domain+"','"+data[0].fullname+"','"+data[0].date_of_birth+"','"+data[0].gender+"','"+data[0].religion+"','"+data[0].profile_pic_url+"','"+data[0].id+"')");

                        }
                        function errdb(tx){
                            console.log(tx);
                        }
                        function sucdb(tx){
                             
                             // Put the object into storage
                             window.localStorage.setItem("User_domain",JSON.stringify(data)); 
                             // Put the object into storage
                             window.localStorage.setItem("User_domain.domain",JSON.stringify($scope.data.domain)); 
                             
                             $state.go('tab.dash');
                        }

                        
                        }else{

                        var alertPopup = $ionicPopup.alert({
                         title: 'Authentication failed!',
                         template: 'Please check your credentials!'
                         });
                       }
                      
                     }).
                     error(function(data, status, headers, config) {
                      var alertPopup = $ionicPopup.alert({
                        title: 'Domain Failed!',
                        template: 'Please check your Domain Name!'
                        });
                     });
                    
          
        }
})
// End of Login Controller

//*****************************************************************************
// Developer : Oshan Mujithafa
// Date : 2015-05-26
// Description : Login controller for USER LOGIN
//*****************************************************************************

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state,$cordovaSQLite) {

    $scope.data = {};
    // var result = localStorageFor.getstorage(); 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
// End of Login Controller
//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : DASH controller for USER LOGIN
//*****************************************************************************
.controller('DashCtrl', function($scope,$http,$ionicPopup,$cordovaCalendar) {
   //window.localStorage.removeItem("reminders"); 
  // window.localStorage.removeItem("Notification"); 
 //make json object
 var user_domain_local = JSON.parse(window.localStorage.getItem("User_domain.domain"));
 //make json object
 var user_details = JSON.parse(window.localStorage.getItem("User_domain"));
 var user_id = user_details[0].id;
 console.log(user_details);
 
//------------------------------------------------------------------------------
 // Simple GET request reminder details :
 $http.get('http://'+user_domain_local+'/api_services/reminder/get', {
        params: {
            remort_user_id: user_id
        }
     }).
  success(function(data, status, headers, config) {
    
     // Put the object into storage
     window.localStorage.setItem("reminders",JSON.stringify(data));  
    
    
  }).
  error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
                title: ' Failed to Access!',
                template: 'Check your internet connection!'
            });
  });
  
//------------------------------------------------------------------------------  
  // Simple GET request notification :
 $http.get('http://'+user_domain_local+'/api_services/notification/get', {
        params: {
            remort_user_id: user_id           
        }
     }).
  success(function(data, status, headers, config) {
    
     //console.log(data);
     // Put the object into storage
     window.localStorage.setItem("Notification",JSON.stringify(data));  
    
    
  }).
  error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
                title: ' Failed to Access!',
                template: 'Check your internet connection!'
            });
  });
//------------------------------------------------------------------------------

 // Simple GET request dashboard :
 $http.get('http://'+user_domain_local+'/api_services/dashboard/get', {
        params: {
            remort_user_id: user_id           
        }
     }).
  success(function(data, status, headers, config) {
    
     console.log(data);
     // Put the object into storage
     window.localStorage.setItem("Dashboard",JSON.stringify(data));  
    
      }).
  error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
                title: ' Failed to Access!',
                template: 'Check your internet connection!'
            });
  });
// Simple GET request notification :
 $http.get('http://'+user_domain_local+'/api_services/user/get').
  success(function(data, status, headers, config) {
    
     alert(data);
     
    
  }).
  error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
                title: ' Failed to Access!',
                template: 'daaaahha!'
            });
  });
//------------------------------------------------------------------------------

 //make json object
 var localData_dashboard = JSON.parse(window.localStorage.getItem("Dashboard"));
 
 var in_progress=[];
 if(localData_dashboard.in_progress_activities!==null){
    
     for (var i = 0; i <= localData_dashboard.in_progress_activities.length-1; i++){
         
        in_progress .push ({
                            title: localData_dashboard.in_progress_activities[i].activity_name,
                            date: localData_dashboard.in_progress_activities[i].start_date
                           
                     }  );
                 }
  }
 
$scope.in_progress_tome = in_progress;

var meetings=[];
if(localData_dashboard.scheduled_meetings!==null){
  
     for (var i = 0; i <= localData_dashboard.scheduled_meetings.length-1; i++){
         
        meetings .push ({
                            title1: localData_dashboard.scheduled_meetings[i].meeting_topic,
                            date1: localData_dashboard.scheduled_meetings[i].meeting_date
                           
                     }  );
                 }
  }
 
$scope.meetings = meetings;

var overdue=[];
if(localData_dashboard.overdue_activities!==null){

     for (var i = 0; i <= localData_dashboard.overdue_activities.length-1; i++){
         
        overdue .push ({
                            title2: localData_dashboard.overdue_activities[i].activity_name,
                            date2: localData_dashboard.overdue_activities[i].start_date
                           
                     }  );
                 }
  }
 
$scope.overdues = overdue;

var not_started=[];
if(localData_dashboard.not_started_activities!==null){
   
     for (var i = 0; i <= localData_dashboard.not_started_activities.length-1; i++){
         
        not_started .push ({
                            title3: localData_dashboard.not_started_activities[i].activity_name,
                            date3: localData_dashboard.not_started_activities[i].start_date
                           
                     }  );
                 }
  }
 
$scope.not_starteds = not_started;

})

//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : ChatsCtrl controller for USER LOGIN
//*****************************************************************************
.controller('ChatsCtrl', function($scope, Chats) {
    
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : ChatsCtrl controller for USER LOGIN
//*****************************************************************************
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : ChatsCtrl controller for USER LOGIN
//*****************************************************************************
.controller('AccountCtrl', function($scope) {
    
 //make json object
 var user_details = JSON.parse(window.localStorage.getItem("User_domain"));

                $scope.fullname = user_details[0].fullname;
                $scope.username = user_details[0].username;
                $scope.dateb = user_details[0].date_of_birth;
 
})
//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : ChatsCtrl controller for USER LOGIN
//*****************************************************************************
.controller('ReminCtrl', function($scope,Reminds) {

    $scope.reminds = Reminds.all();  
   
    $scope.remove = function(remind) {
    Reminds.remove(remind);
    };
    
  
})
//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : ChatsCtrl controller for USER LOGIN
//*****************************************************************************
.controller('RemindDetailCtrl', function($scope, $stateParams, Reminds) {
  $scope.remind = Reminds.get($stateParams.remindId);
});


function MyCtrl($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}
