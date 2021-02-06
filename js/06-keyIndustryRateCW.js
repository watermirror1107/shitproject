var keyIndustryRate;
/*var keyIndustryModel=true;//控制弹出框
var keyIndustryModelName='';//点击一次监听多次的问题*/
$(function () {
  ytCharts.keyIndustryRate = {
    url: CONTEXT_PATH + '/lsd/LSD010100DailyInspection.do?method=getBusinessCount',
    getData: function (url, param) {
      getData(this, url, param);
    },
    dataProcessor: function (data) {
    },
    draw: function (data) {
      var self = this;
      if ($.isEmptyObject(data)) {
        data = this.getData();
        return;
      }
      var sData = data;
      var centerX = ['35%', '68%', '82%', '20%', '90%', '40%', '10%', '65%'];
      var centerY = ['42%', '73%', '38%', '80%', '60%', '85%', '65%', '25%'];
      var num = 0;

      $.each(sData, function (i, v) {
        var x = centerX[i];
        var y = centerY[i];
        var n = Number(v.value) * 100 / 10;
        if (n > 1) {
          var r2 = Number(v.value) * 100;
          var r1 = 0;
          var rbg = 0.3;
          for (var b = 0; b <= n; b++) {
            if (b == 0) {
              if (n >= 5) {
                r2 = 50;
              }
              self.bubbleChart(num, x, y, r1 * (3 / 4) + '%', r2 * (3 / 4) + '%', 'rgba(20,230,248,' + rbg + ')', v.value, v.name);
            } else {
              r1 = r2 + 2;
              r2 = r1 + 2;
              rbg = rbg + 0.2;
              self.bubbleChart(num, x, y, r1 * (3 / 4) + '%', r2 * (3 / 4) + '%', 'rgba(20,230,248,' + rbg + ')', v.value, v.name);
            }
            num++;
          }
        } else {
          var r2 = Number(v.value) * 100;
          var r1 = 0;
          var rbg = 0.3;
          self.bubbleChart(num, x, y, r1 + '%', '7.5%', 'rgba(20,230,248,' + rbg + ')', v.value, v.name);
          num++;
        }
      });
    },
    clear: function () {
      keyIndustryRate.clear();
    },
    bubbleChart: function (id, x, y, r1, r2, rbga, value, name) {
      keyIndustryRate = getEcharsInstance('keyIndustryRate');

      var series = [];
      if (id !== 0) {
        series = keyIndustryRate.getOption().series;
      }

      series.push({
        name: id,
        type: 'pie',
        center: [x, y],
        radius: [r1, r2],
        itemStyle: {
          color: {
            type: 'linear',
            x: -1,
            y: -1,
            x1: 1,
            y1: 1,
            colorStops: [
              {
                offset: 0, color: 'rgba(248, 248, 255, 0)'
              },
              {
                offset: 1, color: rbga
              }],
            global: false // 缺省为 false
          }
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{b|{b}}\n{b|{c}%}',
          rich: {
            b: {
              fontFamily: 'Microsoft YaHei',
              color: '#fff',
              fontSize: fontSize,
              lineHeight: 20,
              align: 'center'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: fontSize
            }
          }
        },
        data: [
          {value: (Number(value) * 100).toFixed(2), name: name},
        ]
      });

      keyIndustryRate.setOption({
        title: {
          text: '各类业务占比情况 {fence|}',
          left: 15,
          textStyle: {
            color: '#fff',
            fontSize: fontSize,
            fontWeight: 'normal',
            rich: {
              fence: {
                height: 28,
                top: 0,
                backgroundColor: {
                  image: CONTEXT_PATH + '/resource/images/largeScreen/fence.png'
                }
              }
            }
          }
        },
        series: series
      });

      // 点击事件
      keyIndustryRate.on('click', function (params) {
    	  		$(".mw.fade.in").remove();
   	   var thisgridCode=window.frames['iframeId_wel'].contentWindow.currentGridCode==null?'':window.frames['iframeId_wel'].contentWindow.currentGridCode;
   	  childModal('m-zdjg', '重点行业监督检查列表' , 1080 ,MFGSP_PATH + '/dss/DSS010200SuperviseCheck.do?type=large&btnoff=true&typeSortName='+params.name+'&areaGridCode='+thisgridCode);
   	   /*if($("#zdhyjdjczb" ).val()==undefined){
    	  			keyIndustryModel=true;
    	  			keyIndustryModelName='';
    	  		}
    		  if(keyIndustryModel&&keyIndustryModelName!=params.name){
        		  childModal('zdhyjdjczb', '重点行业监督检查列表' , 1080 ,MFGSP_PATH + '/dss/DSS010200SuperviseCheck.do?type=large&typeSortName='+params.name);
        		  keyIndustryModelName=params.name;
        		  keyIndustryModel=false;
        	  }else if(keyIndustryModelName!=params.name){
        		  $("#zdhyjdjczb" ).remove();
        		  childModal('zdhyjdjczb', '重点行业监督检查列表' , 1080 ,MFGSP_PATH + '/dss/DSS010200SuperviseCheck.do?type=large&typeSortName='+params.name);
        		  keyIndustryModel=true;
        	  }    	*/
      });
    }
  };

  ytCharts.keyIndustryRate.draw();
});
