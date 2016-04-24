(function(){
  'use strict';
  angular.module('app')
    .factory('TreatmentSrv', TreatmentSrv);

  // This is a dummy service to use in demo...
  TreatmentSrv.$inject = ['$http', '$q', '$timeout', 'Utils', 'Config', '_'];
  function TreatmentSrv($http, $q, $timeout, Utils, Config, _){
    var medData = undefined;
    var cachedTreatments = undefined;
    var service = {
      getAll: getAll,
      get: get,
      save: save
    };
    return service;

    function getAll(){
      if(cachedTreatments){
        cachedTreatments.unshift(createRandomTreatment());
        return $q.when(angular.copy(cachedTreatments));
      } else {
	    var requestOptions = {
		  headers: {
		    Accept: 'application/json'
		  }
		};
        return $http.get(Config.backendUrl+'/MedicationOrder?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB', requestOptions).then(function(res){
		  medData = res.data;
		  var tp = {};
		  tp.id = "1";
		  tp.patientId = "1";
		  tp.subject = "Diabetes"
		  medData = treatmentData.entry.map(function(entry){
			var order = {};
		    order.dateWritten = entry.resource.dateWritten;
		    order.status = entry.resource.status;
		    order.patient = entry.resource.patient.display;
		    order.prescriber = entry.resource.patient.display;
		    order.medication = entry.resource.medicationReference.display;
		    order.dispenseRequest = entry.resource.dispenseRequest;
		    order.dosageInstruction = entry.resource.dosageInstruction;
		    order.substition = "t"//entry.resource.substition.type.coding.code === 'N' ? true : false;
		  });
		  tp.medications = medData;
          cachedTreatments = tp;
          return angular.copy(cachedTreatments);
        });
      }
    }

    function get(id){
      return getAll().then(function(treatments){
        return _.find(treatments, {patientId: id});
      });
    }

    function save(treatment){
      return asyncTmp(function(){
        var newTreatment = {};
        newTreatment.id = Utils.createUuid();
        newTreatment.user = treatment.user;
        newTreatment.avatar = 'http://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png';
        newTreatment.content = twitt.content;
        cachedTreatments.unshift(newTreatments);
        return angular.copy(newTreatment);
      });
    }

    function createRandomTreatment(){
      var newTreatment = angular.copy(cachedTreatments[Math.floor(Math.random() * cachedTreatments.length)]);
      newTreatment.id = Utils.createUuid();
      return newTreatment;
    }

    function asyncTmp(fn){
      var defer = $q.defer();
      $timeout(function(){
        defer.resolve(fn());
      }, 500);
      return defer.promise;
    }
  }
})();
