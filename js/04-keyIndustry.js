var keyIndustry;
//记录下重点行业统计时间控件的时间和对应的网格 企业类别
var keyIndustrybeginDate='';
var keyIndustryendDate='';
var areaGridCode=null;
var keyIndustryCategory='';
$(function () {
    ytCharts.keyIndustry = {
        url: CONTEXT_PATH + '/lsd/LSD010200CompAndSpot.do?method=getIndustry',
        getData: function (url, param) {
            getData(this, url, param);
        },
        dataProcessor: function (data) {
            // 表格数据
            var compnum = data.compnum;
            var personnum = data.personnum;
            var total = compnum + personnum;
            var compRate = '';
            var personRate = '';

            if (total) {
                compRate = (compnum * 100 / total).toFixed(2) + '%';
                personRate = (personnum * 100 / total).toFixed(2) + '%';
            }

            $('#ki-gt-val').text(personnum);
            $('#ki-gt-bl').text(personRate);
            $('#ki-qy-val').text(compnum);
            $('#ki-qy-bl').text(compRate);

            // 报表数据
            var chartData = data.industry;
            return chartData;
        },
        clear:function(){
        	keyIndustry.clear();
        },
        draw: function (data) {
            if ($.isEmptyObject(data)) {
                data = this.getData();
                return;
            }

            var sData = this.dataProcessor(data);

            // 最外圈数据
            var outsildeA = [
                {
                    value: 1,
                    itemStyle: {
                        color: 'transparent'
                    }
                },
                {
                    value: 1,
                    itemStyle: {
                        color: '#12cbda'
                    }
                },
                {
                    value: 5,
                    itemStyle: {
                        color: '#2b749f'
                    }
                },
                {
                    value: 1,
                    itemStyle: {
                        color: '#12cbda'
                    }
                }
            ];
            var outsildeB = outsildeA.concat();
            var outsilde = outsildeA.concat(outsildeB);

            // 数据套环数据
            var ring = [{
                value: 1,
                itemStyle: {
                    color: '#0078c4'
                }
            }];

            keyIndustry =echarts.init(document.getElementById('keyIndustryChart')); 
            keyIndustry.setOption({
                color: palette,
                tooltip: {},
                series: [
                    {
                        name: 'inside',
                        type: 'pie',
                        center:['50%','50%'],
                        radius: ['43%', '45%'],
                        cursor: 'auto',
                        silent: true,
                        labelLine: {
                            show: false
                        },
                        tooltip: {
                            show: false
                        },
                        data: [
                            {
                                name: '重点行业\n\n统计情况',
                                value: 1,
                                label: {
                                    show: true,
                                    position: 'center',
                                    color: fontColor,
                                    fontSize: fontSize + 3
                                },
                                itemStyle: {
                                    color: '#5c861f'
                                }
                            }, {
                                value: 1,
                                itemStyle: {
                                    color: '#ac750f'
                                }
                            }, {
                                value: 1,
                                itemStyle: {
                                    color: '#ff0028'
                                }
                            }
                        ]
                    },
                    {
                        name: 'ring',
                        type: 'pie',
                        center: ['50%','50%'],
                        radius: ['49%','50%'],
                        hoverAnimation: false,
                        cursor: 'auto',
                        silent: true,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        tooltip: {
                            show: false
                        },
                        data: ring
                    },
                    {
                        name: 'placehoder',
                        type: 'gauge',
                        center: ['50%','50%'],
                        radius: '65%',
                        startAngle: 0,
                        endAngle: 359.9,
                        splitNumber: 90,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 26,
                            lineStyle: {
                                width: 2,
                                color: 'rgb(3, 15, 16)'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        }
                    },
                    {
                        name: '重点行业',
                        type: 'pie',
                        center:['50%', '50%'],
                        radius: ['50%', '65%'],
                        hoverAnimation: false,
                        z: 0,
                        zlevel: 0,
                        data: sData
                    },
                    {
                        name: 'ring',
                        type: 'pie',
                        center: ['50%','50%'],
                        radius: ['65%','66%'],
                        hoverAnimation: false,
                        cursor: 'auto',
                        silent: true,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        tooltip: {
                            show: false
                        },
                        data: ring
                    },
                    {
                        name: 'outside',
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['69%', '71%'],
                        hoverAnimation: false,
                        startAngle: 190,
                        cursor: 'auto',
                        silent: true,
                        labelLine: {
                            show: false
                        },
                        tooltip: {
                            show: false
                        },
                        data: outsilde
                    }
                ]
            });

            // 点击事件
            keyIndustry.on('click', function (params) {
                var type = params.data.type;
                if (window.frames['iframeId_wel'].contentWindow.currentGridCode != areaGridCode) {
                    keyIndustrybeginDate = '';
                    keyIndustryendDate = '';
                    keyIndustryCategory='';
                }                	
                window.frames['iframeId_wel'].contentWindow.eventListenerClick(type, keyIndustrybeginDate, keyIndustryendDate,
                		keyIndustryCategory);
                var isSpecialDevice="";
                if(type=='99'){
                	isSpecialDevice='1';
                }
                var thisgridCode=window.frames['iframeId_wel'].contentWindow.currentGridCode==null?'':window.frames['iframeId_wel'].contentWindow.currentGridCode;
                $(".mw.fade.in").remove();
                childModal('m-xyjg', '重点行业列表' , 1080 , MFGSP_PATH + '/spf/SPF010100Company.do?type=large&btnoff=true&isSpecialDevice='+isSpecialDevice+'&compType='+type+'&areaGridCode='+thisgridCode); 
            });
        }
    };

    ytCharts.keyIndustry.draw();

});
/**
 * 刷新表格数据
 */
function refIndustry(){
	ytCharts.keyIndustry.getData();
}

/**
 * 重点行业统计企业分类查询
 */
function searchComp(type){
	 if (window.frames['iframeId_wel'].contentWindow.currentGridCode != areaGridCode) {
         keyIndustrybeginDate = '';
         keyIndustryendDate = '';
     }
	
	 var param = {
    	        beginDate: keyIndustrybeginDate,
    	        endDate: keyIndustryendDate,
    	        category:type
    	      };
	  ytCharts.keyIndustry.getData(param);
}
