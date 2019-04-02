var app = angular.module('myapp',['ngResource','ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider    
    .when('/',{
        templateUrl:'../blog.html'
    })    
    });

app.controller('blogCtrl',($scope,$http,$location)=>{

    $http.get('../session').then
    (
       res=>
       {
           $scope.username=res.data;
           if(res.data=="null")
           {
           }
           else{
           }
       },
       ()=>{alert("unknow error")}
    );


});

