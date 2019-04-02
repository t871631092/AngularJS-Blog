
var app = angular.module('myapp',['ngResource','ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider    
    .when('/',{
        templateUrl:'home.html'
    })
    .when('/home',{
        templateUrl:'home.html'
    })
    .when('/login',{
        templateUrl:'login.html'
    });


});

app.value("public",{publicisLogin:null});

//============Blog模块=====================
app.controller('BlogCtrl',($scope,$http,$location)=>{

    $scope.page=1;
    $scope.limit=6;
    $scope.skip=0;
    
    $scope.pagemin=true

    $http.get('getall').then(
        res=>{
            $scope.maxpage=Math.ceil(res.data/$scope.limit);
        },()=>{alert('unknow error-getpage')}
    );

    $http.get('list?skip='+$scope.skip+'&limit='+$scope.limit).then(
        res=>{
            $scope.list=res.data;
        },()=>{alert('unknow error')}
    );

    $scope.pageup=()=>{
        $scope.page=$scope.page+1;
        $scope.skip=$scope.skip+$scope.limit;
        $http.get('list?skip='+$scope.skip+'&limit='+$scope.limit).then(
            res=>{
                $scope.list=res.data;
            },()=>{alert('unknow error')}
        );
        if($scope.page==$scope.maxpage){
            $scope.pagemax=true;
            $scope.pagemin=false
        };
    };
    $scope.pagedown=()=>{
        $scope.page=$scope.page-1;
        $scope.skip=$scope.skip-$scope.limit;
        $http.get('list?skip='+$scope.skip+'&limit='+$scope.limit).then(
            res=>{
                $scope.list=res.data;
            },()=>{alert('unknow error')}
        );
        if($scope.page==1){
            $scope.pagemax=false;
            $scope.pagemin=true
        };
    };

});

//==========登陆模块==============


app.controller('loginCtrl', function($scope,$http,$location) {
    function loca(){
        $location.path('/login');
    };
    function session(){
        $http.get('session').then
        (
           res=>
           {
               $scope.userLogin=res.data;
               if(res.data=="null")
               {$scope.userislogin=true;}
               else{
                   $scope.userislogin=false;
               }
           },
           ()=>{alert("unknow error")}
        );
    };

    $scope.btnlogin="登陆/注册";
    $scope.a=-1;

    session();

    //验证是否注册
    $scope.isRegister=()=>{
        $http.get('users/'+$scope.user.id).then(res=>{$scope.a=res.data;
            if($scope.a>=1){
                $scope.btnlogin="登陆";
                    }
                        else{
                $scope.btnlogin="注册";
            }
        });
   }
  //============btn===click=======
  $scope.login=()=>{
      
      if($scope.a==-1){
          alert("发生错误");
      }
   //===========register============
   else if($scope.a==0){
       $http.post('users/register',{
           "username":$scope.user.id,
           "pw":$scope.user.pw
       }).then(
            ()=>{
               alert('注册成功');
               loca();
               },
            ()=>{alert('注册失败')}
       )
    }
   //===========login==============
   else if($scope.a>0){
    $http.post('users/login',{
        "username":$scope.user.id,
        "pw":$scope.user.pw
    }).then
        (res=>{
            if(res.data.result==0){
            alert('登陆成功');
            loca();
        };
            if(res.data.result==1){
                alert('登陆失败,密码错误')
            };
    },()=>{alert('未知错误')}
        )
   }
   else{
    alert("未知错误");
   }
};
    //============btn==click============

    //=======zc click===========
    $scope.zc=()=>{
        $http.get('logout').then(()=>{loca()});
    };
    
    //==========zc click==========


    $scope.grxx=()=>{
        window.location.href="profile";
    };
});

app.controller('loginBack',function($scope,$location){
    
    $scope.t=3;

        $location.path('/');

});
