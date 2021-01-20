import React from 'react';
import {inject} from '@morningtrain/react-decorators';
import AvatarItem from './AvatarItem';

export default
@inject(["model"])
class AvatarItemOption extends React.Component {

    handleClick = () => {
        const callback = this.props.onOptionChange;

        if (callback && typeof callback === 'function') {
            callback(this.props.model);
        }
    }

    get isSelected() {
        const {selected, model} = this.props;
        const id = model.get('id');

        if (!id || !selected) return false;

        for (let val of selected.values()) {
            if (val === id) return true;
        }

        return false;
    }

    get className() {
        return [
                'avatar-item-option',
                this.props.model.get('is_public') ? null : 'unlocked',
                this.isSelected ? 'selected' : null,
            ]
            .filter(e => e)
            .join(' ');
    }

    render() {
        return (
            <div onClick={this.handleClick} className={this.className} >
                <AvatarItem/>
            </div>
        );
    }
}
