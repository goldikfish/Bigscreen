//
$(function () {
    echart_1();

    function echart_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));
        var option;
        let yMax = 300000;

        option = {
        title: {
            text: '',
            textStyle:{
                color:'#E1FFFF'
            }
        },
        xAxis: {
            data: [],
            axisLabel: {
            inside: true,
            color: '#fff',
            //让x轴文字为竖向
            interval: 0,
            formatter: function(value) {
                return value.split('').join('\n')
            }
            },
            axisTick: {
            show: false
            },
            axisLine: {
            show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
            show: false
            },
            axisTick: {
            show: false
            },
            axisLabel: {
            color: '#999'
            }
        },
        dataZoom: [
            {
            type: 'inside'
            }
        ],
        series: [
            {
            type: 'bar',
            showBackground: true,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
                ])
            },
            emphasis: {
                itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                ])
                }
            },
            data: []
            }
        ]
        };
        // Enable data zoom when user click bar.
        const zoomSize = 6;
        myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
        });
        
        $.ajax({
            url: '/chart/bar/',
            type: 'get',
            dataType: 'json',
            //async:false,
            success: function (res) {
                option.xAxis.data = res.data.jobname;
                option.series[0].data = res.data.y2021;
                option.title.text = '2021年';
                myChart.setOption(option);
        
                // 定义年份数组
                var years = ['2021', '2020', '2019', '2018', '2017', '2016'];
                // 定义定时器循环索引变量
                var idx = 0;
        
                // 定义循环函数
                function loop() {
                    // 切换年份，注意取模
                    var year = years[idx % years.length];
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data['y' + year];
                    option.title.text = year + '年';
                    myChart.setOption(option);
        
                    // 增加循环索引变量
                    idx++;
        
                    // 设置定时器，3秒钟后执行下一次循环
                    setTimeout(loop, 3000);
                }
        
                // 开始循环
                loop();
            }
        })
        
        
        /*
        function cycleYears(year, res) {
            option.xAxis.data = res.data.jobname;
            option.series[0].data = res.data['y' + year];
            option.title.text = year+'年';
            myChart.setOption(option);
            setTimeout(function() {
                if (year > 2016) {
                    cycleYears(year - 1, res);
                }
            }, 3000);
        }
        
        $.ajax({
            url: '/chart/bar/',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                cycleYears(2021, res);
            }
        });
        */
        
        /*
        //获取数据
        $.ajax({
            url: '/chart/bar/',
            type: 'get',
            dataType: 'json',
            //async:false,
            success: function(res){
                option.xAxis.data = res.data.jobname;
                option.series[0].data = res.data.y2021;
                option.title.text = '2021年';
                myChart.setOption(option);  

                setTimeout(function() {
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data.y2020;
                    option.title.text = '2020年';
                    myChart.setOption(option);
                }, 3000); //等待5秒后输出2

                setTimeout(function() {
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data.y2019;
                    option.title.text = '2019年';
                    myChart.setOption(option);
                }, 6000); 

                setTimeout(function() {
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data.y2018;
                    option.title.text = '2018年';
                    myChart.setOption(option);
                }, 9000); 

                setTimeout(function() {
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data.y2017;
                    option.title.text = '2017年';
                    myChart.setOption(option);
                }, 12000); 

                setTimeout(function() {
                    option.xAxis.data = res.data.jobname;
                    option.series[0].data = res.data.y2016;
                    option.title.text = '2016年';
                    myChart.setOption(option);
                }, 15000); 
            
            }
            
        })
        */
        
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    
});