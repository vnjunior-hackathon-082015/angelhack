(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name inceptionApp.service:clusterpointService
     * @description
     * # clusterpointService
     */
    angular.module('inceptionApp')
      .service('clusterpointService', clusterpointService);

    clusterpointService.$inject = ['$http', '$q', 'commonShareService'];

    function clusterpointService($http, $q, commonShareService) {
        return {
          getAllIdea: getAllIdea
        };

        //==================== Function declaration ====================

        function getAllIdea(id, offset, docs){
          var query;
          if(id){
            query = '<id>' + id + '</id>';
          } else{
            query = '*';
          }
          offset = offset?offset:'10';
          docs = docs?docs:'10';

          var param = {
            "query": query,
            "docs": docs,
            "offset": offset
          }

          var req = {
            method: 'POST',
            url: 'https://api-us.clusterpoint.com/101394/idea/_search.json',
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Basic a3Vyb3JvLmx1eGlmZXJAZ21haWwuY29tOlBAc3N3MHJk',
              "Accept": 'application/json'
            },
            data: param
          };
          return $http(req);
        }
    }

})();





