import React from "react";
import {Card, Form, Input, Button, Divider, message} from 'antd';


import LikeUploadImg from "../../../components/LikeUploadImg";
import config from "../../../config/config";
import {getUser} from "../../../api/adminApi";
import {getObj} from "../../../tools/cache-tool";
import {editWebSite, getWebSiteInfo} from "../../../api/homeApi";

const {Item} = Form;
const {TextArea} = Input;

export default class HomeCommon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteLogoUrl: '',
        };
        this.homeFormRef = React.createRef();
    }

    componentDidMount() {
        // 获取网站配置信息
        getWebSiteInfo().then(result => {
            if (result && result.status === 1) {
                const homeItem = result.data;
                this.homeFormRef.current.setFieldsValue(homeItem);
                this.setState({
                    siteLogoUrl: homeItem.site_logo,
                });
            }
        }).catch(error => {
            message.error('获取网站配置信息失败');
        });
    }

    // 销毁组件前清空state内存
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    render() {
        const {siteLogoUrl} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
            }
        };
        const onFinish = (values) => {
            const {siteLogoUrl} = this.state;
            if (!siteLogoUrl) return message.warn('请上传网站LOGO');
            let {
                site_name,
                site_keyword,
                site_des,
                site_copy,
                site_bei,
            } = values;
            editWebSite(
                getUser().token,
                site_name,
                site_keyword,
                site_des,
                siteLogoUrl,
                site_copy,
                site_bei,
            ).then(result => {
                if (result && result.status === 1) {
                    message.success(result.msg);
                    this.props.history.goBack();
                }
            }).catch(error => {
                message.error('修改网站配置信息失败');
            });
        };
        return (
            <Card title={getObj('lifejob_tag') === 'add' ? "新增职场人生" : "编辑人生资源"}>
                <Form {...formItemLayout} onFinish={onFinish} ref={this.homeFormRef}>
                    <Item label={"网站标题"} name={"site_name"} rules={[{required: true, message: '请输入网站标题'}]}>
                        <Input placeholder={"请输入网站标题"}/>
                    </Item>
                    <Item label={"关键字"} name={"site_keyword"} rules={[{required: true, message: '请输入网站关键字'}]}>
                        <TextArea rows={2} placeholder={"请输入网站关键字"}/>
                    </Item>
                    <Item label={"描述"} name={"site_des"} rules={[{required: true, message: '请输入网站描述'}]}>
                        <TextArea rows={4} placeholder={"请输入网站描述"}/>
                    </Item>

                    <Item label={"网站LOGO"} name={"site_logo"}>
                        <LikeUploadImg upLoadBtnTitle={"上传LOGO"} upLoadName={"site_logo"}
                                       upLoadAction={"/api/auth/home/upload_home"}
                                       upLoadImg={siteLogoUrl ? config.BASE_URL + siteLogoUrl : ''}
                                       successCallBack={(name) => {
                                           this.setState({siteLogoUrl: name})
                                       }}/>
                    </Item>
                    <Item label={"版权信息"} name={"site_copy"} rules={[{required: true, message: '请输入网站版权信息'}]}>
                        <Input placeholder={"请输入网站版权信息"}/>
                    </Item>
                    <Item label={"备案号"} name={"site_bei"} rules={[{required: true, message: '请输入网站备案号'}]}>
                        <Input placeholder={"请输入网站备案号"}/>
                    </Item>
                    <Item wrapperCol={{span: 20}}>
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"}
                                    htmlType={"submit"}>立即提交</Button>
                            <Divider type={"vertical"}/>
                            <Button onClick={() => this.props.history.goBack()}>取消</Button>
                        </div>
                    </Item>
                </Form>
            </Card>
        );
    }
}
