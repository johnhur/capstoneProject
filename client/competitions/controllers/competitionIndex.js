angular.module('tweet-vote').controller('CompIndexController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
 $scope.competitions = $meteor.collection(Competitions).subscribe("comps")

console.log($scope.competitions)

var arr = []
// function getLabels(){
// 	$scope.competitions.forEach(function(data){
// 	console.log(data.name)
// 	arr.push(data.name); 
// })
// }

function getData(){
	$scope.competitions.forEach(function(data){
	console.log(data.name)
	arr.push(data.name); 
})
}
getData()
graph()
function graph() {
$scope.labels = arr;
console.log("this is scope.labels: " + $scope.labels)
$scope.series = ['Live', 'Complete']
$scope.data = [[5, 10, 20, 10, 20, 10], [6, 10, 50, 2, 20, 10]]
$scope.colours = ['#ead61c','#4d1b7b'];
}

}])