import React from 'react';
import {inject} from '@morningtrain/react-decorators';

@inject([])
export default class AvatarPreview extends React.Component {

    ///////////////////////////////
    /// Helpers
    ///////////////////////////////

    itemContent(category) {
        const item = this.props.items.get(category);

        return {
            __html: item ? item.get('content') : '',
        }
    }

    render() {
        return (
            <svg viewBox="0 0 100 100" className="avatar-preview">
                <g transform="translate(50 70)" dangerouslySetInnerHTML={this.itemContent('legs')}></g>
                <g transform="translate(50 50)" dangerouslySetInnerHTML={this.itemContent('arms')}></g>
                <g transform="translate(25 20)" dangerouslySetInnerHTML={this.itemContent('body')}></g>
                <g transform="translate(50 48)" dangerouslySetInnerHTML={this.itemContent('mouth')}></g>
                <g transform="translate(50 60)" dangerouslySetInnerHTML={this.itemContent('hat')}></g>
                <g transform="translate(50 40)" dangerouslySetInnerHTML={this.itemContent('eyes')}></g>
                <g transform="translate(50 70)" dangerouslySetInnerHTML={this.itemContent('accessories')}></g>
            </svg>
        );
    }

}
