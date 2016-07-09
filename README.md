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

                            
                            
## Dep: anjularjs 1.4.2
