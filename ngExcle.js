/**
 * @file excel-export, support muti-sheet
 * @author dozycfs@gmail.com
 * @email http://dozy.me
 */

(function () {
    'use strict';
    angular.module('XXX').directive('ngExcel', [
        '$q',
        ngExcel
    ]);

    function ngExcel($q) {
        return {
            restrict: 'AE',
            require: '',
            scope: {
                // data Type
                type: '=type',
                // data
                data: '=data',
                // download file name
                xlsfilename: '=xlsfilename'
            },
            template: '<a class="ng-excel" download="test.xls" ng-click="exportTo(type, data)">'
            + '<span class="glyphicon glyphicon-download-alt" ></span></a>',
            link: function (scope, elm, attrs) {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                var fromCharCode = String.fromCharCode;
                var ExcelExport = function () {
                    var version = '1.3';
                    var csvSeparator = ',';
                    var uri = {
                        excel: 'data:application/vnd.ms-excel;base64,',
                        csv: 'data:application/csv;base64,'
                    };
                    var template = {
                        excel: '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>'
                        + '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" '
                        + 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
                        + '{worksheets}</Workbook>',
                        worksheet: '<Worksheet ss:Name="{name}"><Table>{rows}</Table></Worksheet>',
                        cell: '<Cell><Data ss:Type="{type}">{data}</Data></Cell>'
                    };
                    var csvDelimiter = ',';
                    var csvNewLine = '\r\n';
                    var base64 = function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)));
                    };
                    var format = function (s, c) {
                        return s.replace(new RegExp('{(\\w+)}', 'g'), function (m, p) {
                            return c[p];
                        });
                    };
                    var excel = function (data) {
                        var worksheets = '';
                        var ctx = {};
                        // debug
                        if ((typeof(data) === 'undefined') || (data.length === 0)) {
                            data = [{
                                name: 'no data',
                                data: [['no data']]
                            }, {
                                name: 'introduce',
                                data: [['data = [{name:\'sheetname\',data:[[]]}]'], ['xlsfilename=outputfileName.xls']]
                            }];
                        }
                        for (var x in data) {
                            var sheet = data[x];
                            var sheetContent = '';
                            var sheetName = sheet.name;
                            var sheetData = sheet.data;
                            if (typeof(sheetName) === 'undefined') {
                                sheetName = 'data';
                            }
                            if ((typeof(data) === 'undefined') || (data.length === 0)) {
                                sheetData = [['no data']];
                            }
                            var tableContent = '';
                            for (var y in sheetData) {
                                var table = sheetData[y];
                                var rowContent = '<Row>';
                                for (var z in table) {
                                    var row = table[z];
                                    var type = (!isNaN(Number(row))) ? 'Number' : 'String';
                                    ctx = {data: row, type: type};
                                    rowContent += format(template.cell, ctx);
                                }
                                rowContent += '</Row>';
                                tableContent += rowContent;
                            }
                            ctx = {
                                rows: tableContent,
                                name: sheetName
                            };
                            var s = format(template.worksheet, ctx);
                            worksheets += s;
                        }
                        ctx = {
                            worksheets: worksheets
                        };
                        var hrefvalue = uri.excel + base64(format(template.excel, ctx));
                        return hrefvalue;
                    };
                    return excel;
                };
                var exportTools = new ExcelExport();

                var doClick = function (url) {
                    var downloadContainer = angular.element('<div data-tap-disabled="true"><a></a></div>');
                    var downloadLink = angular.element(downloadContainer.children()[0]);
                    downloadLink.attr('href', url);
                    if (typeof (scope.xlsfilename) === 'undefined') {
                        scope.xlsfilename = 'res.xls';
                    }
                    downloadLink.attr('download', scope.xlsfilename);
                    downloadLink.attr('target', '_blank');
                    downloadLink[0].click();
                    downloadLink.remove();
                };
                scope.exportTo = function (type, data) {
                    scope.url = '';
                    if (type === 'excel') {
                        var e = exportTools(data);
                        doClick(e);
                        scope.url = e;
                    }

                };
            }
        };
    }
})();