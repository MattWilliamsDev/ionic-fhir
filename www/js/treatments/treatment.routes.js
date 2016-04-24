(function(){
  'use strict';
  angular.module('app')
    .config(configure);

  function configure($stateProvider){
    $stateProvider
    .state('app.tabs.treatments', {
      url: '/treatments',
      views: {
        'treatments-tab': {
          templateUrl: 'js/treatments/treatments.html',
          controller: 'TreatmentsCtrl'
        }
      }
    }).state('app.tabs.treatment-activity', {
      url: '/treatment/:treatmentId/activity/:activityId',
      views: {
        'treatments-tab': {
          templateUrl: 'js/treatments/treatment-activity-detail.html',
          controller: 'TreatmentActivityCtrl'
        }
      }
    });
  }
})();
