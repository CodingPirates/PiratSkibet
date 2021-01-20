import React from 'react';

export default class AvatarCategory  extends React.Component {
    handleClick = () => {
        const callback = this.props.onClick;

        if (callback && typeof callback === 'function') {
            callback(this.props.value);
        }
    }

    render() {
        const {label, selected} = this.props;
        const className = selected ?
            'selected' : '';

        return (
            <div className={className} onClick={this.handleClick}>
                <p>{label}</p>
            </div>
        );
    }
}
