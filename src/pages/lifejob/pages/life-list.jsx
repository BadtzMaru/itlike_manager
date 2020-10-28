import React from "react";
import {Card, Button, Table, Switch, Divider, Modal, message, notification} from 'antd';
import config from "../../../config/config";
import {deleteJob, getJobList, setFocusJob} from "../../../api/lifejobApi";
import {saveObj} from "../../../tools/cache-tool";

export default class LifeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lifeList: [],
            totalSize: 0,
            pageSize: 4,
        };
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = (page_num = 1, page_size = 4) => {
        getJobList(page_num, page_size).then(result => {
            if (result && result.status === 1) {
                message.success(result.msg);
                this.setState({
                    lifeList: result.data.job_list,
                    totalSize: result.data.job_count,
                });
            }
        }).catch(() => {
            message.error('获取人生列表失败');
        });
    };
    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', width: 50, align: 'center'},
        {title: '幼教标题', dataIndex: 'job_name', align: 'center'},
        {
            title: '人生封面', dataIndex: 'job_img', render: (text) => {
                return (
                    <img src={text ? config.BASE_URL + text : ''} alt="人生封面" style={{width: 100}}/>
                );
            }, align: 'center'
        },
        {title: '所属作者', dataIndex: 'job_author', align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', render: (text, record) => {
                return (
                    <Switch checkedChildren={"是"} unCheckedChildren={"否"} defaultChecked={text === 1}
                            disabled={!record.focus_img} onChange={checked => {
                        setFocusJob(record.id, checked ? 1 : 0).then(result => {
                            if (result && result.status === 1) {
                                notification['success']({
                                    message: `职场人生:${record.job_name}`,
                                    description: `${checked ? '设置为' : '取消'}焦点课程`,
                                });
                                record.is_focus = checked ? 1 : 0;
                            }
                        });
                    }}/>
                );
            }, align: 'center'
        },
        {
            title: '操作', align: 'center', render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            // 本地存储一个tag
                            saveObj('lifejob_tag', 'edit');
                            this.props.history.push({
                                pathname: '/lifejob/add-edit',
                                state: {
                                    job: record,
                                }
                            });
                        }}>编辑</Button>
                        <Divider type="vertical"/>
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认删除吗',
                                content: '删除此资源所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    deleteJob(record.id).then(result => {
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
                // 本地存储一个tag
                saveObj('lifejob_tag', 'add');
                this.props.history.push('/lifejob/add-edit');
            }}>添加人生资源</Button>
        );
        return (
            <div>
                <Card title={"职场人生列表"} extra={AddBtn}>
                    <Table rowKey={'id'} columns={this.columns} dataSource={this.state.lifeList} pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => {
                            this._loadData(pageNum, pageSize);
                        }
                    }}>
                    </Table>
                </Card>
            </div>
        );
    }
}
