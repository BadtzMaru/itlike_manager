import React from 'react';
import {
	Card,
	Form,
	Input,
	Select,
	Button,
	Divider,
	DatePicker,
	message,
	Switch,
} from 'antd';
import Moment from 'moment';

import LikeUploadImg from '../../../components/LikeUploadImg';
import config from '../../../config/config';
import { editLive, getLivePerson, getLiveTheme } from '../../../api/liveApi';
import { getUser } from '../../../api/adminApi';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default class EditLive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
			focusImgUrl: '',
			live_theme: [],
			live_person: [],
			live_id: '',
		};
		// ref绑定表单
		this.liveFormRef = React.createRef();
	}

	componentDidMount() {
		if (this.props.location.state) {
			const liveItem = this.props.location.state.live;
			const {
				id,
				live_title,
				live_author,
				live_begin_time,
				live_end_time,
				live_url,
				live_price,
				live_person_id,
				live_theme_id,
				is_focus,
				live_img,
				focus_img,
			} = liveItem;
			if (liveItem) {
				this.liveFormRef.current.setFieldsValue({
					live_title,
					live_author,
					live_time: [Moment(live_begin_time), Moment(live_end_time)],
					live_url,
					live_price,
					live_person_id,
					live_theme_id,
					is_focus: is_focus === 1,
				});
			}
			this.setState({
				imageUrl: live_img,
				focusImgUrl: focus_img,
				live_id: id,
			});
		}
		getLivePerson()
			.then((result) => {
				if (result && result.status === 1) {
					this.setState({
						live_person: result.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		getLiveTheme()
			.then((result) => {
				if (result && result.status === 1) {
					this.setState({
						live_theme: result.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { imageUrl, focusImgUrl, live_person, live_theme } = this.state;
		const formItemLayout = {
			labelCol: { xs: { span: 4 } },
			wrapperCol: { xs: { span: 12 } },
		};

		const onFinish = (values) => {
			const { imageUrl, focusImgUrl, live_id } = this.state;
			const {
				live_title,
				live_author,
				live_price,
				live_person_id,
				live_theme_id,
				is_focus,
				live_url,
			} = values;
			if (!imageUrl) return message.warning('请上传直播封面');
			// 开始时间和结束时间
			const live_begin_time = Moment(values.live_time[0]).format(
				'YYYY-MM-DD HH:mm:ss'
			);
			const live_end_time = Moment(values.live_time[1]).format(
				'YYYY-MM-DD HH:mm:ss'
			);
			// 调用接口
			editLive(
				getUser().token,
				live_id,
				live_title,
				live_author,
				imageUrl,
				live_begin_time,
				live_end_time,
				live_price,
				live_person_id,
				live_theme_id,
				is_focus ? 1 : 0,
				focusImgUrl,
				live_url
			)
				.then((result) => {
					if (result && result.status === 1) {
						message.success(result.msg);
						this.props.history.goBack();
					}
				})
				.catch(() => {
					message.error('编辑直播课失败');
				});
		};
		return (
			<Card title={'编辑直播课'}>
				<Form
					{...formItemLayout}
					onFinish={onFinish}
					ref={this.liveFormRef}
				>
					<Item
						label={'直播名称'}
						name={'live_title'}
						rules={[{ required: true, message: '请输入直播名称' }]}
					>
						<Input />
					</Item>
					<Item
						label={'直播老师'}
						name={'live_author'}
						rules={[{ required: true, message: '请输入直播老师' }]}
					>
						<Input />
					</Item>
					<Item
						label={'直播价格'}
						name={'live_price'}
						rules={[{ required: true, message: '请输入直播价格' }]}
					>
						<Input type={'number'} />
					</Item>
					<Item
						label={'直播时间'}
						name={'live_time'}
						rules={[{ required: true, message: '请选择直播时间' }]}
					>
						<RangePicker showTime />
					</Item>
					<Item
						wrapperCol={{ span: 5 }}
						label={'适用人群'}
						name={'live_person_id'}
						rules={[{ required: true, message: '请选择适用人群' }]}
					>
						<Select placeholder={'请选择适用人群'}>
							{live_person.map((item) => {
								return (
									<Option value={item.id} key={item.id}>
										{item.live_person_name}
									</Option>
								);
							})}
						</Select>
					</Item>
					<Item
						wrapperCol={{ span: 5 }}
						label={'内容主题'}
						name={'live_theme_id'}
						rules={[{ required: true, message: '请选择内容主题' }]}
					>
						<Select placeholder={'请选择内容主题'}>
							{live_theme.map((item) => {
								return (
									<Option value={item.id} key={item.id}>
										{item.live_theme_title}
									</Option>
								);
							})}
						</Select>
					</Item>
					<Item
						label={'直播地址'}
						name={'live_url'}
						rules={[{ required: true, message: '请输入直播地址' }]}
					>
						<Input />
					</Item>
					<Item label={'直播封面'} name={'live_img'}>
						<LikeUploadImg
							upLoadBtnTitle={'上传封面'}
							upLoadName={'live_img'}
							upLoadAction={'/api/auth/live/upload_live'}
							upLoadImg={
								imageUrl ? config.BASE_URL + imageUrl : ''
							}
							successCallBack={(name) => {
								message.success('直播课程封面上传成功');
								this.setState({ imageUrl: name });
							}}
						/>
					</Item>
					<Item label={'首页封面'} name={'focus_img'}>
						<LikeUploadImg
							upLoadBtnTitle={'上传焦点图'}
							upLoadName={'live_img'}
							upLoadAction={'/api/auth/live/upload_live'}
							upLoadImg={
								focusImgUrl ? config.BASE_URL + focusImgUrl : ''
							}
							successCallBack={(name) => {
								message.success('直播课程焦点图上传成功');
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
					<Item wrapperCol={{ span: 20 }}>
						<div style={{ textAlign: 'center', marginTop: 30 }}>
							<Button type={'primary'} htmlType='submit'>
								修改
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
