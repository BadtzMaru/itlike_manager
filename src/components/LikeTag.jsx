import React from "react";
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export default class LikeTag extends React.Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    };
    static propTypes = {
        tagsCallBack: PropTypes.func.isRequired,
        tagsArr: PropTypes.array,
    };
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.tagsArr) {
            this.setState({ tags: nextProps.tagsArr })
        }
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
        // 返回标签数组
        this.props.tagsCallBack(tags);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
        // 返回标签数组
        this.props.tagsCallBack(tags);
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <>
                <TweenOneGroup
                    enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                        onComplete: e => {
                            e.target.style = '';
                        },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                >
                    {tagChild}
                </TweenOneGroup>
                <div style={{ marginBottom: 10, display: tags.length ? 'block' : 'none' }} />
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} className="site-tag-plus">
                        <PlusOutlined /> 添加标签
                    </Tag>
                )}
            </>
        );
    }
}
