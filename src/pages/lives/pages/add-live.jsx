import React from "react";
import {Card, Form, Input, Select, Button, Divider,DatePicker} from 'antd';


import LikeUploadImg from "../../../components/LikeUploadImg";
import RichTextEditor from "../../../components/rich-text-editor";
import LikeTag from '../../../components/LikeTag';

const {Item} = Form;
const {Option} = Select;

export default class LiveAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // imageUrl: '',
            tags: [],
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
            }
        }

        // 从事件中获取文件列表
        // const normFile = e => {
        //     if (Array.isArray(e)) return e;
        //     return e && e.fileList;
        // }
        return (
            <Card title={"新增活动"}>
                <Form {...formItemLayout}>
                    <Item label={"活动名称"} name={"activities_name"} rules={[{required: true, message: '请输入活动名称'}]}>
                        <Input/>
                    </Item>
                    <Item label={"活动日期"} name={"activities_time"} rules={[{required: true, message: '请选择活动日期'}]}>
                        <DatePicker/>
                    </Item>
                    <Item label={"活动标签"} name={"activities_tag"}>
                        <LikeTag tagsCallBack={(tags)=>{this.setState({tags});}}/>
                    </Item>
                    <Item wrapperCol={{span: 20}}>
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"}>保存</Button>
                            <Divider type={"vertical"}/>
                            <Button onClick={() => this.props.history.goBack()}>取消</Button>
                        </div>
                    </Item>

                </Form>
            </Card>
        );
    }
}
