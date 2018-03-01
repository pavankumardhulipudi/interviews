import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;

let myCtrl = function($scope){
  $scope.todoList = [
    { name: "Do 1"},
    { name: "Do 2"},
    { name: "Do 3"},
    { name: "Do 4"},
  ];
  $scope.completeTask = function(task) {
    $scope.todoList.map(i => {
      if(i.name == task.name) {
        i.completed = true;
      }
    });
  }
}
myCtrl.injector = ["$scope"];
angular.module("myApp", []).controller("myCtrl", myCtrl);


$("#upload").on("click", function(){
  $("#fileUploader").trigger("click");
});

$(".a-header").on("click", function(){
  $(".active.a-content").removeClass("active");
  $(this).next().addClass("active");
});
