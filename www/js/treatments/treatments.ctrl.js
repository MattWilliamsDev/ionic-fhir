( function () {
    'use strict';
    angular.module( 'app' )
        .controller( 'TreatmentsCtrl', TreatmentsCtrl );

    function TreatmentsCtrl ( $scope, $window, $ionicModal, $ionicPopover, $ionicActionSheet, $log, TreatmentSrv ){
        var vm = {};
        $scope.vm = vm;

        vm.isListShowDelete = false;
        vm.isListShowReorder = false;
        vm.treatments = undefined;
        vm.edit = edit;
        vm.share = share;
        vm.refresh = refresh;
        vm.moreOptions = moreOptions;
        vm.showOptions = showOptions;
        vm.listShowDelete = listShowDelete;
        vm.listShowReorder = listShowReorder;
        vm.listHideAll = listHideAll;
        vm.listDelete = listDelete;
        vm.listReorder = listReorder;
        var ui = {};
        activate();

        function activate () {
            refresh()
            TreatmentSrv.getAll().then( function ( treatments ) {
                vm.treatments = treatments;
            });

            $ionicPopover.fromTemplateUrl( 'js/treatments/partials/treatments-options-popover.html', {
                scope: $scope
            }).then( function ( popover ) {
                ui.treatmentsPopover = popover;
            });
            $scope.$on( '$destroy', function () {
                if ( ui.treatmentsPopover ) {
                    ui.treatmentsPopover.remove();
                }
            });
        }

        function edit ( treatment ) {
            $window.alert( 'Edit treatment: ' + treatment.content );
        }

        function share ( treatment ) {
            $window.alert( 'Share treatment: ' + treatment.content );
        }

        function refresh () {
            TreatmentSrv.getAll().then( function ( treatments ) {
                vm.treatments = treatments;
                $scope.$broadcast( 'scroll.refreshComplete' );
            });
        }

        function moreOptions ( treatment ) {
            $ionicActionSheet.show({
                titleText: 'Options for ' + treatment.user + '\'s treatment'
                , buttons: [ { text: 'Share <i class="icon ion-share"></i>' } ]
                , buttonClicked: function ( index ) {
                    if ( index === 0 ) {
                        vm.share( treatment );
                    } else {
                        $log.warn( 'Unknown button index', index );
                    }
                    return true;
                }
                , destructiveText: 'Delete'
                , destructiveButtonClicked: function () {
                    vm.listDelete( vm.treatments, treatment );
                    return true;
                }
                , cancelText: 'Cancel'
                , cancel: function () {}
            });
        }

        function showOptions ( event ) {
            ui.treatmentsPopover.show( event );
        }

        function listShowDelete () {
            vm.isListShowDelete = !vm.isListShowDelete;
            vm.isListShowReorder = false;
            ui.treatmentsPopover.hide();
        }

        function listShowReorder () {
            vm.isListShowDelete = false;
            vm.isListShowReorder = !vm.isListShowReorder;
            ui.treatmentsPopover.hide();
        }

        function listHideAll () {
            vm.isListShowDelete = false;
            vm.isListShowReorder = false;
        }

        function listDelete ( collection, elt ) {
            collection.splice( collection.indexOf( elt ), 1 );
        }

        function listReorder ( collection, elt, fromIndex, toIndex ) {
            collection.splice( fromIndex, 1 );
            collection.splice( toIndex, 0, elt );
        }
    }
})();
