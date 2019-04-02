var app = angular.module('myapp',['ngResource','ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider    
    .when('/',{
        templateUrl:'../blogedit.html'
    })
    });

app.controller('blogeditCtrl',($scope,$http,$location)=>{

    var a=$location.absUrl().match(/edit\S*(?=#!)/)[0].replace("edit/","");
    var editor;
    KindEditor.ready(function (K) {
        editor = K.create('textarea[name="content"]', {
            uploadJson:'/uploadImg',
            allowFileManager: true
        });
        
        $http.get('get/'+a).then(
            res=>{$scope.blog=res.data[0];
                editor.html(res.data[0].html);
                $scope.blogname=res.data[0].blogname;
            },()=>{alert('unknow error')}
        );
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

        $http.post('blog',{'_id':$scope.blog._id,'blogname':$scope.blogname,'html':$scope.content,'username':$scope.username}).then(
            res=>{
                window.location.href="/blog/"+res.data;
            },()=>{}
        );
        };
    $scope.del=()=>{
            editor.html('');
        };
});
