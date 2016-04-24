(function(){
  'use strict';
  angular.module('app')
    .controller('TreatmentActivityCtrl', TreatmentActivityCtrl);

  function TreatmentActivityCtrl($state, $stateParams, $scope, $window, TreatmentSrv){
    var treatmentId = $stateParams.treatmentId;
    var activityId = $stateParams.activityId;
    var vm = {};
    $scope.vm = vm;

    vm.treatment = undefined;
    activate();

    function activate(){
      TreatmentSrv.get(treatmentId).then(function(treatment){
        if(treatment && treatment.activity.length > activityId){
          vm.activity = treatment.activity[activityId];
        } else {
          $state.go('app.tabs.treatments');
        }
      });
    }
  }
})();
