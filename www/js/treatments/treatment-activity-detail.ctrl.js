(function(){
  'use strict';
  angular.module('app')
    .controller('TreatmentActivityCtrl', TreatmentActivityCtrl);

  function TreatmentActivityCtrl($state, $stateParams, $scope, $window, $ionicScrollDelegate, TreatmentSrv, ionicTimePicker){
    var treatmentId = $stateParams.treatmentId;
    var activityId = $stateParams.activityId;
    var vm = {};
    var now = moment();
    $scope.vm = vm;

    vm.activity = undefined;
    vm.openTimePicker = openTimePicker;
    vm.activityTracking = {
        isAdministered: false,
        administrationDate: now,
        administrationTime: null,
    };
    activate();

    function activate(){
      TreatmentSrv.get(treatmentId).then(function(treatment){
        if(treatment && treatment.activity.length > activityId){
          vm.activity = treatment.activity[activityId];
          vm.activityHistory = [];
          var i;
          for( i=0; i<10; i++ ) {
              var took = Math.random()*2 < 1;
              vm.activityHistory.push( {
                date: moment().subtract(i+1, 'days'),
                time: took ? moment().subtract(i+1, 'hours') : null,
                description: took ? "Took medicine at " : "Did not take medicine"
              });
          }
          $ionicScrollDelegate.resize();
        } else {
          $state.go('app.tabs.treatments');
        }
      });
    }
    
    function openTimePicker(){
        var ipObj1 = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    vm.activityTracking.administrationTime = moment(val*1000);
                }
            },
            inputTime: moment().diff(now.clone().startOf('day'), 'seconds'),   //Optional
            format: 12,         //Optional
            step: 1,           //Optional
            setLabel: 'Set'    //Optional
        };

        ionicTimePicker.openTimePicker(ipObj1);        
    }
  }
})();
