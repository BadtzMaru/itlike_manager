import React from "react";
import {Card, Button, Table, Switch, Divider, Modal, message, notification} from 'antd';
import {getLive, deleteLive, setFocusLive} from "../../../api/liveApi";
import config from "../../../config/config";

export default class LivesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveList: [],
            totalSize: 0,
            pageSize: 4,
            pageNum: 1,
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = (page_num = 1, page_size = 4) => {
        getLive(page_num, page_size).then(result => {
            if (result && result.status === 1) {
                message.success(result.msg);
                this.setState({
                    liveList: result.data.list,
                    totalSize: result.data.live_count,
                })
            }
        }).catch(() => {
            message.error('获取直播课程失败');
        });
    };
    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', width: 50, align: 'center'},
        {title: '直播课标题', dataIndex: 'live_title', align: 'center'},
        {
            title: '直播封面', dataIndex: 'live_img', render: (text) => {
                return (
                    <img src={config.BASE_URL + text} alt="直播封面" style={{width: 100}}/>
                );
            }, align: 'center'
        },
        {title: '开始时间', dataIndex: 'live_begin_time', align: 'center'},
        {title: '直播老师', dataIndex: 'live_author', align: 'center'},
        {title: '价格', dataIndex: 'live_price', align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', align: 'center', render: (text, record) => {
                return (
                    <Switch checkedChildren={"是"} unCheckedChildren={record.focus_img ? '否' : '无'}
                            defaultChecked={text === 1} disabled={!record.focus_img} onChange={(checked) => {
                        setFocusLive(record.id, checked ? 1 : 0).then(result => {
                            if (result && result.status === 1) {
                                notification['success']({
                                    message: `直播课程:${record.live_title}`,
                                    description: `${checked ? '设置为' : '取消'}焦点课程`,
                                });
                                record.is_focus = checked ? 1 : 0;
                            }
                        });
                    }}/>);
            }
        }, {
            title: '操作', align: 'center', render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            this.props.history.push({
                                pathname: '/live/edit-live',
                                state: {
                                    live: record
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
                                    deleteLive(record.id).then(result => {
                                        if (result && result.status === 1) {
                                            message.success(result.msg);
                                            this._loadData(this.state.pageNum, this.state.pageSize);
                                        } else {
                                            message.error('删除失败');
                                        }
                                    }).catch(() => {
                                        message.error('删除失败');
                                    })
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
                this.props.history.push('/live/add-live');
            }}>添加直播</Button>
        );
        return (
            <div>
                <Card title={"直播列表"} extra={AddBtn}>
                    <Table rowKey={'id'} columns={this.columns} dataSource={this.state.liveList} pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => this._loadData(pageNum)
                    }}>
                    </Table>
                </Card>
            </div>
        );
    }
}
