(function(){
  'use strict';
  angular.module('app')
    .factory('TreatmentSrv', TreatmentSrv);

  // This is a dummy service to use in demo...
  TreatmentSrv.$inject = ['$http', '$q', '$timeout', 'Utils', 'Config', '_'];
  function TreatmentSrv($http, $q, $timeout, Utils, Config, _){
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
        return $http.get(Config.backendUrl+'/treatments.json').then(function(res){
          cachedTreatments = res.data;
          return angular.copy(cachedTreatments);
        });
      }
    }

    function get(id){
      return getAll().then(function(treatments){
        return _.find(treatments, {id: id});
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
