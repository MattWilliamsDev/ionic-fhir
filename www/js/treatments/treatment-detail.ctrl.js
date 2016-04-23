(function(){
  'use strict';
  angular.module('app')
    .controller('TreatmentCtrl', TreatmentCtrl);

  function TreatmentCtrl($state, $stateParams, $scope, $window, TreatmentSrv){
    var treatmentId = $stateParams.treatmentId;
    var vm = {};
    $scope.vm = vm;

    vm.treatment = undefined;
    activate();

    function activate(){
      TreatmentSrv.get(treatmentId).then(function(treatment){
        if(treatment){
          vm.treatment = treatment;
        } else {
          $state.go('app.tabs.treatments');
        }
      });
    }
  }
})();
