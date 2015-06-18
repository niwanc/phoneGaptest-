angular.module('starter.services', [])

//*****************************************************************************
// Developer : Oshan Mujithafa
// Date : 2015-05-26
// Description : Login Service for USER LOGIN
//*****************************************************************************
.factory('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            
        //make json object
        var user_details = JSON.parse(window.localStorage.getItem("User_domain"));
        var user_id = user_details[0].id;
       
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name === user_details[0].username && pw === user_details[0].username) {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
// End of Login service
//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : Notification Service 
//*****************************************************************************
.factory('Chats', function() {
 //make json object
 var localData = JSON.parse(window.localStorage.getItem("Notification"));
 console.log(localData);
 if(localData!==null){
    var chats=[];
     for (var i = 0; i <= localData.length-1; i++){
        chats .push ({
                            id: i,
                            name: localData[i].notification_type,
                            description :localData[i].discription,
                            lastText: localData[i].notification_date,
                            notification: localData[i].notification_item,
                            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'

                     }  );
                 }
  }
  

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : reminder Service 
//*****************************************************************************
.factory('Reminds', function() {

 //make json object
 var localData_reminder = JSON.parse(window.localStorage.getItem("reminders"));
 
 if(localData_reminder!==null){
    var reminds=[];
     for (var i = 0; i <= localData_reminder.length-1; i++){
        reminds .push ({
                            id: i,
                            name: localData_reminder[i].reminder,
                            lastText: localData_reminder[i].date+'-'+localData_reminder[i].time,
                            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'

                     }  );
                 }
  }
  
  return {
    all: function() {
     
      return reminds;
    },
    remove: function(remind) {
      reminds.splice(reminds.indexOf(remind), 1);
    },
    get: function(remindId) {
      for (var i = 0; i < reminds.length; i++) {
        if (reminds[i].id === parseInt(remindId)) {
          return reminds[i];
        }
      }
      return null;
    }

  };
})// End of Reminder service

//*****************************************************************************
// Developer : GAMAGE NC
// Date : 2015-05-26
// Description : dash Service 
//*****************************************************************************
.factory('Dashboards', function() {

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



        var meetings=[];
        if(localData_dashboard.scheduled_meetings!==null){

            for (var i = 0; i <= localData_dashboard.scheduled_meetings.length-1; i++){

               meetings .push ({
                                   title1: localData_dashboard.scheduled_meetings[i].meeting_topic,
                                   date1: localData_dashboard.scheduled_meetings[i].meeting_date

                            }  );
                        }
        }



        var overdue=[];
        if(localData_dashboard.overdue_activities!==null){

            for (var i = 0; i <= localData_dashboard.overdue_activities.length-1; i++){

               overdue .push ({
                                   title2: localData_dashboard.overdue_activities[i].activity_name,
                                   date2: localData_dashboard.overdue_activities[i].start_date

                            }  );
                        }
        }



        var not_started=[];
        if(localData_dashboard.not_started_activities!==null){

            for (var i = 0; i <= localData_dashboard.not_started_activities.length-1; i++){

               not_started .push ({
                                   title3: localData_dashboard.not_started_activities[i].activity_name,
                                   date3: localData_dashboard.not_started_activities[i].start_date

                            }  );
                        }
        }



         return {
           inprogress: function() {

             return in_progress;
           },
           meeting: function() {

             return meetings;
           },
           overduefun: function() {

             return overdue;
           },
           notStarted: function() {

             return not_started;
           }


        };
})// End of Reminder service

