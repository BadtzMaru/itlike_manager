import React from "react";
import {Card} from 'antd';
import ReactEcharts from "echarts-for-react";
import {getBuyCount} from "../../../../api/homeApi";

export default class BuyCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = () => {
        getBuyCount().then(result => {
            let tempData = [];
            if (result.status === 1) {
                for (let key in result.data) {
                    tempData.push(result.data[key]);
                }
                // 更新状态机
                this.setState({
                    data: tempData,
                });
            }
        }).catch(error=>{
            console.log(error);
        });
    };
    getOptions = () => {
        const {data} = this.state;
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['幼教资源', '职场人生', '活动专区', '直播课堂'],
            },
            series: [
                {
                    name: '购买数量',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: data[0], name: '幼教资源'},
                        {value: data[1], name: '职场人生'},
                        {value: data[2], name: '活动专区'},
                        {value: data[3], name: '直播课堂'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    };

    render() {
        return (
            <Card title="各业务购买数量统计">
                <ReactEcharts option={this.getOptions()}></ReactEcharts>
            </Card>
        );
    }
}
