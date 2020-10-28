import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import config from '../config/config';

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('请上传JPG/PNG图片!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('上传图片大小不能超过2MB!');
	}
	return isJpgOrPng && isLt2M;
}

class LikeUploadImg extends React.Component {
	state = { loading: false, imageUrl: '' };
	static propTypes = {
		upLoadBtnTitle: PropTypes.string.isRequired, // 上传图片的按钮文字
		upLoadName: PropTypes.string.isRequired, // 上传图片的key
		upLoadAction: PropTypes.string.isRequired, // 上传图片的接口路径
		successCallBack: PropTypes.func.isRequired,
		upLoadImg: PropTypes.string,
	};

	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.upLoadImg) {
			this.setState({
				imageUrl: nextProps.upLoadImg,
			});
		}
	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (
			info.file.response &&
			info.file.status === 'done' &&
			info.file.response.status === 1
		) {
			const name = info.file.response.data.name;
			// 把结果返回
			this.setState({
				imgUrl: config.BASE_URL + name,
				loading: false,
			});
			this.props.successCallBack(name);
		}
	};

	render() {
		const { loading, imageUrl } = this.state;
		const { upLoadBtnTitle, upLoadName, upLoadAction } = this.props;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>{upLoadBtnTitle}</div>
			</div>
		);
		return (
			<Upload
				name={upLoadName}
				listType='picture-card'
				className='avatar-uploader'
				showUploadList={false}
				action={upLoadAction}
				beforeUpload={beforeUpload}
				onChange={this.handleChange}
			>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt='avatar'
						style={{ width: '100%' }}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		);
	}
}

export default LikeUploadImg;
