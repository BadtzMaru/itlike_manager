import React from "react";
import {Card, Button, Table, Switch, Divider, Modal} from 'antd';

export default class ActivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList: [
                {
                    id: 1,
                    activities_name: '新闻一',
                    activities_time: '2020年5月30日',
                    activities_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599719490298&di=857c67691d86eae71deb9bed8343f561&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Da9714efaaf86c91708035231f93c70c6%2Fddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg',
                    activities_price: 500,
                    activities_days: '6天',
                    is_focus: 0,
                },
            ],
            totalSize: 100,
            pageSize: 4,
        }
    }

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', width: 50, align: 'center'},
        {title: '活动名称', dataIndex: 'activities_name', align: 'center'},
        {title: '开始时间', dataIndex: 'activities_time', align: 'center'},
        {
            title: '活动封面', dataIndex: 'activities_img', render: (text) => {
                return (
                    <img src={text} alt="活动封面" style={{width: 100}}/>
                );
            }, align: 'center'
        },
        {title: '活动价格', dataIndex: 'activities_price', align: 'center'},
        {title: '活动天数', dataIndex: 'activities_days', align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', render: (text) => {
                return (
                    <Switch checkedChildren={"是"} unCheckedChildren={"否"} defaultChecked={text === 1}/>
                );
            }, align: 'center'
        },
        {
            title: '操作', align: 'center', render: (text, record) => {
                return (
                    <div>
                        <Button>编辑</Button>
                        <Divider type="vertical"/>
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认删除吗',
                                content: '删除此资源所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {

                                }
                            });
                        }}>删除</Button>
                    </div>
                );
            }
        },
    ];

    render() {
        // 添加按钮
        let AddBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push('/activities/add-activities');
            }}>添加活动</Button>
        );
        return (
            <div>
                <Card title={"活动列表"} extra={AddBtn}>
                    <Table rowKey={'id'} columns={this.columns} dataSource={this.state.resourceList} pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum,pageSize)=>{
                            console.log(pageNum,pageSize);
                        }
                    }}>
                    </Table>
                </Card>
            </div>
        );
    }
}
