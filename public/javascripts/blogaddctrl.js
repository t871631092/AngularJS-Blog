var app = angular.module('myapp',['ngResource','ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider    
    .when('/',{
        templateUrl:'../blogadd.html'
    })
    });

app.controller('blogaddCtrl',($scope,$http,$location)=>{

    var editor;
    KindEditor.ready(function (K) {
        editor = K.create('textarea[name="content"]', {
            uploadJson:'/uploadImg',
            allowFileManager: true
        });
        
    });


    $http.get('../session').then
    (
       res=>
       {
           $scope.username=res.data;
           if(res.data=="null")
           {
            window.location.href="/";
           }
           else{
           }
       },
       ()=>{alert("unknow error")}
    );


    $scope.open=()=>{
        $scope.content=editor.html();

        $http.post('add',{'blogname':$scope.blogname,'html':$scope.content,'username':$scope.username}).then(
            res=>{
                window.location.href="/blog/"+res.data;
            },()=>{}
        );
        };
    $scope.del=()=>{
            editor.html('');
        };
});
