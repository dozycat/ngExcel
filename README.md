# ngExcel
when making project faced a problem.
we need a anjularjs-directive to download file from client.
This little project is to create a easy way to export data to ngExcel and download;

### ~ support muti-sheet
### ~ support utf-8

----------
#how to use .
## First:  change angular.module('XXX').directive('ngExcel', []  
		'XXX' to your module name.
		
## Second: 
	<div ng-excel="" type="'excel'" data="excelData.wave" xlsfilename="'media_wave_data.xls'" >
