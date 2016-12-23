var myApp = angular.module('myApp');

myApp.controller('GamesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('GamesController loaded...');

  $scope.newGame = function(){
    $scope.game = {};
  };

	$scope.getGames = function(){
		$http.get('/api/games').then(function(response){
			$scope.games = response.data;
		});
	}
  $scope.getGameById = function(){
    var id = $routeParams.id;
    console.log('Product id is ' + id);
		$http.get('/api/games/'+id).then(function(response){
			$scope.game = response.data;
      console.log($scope.game);
		});
	}
  $scope.addGame = function(){

		console.log($scope.game);
		$http.post('/api/games/', $scope.game).then(function(response){
      //$scope.item = response.data;
    	window.location.href='#!/games';
		});
	}
  $scope.updateGame = function(){
		var id = $routeParams.id;
		$http.put('/api/games/'+id, $scope.game).then(function(response){
			window.location.href='#!/games';
		});
	}

	$scope.removeGame = function(id){
		$http.delete('/api/games/'+id).then(function(response){
			window.location.href='#!/games';
		});
	}

}]);
