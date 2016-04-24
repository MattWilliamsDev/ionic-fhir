(function(){
  'use strict';
  angular.module('app')
    .controller('NotificationsCtrl', NotificationsCtrl);

  function NotificationsCtrl($scope, TreatmentSrv, ToastPlugin){
    var vm = {};
    $scope.vm = vm;

    vm.push = {title: '', message: ''};
    vm.notifications = [];
    activate();

    function activate(){
        
        TreatmentSrv.getAll().then( function ( treatments ) {
            vm.treatments = treatments;
            $scope.$broadcast( 'scroll.refreshComplete' );
        });
    }
  }
})();
