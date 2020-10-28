import React from 'react';
import {
	Card,
	Form,
	Input,
	Button,
	Divider,
	DatePicker,
	Select,
	message,
	Switch,
} from 'antd';
import Moment from 'moment';

import RichTextEditor from '../../../components/rich-text-editor';
import LikeTag from '../../../components/LikeTag';
import LikeUploadImg from '../../../components/LikeUploadImg';
import config from '../../../config/config';
import {
	getActivitiesAddress,
	getActivitiesObject,
	getActivitiesBus,
	addActivities,
} from '../../../api/activitiesApi';
import { getUser } from '../../../api/adminApi';

const { Item } = Form;
const { Option } = Select;

export default class AddActivities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
			focusImgUrl: '',
			activities_address: [],
			activities_object: [],
			activities_bus: [],
			tags: [],
		};
		this.activities_intro_ref = React.createRef();
		this.activities_trip_ref = React.createRef();
		this.activities_days_ref = React.createRef();
		this.activities_notice_ref = React.createRef();
	}

	componentDidMount() {
		getActivitiesBus()
			.then((result) => {
				if (result && result.status === 1) {
					this.setState({
						activities_bus: result.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		getActivitiesObject()
			.then((result) => {
				if (result && result.status === 1) {
					this.setState({
						activities_object: result.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		getActivitiesAddress()
			.then((result) => {
				if (result && result.status === 1) {
					this.setState({
						activities_address: result.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 12 },
			},
		};
		const {
			imageUrl,
			focusImgUrl,
			activities_address,
			activities_object,
			activities_bus,
		} = this.state;
		const onFinish = (values) => {
			console.log(values);
			const { imageUrl, focusImgUrl, tags } = this.state;
			if (!imageUrl) return message.warn('请上传活动封面');
			const activities_time = Moment(values.activities_time).format(
				'YYYY-MM-DD HH:mm:ss'
			);
			const {
				activities_name,
				activities_price,
				activities_address_id,
				activities_object_id,
				activities_bus_day_id,
				activities_count,
				is_focus,
			} = values;
			let tagStr = tags.join(',');
			// 获取富文本中的内容
			let activities_intro = this.activities_intro_ref.current.getContent();
			let activities_trip = this.activities_trip_ref.current.getContent();
			let activities_day = this.activities_days_ref.current.getContent();
			let activities_notice = this.activities_notice_ref.current.getContent();
			console.log(activities_intro);
			// 调用添加活动API
			addActivities(
				getUser().token,
				activities_name,
				activities_time,
				imageUrl,
				activities_price,
				tagStr,
				activities_count,
				activities_address_id,
				activities_object_id,
				activities_bus_day_id,
				activities_intro,
				activities_trip,
				activities_day,
				activities_notice,
				is_focus ? 1 : 0,
				focusImgUrl
			)
				.then((result) => {
					console.log(result);
					if (result?.status === 1) {
						message.success('添加活动成功');
						this.props.history.goBack();
					}
				})
				.catch(() => {
					message.error('添加活动失败');
				});
		};
		return (
			<Card title={'新增活动'}>
				<Form {...formItemLayout} onFinish={onFinish}>
					<Item
						label={'活动名称'}
						name={'activities_name'}
						rules={[{ required: true, message: '请输入活动名称' }]}
					>
						<Input />
					</Item>
					<Item
						label={'活动日期'}
						name={'activities_time'}
						rules={[{ required: true, message: '请选择活动日期' }]}
					>
						<DatePicker />
					</Item>
					<Item
						label={'活动价格'}
						name={'activities_price'}
						rules={[{ required: true, message: '请输入活动价格' }]}
					>
						<Input type={'number'} />
					</Item>
					<Item
						label={'报名人数'}
						name={'activities_count'}
						rules={[{ required: true, message: '请输入活动价格' }]}
					>
						<Input type={'number'} />
					</Item>
					<Item
						label={'活动地点'}
						name={'activities_address_id'}
						rules={[{ required: true, message: '请选择活动地点' }]}
					>
						<Select
							style={{ width: 200 }}
							placeholder={'请选择活动地点'}
						>
							{activities_address.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.activities_address}
								</Option>
							))}
						</Select>
					</Item>
					<Item
						label={'招生对象'}
						name={'activities_object_id'}
						rules={[{ required: true, message: '请选择招生对象' }]}
					>
						<Select
							style={{ width: 200 }}
							placeholder={'请选择招生对象'}
						>
							{activities_object.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.activities_object_name}
								</Option>
							))}
						</Select>
					</Item>
					<Item
						label={'选择营期'}
						name={'activities_bus_day_id'}
						rules={[{ required: true, message: '请选择营期' }]}
					>
						<Select
							style={{ width: 200 }}
							placeholder={'请选择营期'}
						>
							{activities_bus.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.activities_bus_day}
								</Option>
							))}
						</Select>
					</Item>
					<Item label={'活动标签'}>
						<LikeTag
							tagsCallBack={(tags) => {
								this.setState({ tags });
							}}
						/>
					</Item>
					<Item label={'活动封面图'} name={'activities_img'}>
						<LikeUploadImg
							upLoadBtnTitle={'上传封面'}
							upLoadName={'activities_img'}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							upLoadImg={
								imageUrl ? config.BASE_URL + imageUrl : ''
							}
							successCallBack={(name) => {
								message.success('活动封面上传成功');
								this.setState({ imageUrl: name });
							}}
						/>
					</Item>
					<Item label={'首页轮播图'} name={'focus_img'}>
						<LikeUploadImg
							upLoadBtnTitle={'上传焦点图'}
							upLoadName={'activities_img'}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							upLoadImg={
								focusImgUrl ? config.BASE_URL + focusImgUrl : ''
							}
							successCallBack={(name) => {
								message.success('活动焦点图上传成功');
								this.setState({ focusImgUrl: name });
							}}
						/>
					</Item>
					<Item
						label={'是否设置焦点'}
						name={'is_focus'}
						valuePropName={'checked'}
					>
						<Switch
							checkedChildren='是'
							unCheckedChildren='否'
							disabled={!focusImgUrl}
						/>
					</Item>
					<Item
						label={'活动介绍'}
						name={'activities_intro'}
						wrapperCol={{ span: 20 }}
					>
						<RichTextEditor
							ref={this.activities_intro_ref}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							uploadName={'activities_img'}
						/>
					</Item>
					<Item
						label={'行程安排'}
						name={'activities_trip'}
						wrapperCol={{ span: 20 }}
					>
						<RichTextEditor
							ref={this.activities_trip_ref}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							uploadName={'activities_img'}
						/>
					</Item>
					<Item
						label={'开营日期'}
						name={'activities_days'}
						wrapperCol={{ span: 20 }}
					>
						<RichTextEditor
							ref={this.activities_days_ref}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							uploadName={'activities_img'}
						/>
					</Item>
					<Item
						label={'注意事项'}
						name={'activities_notice'}
						wrapperCol={{ span: 20 }}
					>
						<RichTextEditor
							ref={this.activities_notice_ref}
							upLoadAction={
								'/api/auth/activities/upload_activities'
							}
							uploadName={'activities_img'}
						/>
					</Item>
					<Item wrapperCol={{ span: 20 }}>
						<div style={{ textAlign: 'center', marginTop: 30 }}>
							<Button type={'primary'} htmlType={'submit'}>
								保存
							</Button>
							<Divider type={'vertical'} />
							<Button onClick={() => this.props.history.goBack()}>
								取消
							</Button>
						</div>
					</Item>
				</Form>
			</Card>
		);
	}
}
