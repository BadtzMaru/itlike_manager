import React from "react";
import {Card, Form, Input, Select, Upload, message, Button, Divider, Switch} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import Moment from 'moment';

import LikeUploadImg from "../../../components/LikeUploadImg";
import config from "../../../config/config";
import {
    addResource,
    getResourceArea,
    getResourceCategory,
    getResourceClasses,
    getResourceFormat,
    getResourceMate
} from "../../../api/resourceApi";
import {getUser} from "../../../api/adminApi";

const {Item} = Form;
const {Option} = Select;
const {Dragger} = Upload;

export default class AddResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            focusImgUrl: '',
            dragFileList: [],   // 存放上传文件,
            resource_category: [],
            resource_classes: [],
            resource_format: [],
            resource_mate: [],
            resource_area: [],
        }
    }

    componentDidMount() {
        getResourceCategory().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    resource_category: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceArea().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    resource_area: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceClasses().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    resource_classes: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceFormat().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    resource_format: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceMate().then(result => {
            if (result && result.status === 1) {
                this.setState({
                    resource_mate: result.data,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {imageUrl, focusImgUrl, resource_category, resource_classes, resource_area, resource_format, resource_mate} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
            }
        };
        const onFinish = (values) => {
            const {imageUrl, focusImgUrl, dragFileList} = this.state;
            if (!dragFileList.length) return message.warn('请上传资源文件');
            let {resource_name, resource_author, resource_category_id, resource_classes_id, resource_area_id, resource_mate_id, resource_format_id, resource_price, is_focus} = values;
            if (!imageUrl) return message.warn('请上传资源封面');
            // 生成创建日期
            const resource_publish_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            addResource(
                getUser().token,
                resource_name,
                resource_author,
                resource_publish_time,
                dragFileList, // resource_content,
                resource_category_id,
                resource_classes_id,
                resource_area_id,
                resource_mate_id,
                resource_format_id,
                imageUrl,
                resource_price,
                is_focus ? 1 : 0,
                focusImgUrl,
            ).then(result => {
                if (result?.status === 1) {
                    message.success('添加资源成功');
                    this.props.history.goBack();
                }
            }).catch(() => {
                message.error('添加资源失败');
            });
        };
        return (
            <Card title={"新增幼教资源"}>
                <Form {...formItemLayout} onFinish={onFinish}>
                    <Item label={"资源名称"} name={"resource_name"} rules={[{required: true, message: '请输入资源名称'}]}>
                        <Input/>
                    </Item>
                    <Item label={"资源作者"} name={"resource_author"} rules={[{required: true, message: '请输入作者姓名'}]}>
                        <Input/>
                    </Item>
                    <Item label={"所属分类"} name={"resource_category_id"} rules={[{required: true, message: '请选择所属分类'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属分类"}>
                            {resource_category.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.category_name}</Option>);
                            })}
                        </Select>
                    </Item>
                    <Item label={"所属班级"} name={"resource_classes_id"} rules={[{required: true, message: '请选择所属班级'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属班级"}>
                            {resource_classes.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.classes_name}</Option>);
                            })}
                        </Select>
                    </Item>
                    <Item label={"所属领域"} name={"resource_area_id"} rules={[{required: true, message: '请选择所属领域'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属领域"}>
                            {resource_area.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.area_name}</Option>);
                            })}
                        </Select>
                    </Item>
                    <Item label={"素材选择"} name={"resource_mate_id"} rules={[{required: true, message: '请选择所属素材'}]}>
                        <Select style={{width: 200}} placeholder={"请选择所属领域"}>
                            {resource_mate.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.mate_name}</Option>);
                            })}
                        </Select>
                    </Item>
                    <Item label={"格式选择"} name={"resource_format_id"} rules={[{required: true, message: '请选择素材格式'}]}>
                        <Select style={{width: 200}} placeholder={"请选择素材格式"}>
                            {resource_format.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.format_name}</Option>);
                            })}
                        </Select>
                    </Item>
                    <Item label={"资源价格"} name={"resource_price"} rules={[{required: true, message: '请输入资源价格'}]}>
                        <Input type={"number"} style={{width: 120}}/>
                    </Item>
                    <Item label={"资源封面图"} name={"resource_img"}>
                        <LikeUploadImg upLoadName={"resource_upload_img"}
                                       upLoadImg={imageUrl ? config.BASE_URL + imageUrl : ''}
                                       upLoadAction={"/api/auth/resource/upload_resource"}
                                       upLoadBtnTitle={"上传封面"} successCallBack={(name) => {
                            this.setState({imageUrl: name});
                        }}/>
                    </Item>
                    <Item label={"首页轮播图"} name={"focus_img"}>
                        <LikeUploadImg upLoadName={"resource_upload_img"}
                                       upLoadImg={focusImgUrl ? config.BASE_URL + focusImgUrl : ''}
                                       upLoadAction={"/api/auth/resource/upload_resource"}
                                       upLoadBtnTitle={"上传焦点图"} successCallBack={(name) => {
                            this.setState({focusImgUrl: name});
                        }}/>
                    </Item>
                    <Item label={"是否设置焦点"} name={"is_focus"} valuePropName={"checked"}>
                        <Switch checkedChildren="是" unCheckedChildren="否" disabled={!focusImgUrl}/>
                    </Item>
                    <Item label={"幼教资源"} name={"resource_content"} valuePropName={"filelist"}>
                        <Dragger
                            name={"resource_file"}
                            multiple={true}
                            action={"/api/auth/resource/upload_many_file"}
                            onChange={info => {
                                const {status} = info.file;
                                if (status !== 'uploading') {
                                    // console.log(info.file, info.fileList);
                                }
                                if (status === 'done') {
                                    if (info.file.response && info.file.response.status === 1) {
                                        const dragFileList = this.state.dragFileList;
                                        dragFileList.push(info.file.response.data);
                                        this.setState({dragFileList});
                                    }
                                    message.success(`${info.file.name} 文件上传成功!`);
                                } else if (status === 'error') {
                                    message.error(`${info.file.name} 文件上传失败!`);
                                }
                            }}
                            onRemove={(info) => {
                                let dragFileList = this.state.dragFileList;
                                dragFileList = dragFileList.filter(item => {
                                    return item.uid !== info.response.data.uid;
                                });
                                this.setState({dragFileList});
                            }}
                        >
                            <p className="ant-upload-drag-icon"><InboxOutlined/></p>
                            <p className="ant-upload-text">单击或者拖动文件到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或多个文件上传</p>
                        </Dragger>
                    </Item>
                    <Item wrapperCol={{span: 20}}>
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"} htmlType={"submit"}>保存</Button>
                            <Divider type={"vertical"}/>
                            <Button onClick={() => this.props.history.goBack()}>取消</Button>
                        </div>
                    </Item>
                </Form>
            </Card>
        );
    }
}
