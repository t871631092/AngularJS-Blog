
var app = angular.module('myapp',['ngResource','ngRoute','ui.bootstrap','ngAnimate','ngSanitize']);

app.config(function($routeProvider){
    $routeProvider    
    .when('/',{
        templateUrl:'profile.html'
    })    
    .when('/changepassword',{
        templateUrl:'profile-changepassword.html'
    })    
    .when('/index',{
        templateUrl:'profile-index.html'
    })    
    .when('/resume',{
        templateUrl:'profile-resume.html'
    })    
    .when('/login',{
        templateUrl:'profile-login.html'
    })    
    .when('/home',{
        templateUrl:'profile-home.html'
    });


});


app.controller('aCtrl',($scope,$http,$location)=>{
    $scope.progressvalue=40;
    //获取session
    $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $scope.progressvalue=90;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
               $scope.progressvalue=90;
               $location.path('index');
           }
       },
       ()=>{alert("unknow error")}
    );




});

app.controller('navCtrl',($scope,$http,$location)=>{
    $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
           }
       },
       ()=>{alert("unknow error")}
    );
});

app.controller('homeCtrl',($scope,$http,$location)=>{
    $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
           }
       },
       ()=>{alert("unknow error")}
    );





    
});
app.controller('indexCtrl',($scope,$http,$location)=>{
    $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
           }
       },
       ()=>{alert("unknow error")}
    );
});
app.controller('resumeCtrl',($scope,$http,$location,uibDateParser,$filter)=>{

        
      $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
               $scope.profile={};
               $http.get('profile/resume').then(
                   res=>{
                       $scope.profile=res.data[0];
                   }
               );
           }
       },
       ()=>{alert("unknow error")}
    );


    $scope.changeorsave="修改资料";
    $scope.resumeshow=true;
    $scope.changeresume=()=>{
        $scope.profile.birth=$filter('date')($scope.profile.birth, "yyyy/MM/dd");
        $scope.resumeshow=!$scope.resumeshow;
        if($scope.resumeshow==true){

            $scope.changeorsave="修改资料";
        //保存操作START
        $http.post('profile/resume',{
            'name':$scope.profile.name,
            'birth': $scope.profile.birth,
            'region':$scope.profile.region,
            'sign':$scope.profile.sign
        }).then(
            res=>{alert(res.data.result)},()=>{alert('unknow error')}
        );
        //保存操作END
        }
            else{
                $scope.changeorsave="保存";}
    }

    
});


app.controller('changepasswordCtrl',($scope,$http,$location)=>{
    $http.get('session').then
    (
       res=>
       {
           $scope.userLogin=res.data;
           if(res.data=="null")
           {
               $scope.userislogin=true;
               $location.path('login');
           }
           else{
               $scope.userislogin=false;
           }
       },
       ()=>{alert("unknow error")}
    );

    $scope.changepw=()=>{
        $http.post('users/changepassword',{'oldpw':$scope.user.oldpw,'pw':$scope.user.pw}).then
        (
            res=>
            {
                $scope.result=res.data.result;
                alert($scope.result);
            },
            ()=>{alert('unkow error')}
        );
    };



});
app.controller('loginCtrl',($scope,$http,$location)=>{
    //验证是否注册
    
    $scope.btnlogin="登陆/注册";
    $scope.a=-1;

    $scope.isRegister=()=>{
        $http.get('users/'+$scope.user.id).then(res=>{$scope.a=res.data;
            if($scope.a>=1){
                $scope.btnlogin="登陆";
                    }
                        else{
                $scope.btnlogin="注册";
            }
        });
   };
   
  //============btn===click=======
  $scope.login=()=>{
      
    if($scope.a==-1){
        alert("服务器繁忙");
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
          $location.path('index')
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
});