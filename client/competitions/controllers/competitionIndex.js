app.controller('CompIndexController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
 $scope.competitions = $meteor.collection(Competitions).subscribe("comps")

console.log($scope.competitions)

$scope.labels = ["testing", "this","this","this","hi", 'there'];
$scope.data = [5, 10, 20, 10, 20, 10]  
}])