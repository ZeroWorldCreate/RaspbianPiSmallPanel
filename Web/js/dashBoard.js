//变量声明 - 开始
var y1_data_NET_state_table = [];       //上传吞吐量数组声明
var y2_data_NET_state_table = [];       //下载吞吐量数组声明
var y1_data_CPU_state_table = [];       //CPU利用率数组声明
var y1_data_Memory_state_table = [];    //内存利用率数组声明
//变量声明 - 结束


//测试模式下随机数生成 - 开始
function data() {
    return Math.round(Math.random() * 100);
}
//测试模式下随机数生成 - 结束


function Update_Core_Info() {       //更新进度条标签

    var Need_Update = [];   //处理传参（名字不顺眼，换个名字而已）
    for (var i = 0; i <= (arguments.length - 1); i++) {     //数组以0起始，长度以1起始，减一
        Need_Update.push(arguments[i]);
    };

    var Span_Text;
    for (var i = 0; i <= (Need_Update.length - 1); i++) {   //数组以0起始，长度以1起始，减一
        Span_Text = document.getElementById(Need_Update[i]);
        Span_Text.innerText = data() + '%';
    };
};


function Progress(Progress_ID, what_Progress) {     //更新进度条

    var progress_Deg_BFB = document.getElementById(what_Progress).textContent;    //获取进度条百分比
    Progress_ID = '#' + Progress_ID; //处理字符串--添加 #

    var circle_Progress_Right = $(Progress_ID); //获取左遮挡实例
    progress_Deg_BFB = progress_Deg_BFB.split("%");
    progress_Deg_BFB = progress_Deg_BFB.join(""); //去除%号

    var progress_Deg_N = 360 * (parseFloat(progress_Deg_BFB) / 100); //求圆周角（360）百分比角
    //alert(progress_Deg_N);
    //判断旋转角



    if (progress_Deg_N > 180) { //大于180使用第二合并层

        //alert(progress_Deg_N);
        var progress_Deg_more = progress_Deg_N - 180; //计算超180多少角
        //alert(progress_Deg_more);
        var progress_Deg_INPUT = progress_Deg_more + "deg";
        progress_Deg_INPUT = "rotate(" + progress_Deg_INPUT + ")"; //合并字符串: rotate(xxxdeg)

        circle_Progress_Right.attr("class", "circle_Progress_Right_more");
        circle_Progress_Right.animate({}, function () {
            circle_Progress_Right.css({
                'transform': progress_Deg_INPUT,
                'transition': 'all 1s linear',
            })
        });

        /* }, 1010); */
    }
    else if (progress_Deg_N <= 180) { //小于等于180使用第一遮挡层
        //alert(progress_Deg_N)
        var progress_Deg_INPUT = progress_Deg_N + "deg";
        //alert(progress_Deg_INPUT)
        progress_Deg_INPUT = "rotate(" + progress_Deg_INPUT + ")";//合并字符串: ratate(xxxdeg)
        //alert(progress_Deg_INPUT);
        circle_Progress_Right.attr("class", "circle_Progress_Right");
        circle_Progress_Right.animate({}, function () {
            circle_Progress_Right.css({
                'transform': progress_Deg_INPUT,
                'transition': 'all 1s linear',
            })
        });
    }
};


function Update_state(NEED_Update_state, table_ID, Yname, datanames = [], y1_data, y1_data_data, y2_data, y2_data_data) {      //更新统计图
    var state = echarts.init(document.getElementById(table_ID));

    if (NEED_Update_state == 0) {
        if (datanames.length == 1) {
            for (var i = 0; i <= 12; i++) {
                y1_data.push("0");
            };
        }
        else if (datanames.length == 2) {
            for (var i = 0; i <= 12; i++) {
                y1_data.push("0");
                y2_data.push("0");
            }
        }
    };

    if (NEED_Update_state == 1) {
        if (datanames.length == 1) {
            y1_data.shift();
            y1_data.push(y1_data_data);
        }
        else if (datanames.length == 2) {
            y1_data.shift();
            y1_data.push(y1_data_data);
            y2_data.shift();
            y2_data.push(y2_data_data);
        }
    };
    var option = {
        tooltip: {
            trigger: 'axis',
        },

        legend: {
            data: datanames,
            textStyle: {
                color: ['#8AD5ED', '#64D5C3'],
            },
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['60s', '55s', '50s', '45s', '40s', '35s', '30s', '25s', '20s', '15s', '10s', '5s', '1s'],
            axisLine: {
                lineStyle: {
                    color: '#78C8EB',
                }
            },
            name: 'Time',
        },

        yAxis: [{
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#78C8EB',
                }
            },
            name: Yname,
        }],

        series: [{
            color: ['#8AD5ED'],
            name: datanames[0],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: y1_data,
        },
        {
            color: ['#64D5C3'],
            name: datanames[1],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: y2_data,
        }],

    };
    state.setOption(option);
};


function Update_ALL() {     //更新所有数据
    Update_Core_Info("CPU_what_Progress", "Memory_what_Progress");
    Progress('CPU_Progress', 'CPU_what_Progress');
    Progress('Memory_Progress', 'Memory_what_Progress');
    Progress('Disk_Progress', 'Disk_what_Progress');
    Update_state(1, 'NET_state_table', '吞吐量', ['上传', '下载'], y1_data_NET_state_table, data(), y2_data_NET_state_table, data());
    Update_state(1, 'CPU_state_table', '利用率 %', ['CPU'], y1_data_CPU_state_table, GetSpanData('CPU_what_Progress'));
    Update_state(1,'Memory_state_table', '利用率 %',['内存'], y1_data_Memory_state_table, GetSpanData('Memory_what_Progress'));
};


function GetSpanData(SpanID) {      //获取Span标签数据
    var Span_data_s = document.getElementById(SpanID).textContent;
    Span_data_s = Span_data_s.split("%");
    Span_data_s = Span_data_s.join(""); //去除%号
    var Span_data_i = parseFloat(Span_data_s);
    return Span_data_i;
}