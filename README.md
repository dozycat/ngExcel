# ngExcel
when making project faced a problem.
we need a anjularjs-directive to download file from client.
This little project is to create a easy way to export data to ngExcel and download;

## CHANGES
##V1.0
### ~ support muti-sheet
### ~ support utf-8 [chinese^-^]
##V1.1
### ~ support big file by blob.

#how to use .
## First:  
change
	angular.module('XXX').directive('ngExcel', []  
'XXX' to your module name.
		
## Second: 
方法1：支持图标，点击下载。
```js
	$scope.data = 
	{
        	name: 'no data',
        	data: [['name','sex'],['Tom','Harry']
        }
```
```html
	<div ng-excel="" type="'excel'" data="data" xlsfilename="'media_wave_data.xls'" >
```
方法2: 支持函数，可以想怎么做就怎么做。
```
 $scope.toolsbox.click = function (v) {
    var table = [....];
    $scope.excleTools.data = data;
    $scope.excleTools.down(data);
};             
<div class="download" ng-show="false">
    <div ng-excel="" type="'excel'" data="excleTools.data" xlsfilename="'dashboard.xls'" down="excleTools.down">
    </div>
</div>               
```               
## Dep: anjularjs 1.4.2
