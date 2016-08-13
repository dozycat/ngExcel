/**
 * @file excel-export, support muti-sheet
 * @author dozycfs@gmail.com
 * @email http://dozy.me
 */

(function () {
    'use strict';
    angular.module('angularGulp').directive('ngExcel', [
        '$q',
        ngExcel
    ]);

    function ngExcel($q) {
        return {
            restrict: 'AE',
            require: '',
            scope: {
                // 类型
                type: '=type',
                // 数据
                data: '=data',
                // 下载文件名
                xlsfilename: '=xlsfilename',
                // 下载
                down: '=?down'
            },
            template: '<a class="ng-excel" download="test.xls" ng-click="exportTo(type, data)">'
            + '<span class="glyphicon glyphicon-download-alt" ></span></a>',
            link: function (scope, elm, attrs) {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                var fromCharCode = String.fromCharCode;
                var self = window;
                var toString = function (a) {
                        return String(a);
                }
                // 兼容不容浏览器
                var myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString);
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
                        // 容错
                        if ((typeof(data) === 'undefined') || (data.length === 0)) {
                            data = [{
                                name: '无数据',
                                data: [['无数据，请查询后再下载~']]
                            }, {
                                name: '使用说明',
                                data: [['data = [{name:\'表名\',data:[[]]}]'], ['xlsfilename=输出文文件名']]
                            }];
                        }
                        for (var x in data) {
                            var sheet = data[x];
                            var sheetContent = '';
                            var sheetName = sheet.name;
                            var sheetData = sheet.data;
                            // 容错
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
                    // data to blob
                    var dataUrlToBlob = function (strUrl) {
                        var parts= strUrl.split(/[:;,]/),
                        type = parts[1],
                        decoder = (parts[2] === "base64") ? atob : decodeURIComponent,
                        binData = decoder(parts.pop()),
                        mx = binData.length,
                        i = 0,
                        uiArr = new Uint8Array(mx);
                        for(i;i < mx; ++i)
                            {
                                uiArr[i]= binData.charCodeAt(i);
                            }
                        return new myBlob([uiArr], {type: 'application/vnd.ms-excel'});
                    }
                    var anchor = document.createElement('a');
                    if (typeof (scope.xlsfilename) === 'undefined') {
                        scope.xlsfilename = 'res.xls';
                    }
                    if (url.length < 1024*1024*1.999) {
                        if ('download' in anchor) { //html5 A[download]
                                anchor.href = url;
                                anchor.setAttribute("download", scope.xlsfilename);
                                anchor.className = "download-js-link";
                                anchor.innerHTML = "downloading...";
                                anchor.style.display = "none";
                                document.body.appendChild(anchor);
                                setTimeout(function() {
                                    anchor.click();
                                    document.body.removeChild(anchor);
                                }, 1000);
                                return true;
                            }
                    } else {
                        // excel 文件比较大的时候使用blob进行二进制编解码.
                        // support big file ^-^
                        if(myBlob !== toString ){
                            var blob = dataUrlToBlob(url);
                            url = URL.createObjectURL(blob);
                            if ('download' in anchor) { //html5 A[download]
                                anchor.href = url;
                                anchor.setAttribute("download", scope.xlsfilename);
                                anchor.className = "download-js-link";
                                anchor.innerHTML = "downloading...";
                                anchor.style.display = "none";
                                document.body.appendChild(anchor);
                                setTimeout(function() {
                                    anchor.click();
                                    document.body.removeChild(anchor);
                                }, 100);
                                return true;
                            }
                        }
                    }
                };
                scope.exportTo = function (type, data) {
                    scope.url = '';
                    if (type === 'excel') {
                        var e = exportTools(data);
                        doClick(e);
                        scope.url = e;
                    }

                };
                scope.down = function (data) {
                    var data = data || scope.data;
                    var type = scope.type;
                    scope.exportTo(type, data);
                };
            }
        };
    }
})();