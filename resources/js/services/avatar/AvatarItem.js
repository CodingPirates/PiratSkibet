import React from 'react';
import {inject} from '@morningtrain/react-decorators';

export default
@inject(["model"])
class AvatarItem extends React.Component {
    render() {
        const {model} = this.props;
        const content = {
            __html: model.get('content'),
        };

        if (this.props.wrapper) {
            return (
                <div className={'avatar-item'}>
                    <svg viewBox={model.get('svg_viewbox')} preserveAspectRatio="xMidYMid meet">
                        <g transform={`translate(${model.get('svg_translate')})`} dangerouslySetInnerHTML={content}></g>
                    </svg>
                </div>
            )
        } else {
            return (
                <svg viewBox={model.get('svg_viewbox')} preserveAspectRatio="xMidYMid meet">
                    <g transform={`translate(${model.get('svg_translate')})`} dangerouslySetInnerHTML={content}></g>
                </svg>
            );
        }
    }
}
