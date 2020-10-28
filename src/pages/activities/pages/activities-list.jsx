import React from "react";
import { Card, Button, Table, Switch, Divider, Modal, message, notification } from 'antd';
import { deleteActivities, getActivitiesList, setFocusActivities } from "../../../api/activitiesApi";
import config from "../../../config/config";

export default class ActivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesList: [],
            totalSize: 0,
            pageSize: 4,
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = (page_num = 1, page_size = 4) => {
        getActivitiesList(page_num, page_size).then(result => {
            if (result && result.status === 1) {
                message.success(result.msg);
                this.setState({
                    activitiesList: result.data.activities_list,
                    totalSize: result.data.activities_count,
                })
            }
        }).catch(() => {
            message.error('获取活动列表失败');
        });
    };

    // 列的配置信息
    columns = [
        { title: 'ID', dataIndex: 'id', width: 50, align: 'center' },
        { title: '活动名称', dataIndex: 'activities_name', align: 'center' },
        { title: '开始时间', dataIndex: 'activities_time', align: 'center' },
        {
            title: '活动封面', dataIndex: 'activities_img', render: (text) => {
                return (
                    <img src={config.BASE_URL + text} alt="活动封面" style={{ width: 100 }} />
                );
            }, align: 'center'
        },
        { title: '活动价格', dataIndex: 'activities_price', align: 'center' },
        { title: '活动天数', dataIndex: 'activities_bus_day_id', align: 'center' },
        {
            title: '首页焦点', dataIndex: 'is_focus', render: (text, record) => {
                return (
                    <Switch checkedChildren={"是"} unCheckedChildren={"否"} defaultChecked={text === 1}
                        disabled={!record.focus_img} onChange={checked => {
                            setFocusActivities(record.id, checked ? 1 : 0).then(result => {
                                if (result && result.status === 1) {
                                    notification["success"]({
                                        message: `活动: ${record.activities_name}`,
                                        description: `${checked ? '设置为' : '取消'}首页活动焦点`,
                                    });
                                    record.is_focus = checked ? 1 : 0;
                                }
                            });
                        }} />
                );
            }, align: 'center'
        },
        {
            title: '操作', align: 'center', render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            this.props.history.push({
                                pathname: '/activities/edit-activities',
                                state: {
                                    activities: record,
                                },
                            });
                        }}>编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认删除吗',
                                content: '删除此资源所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    deleteActivities(record.id).then(result => {
                                        if (result && result.status === 1) {
                                            message.success(result.msg);
                                            this._loadData(this.state.pageNum, this.state.pageSize);
                                        } else {
                                            message.error('删除失败');
                                        }
                                    }).catch(() => {
                                        message.error('删除失败');
                                    });
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
                    <Table rowKey={'id'} columns={this.columns} dataSource={this.state.activitiesList} pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => {
                            this._loadData(pageNum);
                        }
                    }}>
                    </Table>
                </Card>
            </div>
        );
    }
}
