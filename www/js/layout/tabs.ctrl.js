( function () {
  'use strict';
  angular.module( 'app' )
    .controller( 'TabsCtrl', TabsCtrl );

  function TabsCtrl ( $scope, PushPlugin ) {
    var vm = {};
    $scope.vm = vm;

    vm.notifCount = 0;
    activate();

    function activate () {
    }
  }
})();
