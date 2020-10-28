import React from "react";
import {Card, Form, Input, Select, Button, Divider, message, Switch} from 'antd';
import Moment from "moment";


import LikeUploadImg from "../../../components/LikeUploadImg";
import RichTextEditor from "../../../components/rich-text-editor";
import {getJobPre, getJobFamily, addJob, editJob} from "../../../api/lifejobApi";
import config from "../../../config/config";
import {getUser} from "../../../api/adminApi";
import {getObj} from "../../../tools/cache-tool";

const {Item} = Form;
const {Option} = Select;

export default class AddEditLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 页面渲染使用
            job_pre: [],
            job_family: [],
            // form数据
            id: '',
            job_content: '',
            imageUrl: '',
            focusImgUrl: '',
        };
        this.lifejobFormRef = React.createRef();
        this.lifejob_ref = React.createRef();
    }

    componentDidMount() {
        // 0.刷新页面处理
        if (getObj('lifejob_tag') === 'edit' && !this.props.location.state) {
            this.props.history.goBack();
        }
        // 1. 获取上一个界面传递的数据
        if (this.props.location.state) {
            const jobItem = this.props.location.state.job;
            if (jobItem) {
                this.lifejobFormRef.current.setFieldsValue(jobItem);
                this.setState({
                    id: jobItem.id,
                    job_content: jobItem.job_content,
                    imageUrl: jobItem.job_img,
                    focusImgUrl: jobItem.focus_img,
                });
            }
        }
        getJobPre().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    job_pre: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getJobFamily().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    job_family: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    // 销毁组件前清空state内存
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    render() {
        const {imageUrl, focusImgUrl, job_pre, job_family, id} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
            }
        };
        const onFinish = (values) => {
            const {imageUrl, focusImgUrl} = this.state;
            if (!imageUrl) return message.warn('请上传活动封面');
            let {
                job_name,
                job_author,
                job_pre_edu_id,
                job_family_edu_id,
                is_focus,
            } = values;
            let job_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 获取富文本中的内容
            let job_content = this.lifejob_ref.current.getContent();
            // 调用添加活动API
            if (id) {
                editJob(
                    getUser().token,
                    id,
                    job_name,
                    imageUrl,
                    job_author,
                    job_time,
                    job_content,
                    job_pre_edu_id,
                    job_family_edu_id,
                    is_focus ? '1' : '0',
                    focusImgUrl,
                ).then(result => {
                    if (result?.status === 1) {
                        message.success('修改职场人生成功');
                        this.props.history.goBack();
                    }
                }).catch(() => {
                    message.error('修改职场人生失败');
                });
            } else {
                addJob(
                    getUser().token,
                    job_name,
                    imageUrl,
                    job_author,
                    job_time,
                    job_content,
                    job_pre_edu_id,
                    job_family_edu_id,
                    is_focus ? 1 : 0,
                    focusImgUrl,
                ).then(result => {
                    if (result?.status === 1) {
                        message.success('添加职场人生成功');
                        this.props.history.goBack();
                    }
                }).catch(() => {
                    message.error('添加职场人生失败');
                });
            }
        };
        return (
            <Card title={getObj('lifejob_tag') === 'add' ? "新增职场人生" : "编辑人生资源"}>
                <Form {...formItemLayout} onFinish={onFinish} ref={this.lifejobFormRef}>
                    <Item label={"人生名称"} name={"job_name"} rules={[{required: true, message: '请输入职场人生名称'}]}>
                        <Input/>
                    </Item><Item label={"人生作者"} name={"job_author"} rules={[{required: true, message: '请输入职场人生作者'}]}>
                    <Input/>
                </Item>
                    <Item label={"学前所属分类"} name={"job_pre_edu_id"} rules={[{required: true, message: '请选择学前所属分类'}]}>
                        <Select style={{width: 200}} placeholder={"请选择学前所属分类"}>
                            {job_pre.map(item => (
                                <Option key={item.id} value={item.id}>{item.pre_edu_name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item label={"所属家园分类"} name={"job_family_edu_id"} rules={[{required: true, message: '请选择所属家园分类'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属家园分类"}>
                            {job_family.map(item => (
                                <Option key={item.id} value={item.id}>{item.job_family_name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item label={"人生封面图"} name={"job_img"}>
                        <LikeUploadImg upLoadBtnTitle={"上传封面图"} upLoadName={"lifejob_img"}
                                       upLoadAction={"/api/auth/lifejob/upload_lifejob"}
                                       upLoadImg={imageUrl ? config.BASE_URL + imageUrl : ''}
                                       successCallBack={(name) => {
                                           this.setState({imageUrl: name})
                                       }}/>
                    </Item>
                    <Item label={"焦点图"} name={"focus_img"}>
                        <LikeUploadImg upLoadBtnTitle={"上传焦点图"} upLoadName={"lifejob_img"}
                                       upLoadAction={"/api/auth/lifejob/upload_lifejob"}
                                       upLoadImg={focusImgUrl ? config.BASE_URL + focusImgUrl : ''}
                                       successCallBack={(name) => {
                                           this.setState({focusImgUrl: name})
                                       }}/>
                    </Item>
                    <Item label={"是否设置焦点"} name={"is_focus"} valuePropName={"checked"}>
                        <Switch checkedChildren="是" unCheckedChildren="否" disabled={!focusImgUrl}/>
                    </Item>
                    <Item label={"职场人生内容"} name={"job_content"} wrapperCol={{span: 20}}>
                        <RichTextEditor uploadName={"lifejob_img"} upLoadAction={"/api/auth/lifejob/upload_lifejob"}
                                        htmlContent={this.state.job_content}
                                        ref={this.lifejob_ref}/>
                    </Item>
                    <Item wrapperCol={{span: 20}}>
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"}
                                    htmlType={"submit"}>{getObj('lifejob_tag') === 'add' ? "添加" : "修改"}</Button>
                            <Divider type={"vertical"}/>
                            <Button onClick={() => this.props.history.goBack()}>取消</Button>
                        </div>
                    </Item>

                </Form>
            </Card>
        );
    }
}
