var app = angular.module('WikipediaViewer', ['ngAnimate']);

app.controller('MainCtrl', function($scope, $http, $timeout) {
  var input = $('#text');
  $scope.lang = 'en';

  $scope.results = [];
  $scope.search = function() {
    $scope.results = [];

    var inputTitle = input.val();
    var api = 'http://' + $scope.lang + '.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var callback = '&callback=JSON_CALLBACK';
    var page = 'http://' + $scope.lang + '.wikipedia.org/?curid=';

    $http.jsonp(api + inputTitle + callback)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(obj,id)  {
        if(typeof obj.thumbnail != "undefined") {
          $scope.results.push({title: obj.title, body: obj.extract, page: page + id, img: obj.thumbnail.source})
        }
        else {
          $scope.results.push({title: obj.title, body: obj.extract, page: page + id, img: 'http://www.inf.ufrgs.br/~fpknebel/images/rnd/no-image.png'})
        }
      })
    });
  }
});