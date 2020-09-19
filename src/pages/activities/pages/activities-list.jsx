import React from "react";
import {Card, Button, Table, Switch, Divider, Modal} from 'antd';

export default class LifeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList: [
                {
                    id: 1,
                    job_name: '新闻一',
                    job_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599719490298&di=857c67691d86eae71deb9bed8343f561&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Da9714efaaf86c91708035231f93c70c6%2Fddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg',
                    job_author: '张三',
                    is_focus: 0,
                },
                {
                    id: 2,
                    job_name: '新闻二',
                    job_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599719490298&di=857c67691d86eae71deb9bed8343f561&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Da9714efaaf86c91708035231f93c70c6%2Fddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg',
                    job_author: '李四',
                    is_focus: 1,
                },
            ],
            totalSize: 100,
            pageSize: 4,
        }
    }

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', width: 50, align: 'center'},
        {title: '幼教标题', dataIndex: 'job_name', align: 'center'},
        {
            title: '人生封面', dataIndex: 'job_img', render: (text) => {
                return (
                    <img src={text} alt="人生封面" style={{width: 100}}/>
                );
            }, align: 'center'
        },
        {title: '所属作者', dataIndex: 'job_author', align: 'center'},

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
                this.props.history.push('/lifejob/add-life');
            }}>添加人生资源</Button>
        );
        return (
            <div>
                <Card title={"职场人生列表"} extra={AddBtn}>
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
