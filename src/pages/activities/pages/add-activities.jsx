import React from "react";
import {Card, Form, Input, Select, Button, Divider} from 'antd';

import LikeUploadImg from "../../../components/LikeUploadImg";
import RichTextEditor from "../../../components/rich-text-editor";

const {Item} = Form;
const {Option} = Select;

export default class AddLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // imageUrl: '',
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
            <Card title={"新增人生资源"}>
                <Form {...formItemLayout}>
                    <Item label={"人生名称"} name={"job_name"} rules={[{required: true, message: '请输入职场人生名称'}]}>
                        <Input/>
                    </Item>
                    <Item label={"人生名称"} name={"job_author"} rules={[{required: true, message: '请输入人生姓名'}]}>
                        <Input/>
                    </Item>
                    <Item label={"学前所属分类"} name={"job_pre_edu_id"} rules={[{required: true, message: '请选择学前所属分类'}]}>
                        <Select style={{width: 200}} placeholder={"请选择学前所属分类"}>
                            <Option value={1}>教学活动小助手1</Option>
                            <Option value={2}>教学活动小助手2</Option>
                            <Option value={3}>教学活动小助手3</Option>
                        </Select>
                    </Item>
                    <Item label={"所属家园分类"} name={"job_family_edu_id"} rules={[{required: true, message: '请选择所属家园分类'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属家园分类"}>
                            <Option value={1}>大班</Option>
                            <Option value={2}>中班</Option>
                            <Option value={3}>小班</Option>
                        </Select>
                    </Item>
                    <Item label={"人生封面图"} name={"job_img"} rules={[{required: true, message: '请选择人生封面图'}]}>
                        <LikeUploadImg upLoadBtnTitle={"上传封面图"} upLoadName={"job_img"} upLoadAction={"#"}
                                       successCallBack={() => {
                                       }} upLoadImg={''}/>
                    </Item>
                    <Item label={"焦点图"} name={"focus_img"}>
                        <LikeUploadImg upLoadBtnTitle={"上传焦点图"} upLoadName={"job_img"} upLoadAction={"#"}
                                       successCallBack={() => {
                                       }} upLoadImg={''}/>
                    </Item>
                    <Item label={"职场人生内容"} name={"job_content"} wrapperCol={{span:20}} rules={[{required:true,message:'请输入职场人生内容'}]}>
                        <RichTextEditor/>
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
