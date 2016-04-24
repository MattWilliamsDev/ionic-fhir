(function(){
  'use strict';
  angular.module('app')
    .factory('TreatmentSrv', TreatmentSrv);

  // This is a dummy service to use in demo...
  TreatmentSrv.$inject = ['$http', '$q', '$timeout', 'Utils', 'Config', '_'];
  function TreatmentSrv($http, $q, $timeout, Utils, Config, _){
    var treatmentData = undefined;
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
        return $http.get(Config.backendUrl+'/CarePlan?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB', requestOptions).then(function(res){
		  treatmentData = res.data;
		  treatmentData = treatmentData.entry.map(function(entry){
		    var cp = {};
		    cp.id = entry.resource.id;
		    cp.patientId = "1";
		    cp.subject = entry.resource.subject.display;
		    cp.activity = entry.resource.activity;
		    cp.activity.map(function(activity){
			  activity.name = activity.detail.category.text;
			  activity.type = 'Medication'
			  if (activity.detail.code){
			    activity.description = activity.detail.code.text;
			  }
			  return activity;
			});
		    return cp;
		  });
		  console.log(treatmentData)
          cachedTreatments = treatmentData;
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
