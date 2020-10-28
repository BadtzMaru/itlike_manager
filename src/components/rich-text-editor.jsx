import React from 'react';
import PropTypes from 'prop-types';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { Upload, Button } from 'antd';
import { ContentUtils } from 'braft-utils';
import config from '../config/config';

export default class RichTextEditor extends React.Component {
	static propTypes = {
		uploadName: PropTypes.string.isRequired,
		upLoadAction: PropTypes.string.isRequired,
		htmlContent: PropTypes.string,
	};
	state = {
		// 创建一个空的editorState作为初始值
		editorState: BraftEditor.createEditorState(null),
	};
	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.htmlContent) {
			this.setState({
				editorState: BraftEditor.createEditorState(
					nextProps.htmlContent
				),
			});
		}
	}

	getContent = () => {
		return this.state.editorState.toHTML();
	};
	submitContent = async () => {
		// 在编辑器获得焦点时按下ctrl+s会执行此方法
		// 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
		// const htmlContent = this.state.editorState.toHTML()
		// const result = await saveEditorContent(htmlContent)
	};

	handleEditorChange = (editorState) => {
		this.setState({ editorState });
	};
	editorControls = [
		'undo',
		'redo',
		'separator',
		'font-size',
		'line-height',
		'letter-spacing',
		'separator',
		'text-color',
		'bold',
		'italic',
		'underline',
		'strike-through',
		'separator',
		'superscript',
		'subscript',
		'remove-styles',
		'emoji',
		'separator',
		'text-indent',
		'text-align',
		'separator',
		'headings',
		'list-ul',
		'list-ol',
		'blockquote',
		'code',
		'separator',
		'link',
		'separator',
		'hr',
		'separator',
		'separator',
		'clear',
	];
	uploadHandler = (info) => {
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
			this.setState({
				editorState: ContentUtils.insertMedias(this.state.editorState, [
					{
						type: 'IMAGE',
						url: config.BASE_URL + name,
					},
				]),
			});
		}
	};
	extendControls = [
		{
			key: 'antd-uploader', // 控件唯一标识，必传
			type: 'component',
			component: (
				<Upload
					action={this.props.upLoadAction}
					name={this.props.uploadName}
					onChange={this.uploadHandler}
					showUploadList={false}
				>
					<Button
						type={'button'}
						className={'control-item button upload-button'}
						data-title={'插入图片'}
					>
						插入图片
					</Button>
				</Upload>
			),
		},
	];

	render() {
		const { editorState } = this.state;
		return (
			<div className='my-component'>
				<BraftEditor
					controls={this.editorControls}
					extendControls={this.extendControls}
					value={editorState}
					onChange={this.handleEditorChange}
					onSave={this.submitContent}
					style={{ border: '1px solid lightgray' }}
				/>
			</div>
		);
	}
}
