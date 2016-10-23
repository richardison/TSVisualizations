'use strict';

angular.module('klipfolioFrontEndApp').factory('Backend', function($rootScope, $http){

  var BASE_URL = 'http://localhost:8080/data/';

  var graphData = [];
  var sourceData = [];

  var Auth = {

    // Get da defaults
    getDefaultData: function(){
      // Return the $http promise not the data
      return $http.get(BASE_URL + 'github/commit?start=1475419531&end=1476543246&interval=1d')
        .catch(function(error){
          console.log('ERROR: Unable to fetch the default data: ' + error.message);
        });
    },

    getDataFromQuery: function(datasource, measurement, start, end, intervalUnit, intervalType ){
      return $http.get(BASE_URL + datasource  + '/'+ measurement + '?start=' + start+ '&end=' + end + '&interval=' +intervalUnit+intervalType)
        .then(function(res){
          // Save the graph to the factory so it can be used in other controllers
          graphData = [];
          graphData = res;
        })
        .catch(function(error){
          console.log('ERROR: Unable to fetch the query data: ' + error.message);
        });
    },

    getAvailableSourcesData: function(){
        return $http.get(BASE_URL)
          .then(function(res){
            sourceData = [];
            sourceData = res;
          })
          .catch(function(error){
            console.log('ERROR: Unable to fetch available sources: ' + error.message);
          });
    },

    getAvailableSources: function(){
      return sourceData;
    },

    // For controller 2 controller data
    getGraphData: function(){
      return graphData;
    },



    // PubSubs
    // TODO: Create PubSub Service
    subscribeSources: function(scope, callback){
      var handler = $rootScope.$on('backend:getAvailableSources', callback);
      scope.$on('$destroy', handler);
    },

    notifySources: function(){
      $rootScope.$emit('backend:getAvailableSources');
    },

    subscribe: function(scope, callback){
      var handler = $rootScope.$on('backend:getGraphData', callback);
      scope.$on('$destroy', handler);
    },

    notify: function(){
      $rootScope.$emit('backend:getGraphData');
    }


  };
  return Auth;
});
