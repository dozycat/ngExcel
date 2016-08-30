# ngExcel
when making project faced a problem.
we need a anjularjs-directive to download file from client.
This little project is to create a easy way to export data to ngExcel and download;

## CHANGES
##V1.01
### ~ support muti-sheet
### ~ support utf-8 [chinese^-^]
##V1.02
### ~ support big file by blob.
##V1.03
### ~ add test.html[to see how to ues]
##V1.05
### ~ support bower install ^-^

#see how to use .

## NPM
    npm install ng-excel
## bower
    bower install ng-excel

Usage - Example
```
<!doctype html>
<html ng-app="myapp">

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-sanitize.min.js"></script>
    <script src="./ngExcel.js"></script>
</head>

<body>
    <div>
        <div class="container" ng-controller="myctrl">
            <div class="download">
                <div ng-excel="" type="'excel'" data="excel.data" xlsfilename="'test.xls'" down="excel.down">
                </div>
                <h2>Example One</h2>
                <br>
                <span ng-click="excel.down()">download</span>
                <br>
                <h2>Example Two</h2>
                <br>
                <span ng-click="excel.down(testData)">download</span>
            </div>
        </div>
        <script>
        (function() {
            var myapp = angular.module('myapp', ['ngExcel']);

            myapp.controller('myctrl', function($scope) {
                $scope.testData = [{
                    name: 'sheet1',
                    data: [
                        [1, 2, 3],
                        ['example', '2', '2']
                    ]
                }];
                $scope.excel = {
                    down: function() {},
                    data: [{
                        name: 'sheet1',
                        data: [
                            [1, 2, 3],
                            ['hello', 'ng-', 'excel']
                        ]
                    }, {
                        name: 'sheet2',
                        data: [
                            ['data = [{name:\'sheetName\',data:[[]]}]'],
                            ['xlsfilename=fileName']
                        ]
                    }]
                };
            });
        })();
        </script>
</body>

</html>
            
```               
## Dep: anjularjs 1.4.2
