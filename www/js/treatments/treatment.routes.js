( function () {
    'use strict';
    
    angular.module( 'app' )
        .config( configure );

    function configure ( $stateProvider ) {
        $stateProvider
        .state( 'app.tabs.treatments', {
            url: '/treatments',
            views: {
                'treatments-tab': {
                    templateUrl: 'js/treatments/treatments.html',
                    controller: 'TreatmentsCtrl'
                }
            }
        })
        .state( 'app.tabs.treatment', {
            url: '/treatment/:treatmentId',
            views: {
                'treatments-tab': {
                    templateUrl: 'js/treatments/treatment-detail.html',
                    controller: 'TreatmentCtrl'
                }
            }
        });
    }
})();
