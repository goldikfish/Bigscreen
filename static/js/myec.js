$(function () {
    unemployment();

    function unemployment() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('ec1'));
        var option;
        //指定图表的配置项和数据
        const data = [];
        for (let i = 0; i < 5; ++i) {
          data.push(Math.round(Math.random() * 200));
        }
        option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [
              '全国城镇调查失业率(%)',
              '全国16-24岁人口城镇调查失业率(%)',
              '全国25-59岁人口城镇调查失业率(%)'
            ]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
              show: false, //隐藏坐标轴
              lineStyle:{
                color:'	#E1FFFF',  //坐标轴的颜色
              },
            },
          },
          yAxis: {
            type: 'value',
            axisLine:{
              show: false, //隐藏坐标轴
              lineStyle:{
                color:'	#E1FFFF',  //坐标轴的颜色
              },
            }
          },
          series: [
            {
              name: '全国城镇调查失业率(%)',
              type: 'line',
              stack: 'Total',
              data: [],
              itemStyle: {
                normal: {
                  color: '#FFC0CB',
                }
              },
              textStyle: {
                color: '#FFFAFA', //设置系列名称的颜色
              }
            },
            {
              name: '全国16-24岁人口城镇调查失业率(%)',
              type: 'line',
              stack: 'Total',
              data: [],
              itemStyle: {
                normal: {
                  color: '#00FFFF',
                }
              },
              textStyle: {
                color: '#FFFAFA', //设置系列名称的颜色
              }
            },
            {
              name: '全国25-59岁人口城镇调查失业率(%)',
              type: 'line',
              stack: 'Total',
              data: [],
              itemStyle: {
                normal: {
                  color: '#FFFF00',
                }
              },
              textStyle: {
                color: '#FFFAFA', //设置系列名称的颜色
              }
            }
          ]
        };
        //ajax请求数据
        function updateData() {
          $.ajax({
            url: '/chart/line/',
            type: 'get',
            dataType: 'json',
            success: function(res){
                option.xAxis.data = res.data.y_month;
                option.series[0].data = res.data.allpeople;
                option.series[1].data = res.data.youth;
                option.series[2].data = res.data.middle;
                myChart.setOption(option); 
            }
          });
        
          setTimeout(updateData, 3000);  // 3秒后再次调用updateData函数
        }
        
        updateData();  // 第一次调用updateData函数

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
        //检查看是否存在
        console.log(document.getElementById('ec1'))
    }

});

