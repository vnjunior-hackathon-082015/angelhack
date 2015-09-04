 'use strict';

 angular.module('inceptionApp')
 .controller('MindmapController', [ '$scope' , function ($scope) {

    $scope.root = null;
    $scope.fileName = "mindMap";

    d3.json("assets/data_mindmap01.json", function(json) {
      $scope.json = json;
      $scope.$apply();
    });

    function serializeData(source){
        var json = {};
        json.name = source.name;
        var children = source.children || source._children;
        var childList = [];
        if(children){
            children.forEach(function(node){
                childList.push(serializeData(node));
            });
            json.children = childList;
        }
        return json;
    }


    $scope.new = function(){
        $scope.json =
            {
            "name" : "root"
        };
    }

    $scope.load = function(file){
        var reader = new FileReader();
        reader.onload = function(event){
        var contents = event.target.result;
        //console.log(JSON.parse(contents));
        $scope.json = JSON.parse(contents);
        $scope.$apply();
        }
        reader.readAsText(file);
    }

    $scope.save = function(){
        var saveData = serializeData($scope.root);
        // window.open("data:text/json;charset=utf-8," + escape(JSON.stringify(saveData)));
        var MIME_TYPE = 'application/json';
      var bb = new Blob([JSON.stringify(saveData)], {type: MIME_TYPE});

    var a = document.createElement('a');
    a.download = $scope.fileName + ".json";
    a.href = window.URL.createObjectURL(bb);
    a.textContent = '點擊下載';

    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    document.querySelectorAll("#downloadLinkWrap")[0].innerHTML = "";
     document.querySelectorAll("#downloadLinkWrap")[0].appendChild(a);
    }

 }]);

 // angular.module('inceptionApp')
 // .directive('changeFile', function(){
 //     return {
 //         scope: {
 //             changeFunction: '=changeFile'
 //         },
 //         link: function(scope, el, attrs){
 //             el.bind('change', function(event){
 //                 var files = event.target.files;
 //                 var file = files[0];
 //                 scope.changeFunction(file);
 //             });
 //         }
 //     };
 // });
