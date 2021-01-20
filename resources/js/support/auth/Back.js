import React from 'react';
const {inject} = require("@morningtrain/react-decorators");

@inject(['model'])
export default class Back extends React.Component {

    onClick() {
        const {onClick, model} = this.props;

        if (typeof onClick === "function") {
            model.set('step', onClick(model.get('step')));
        }
    }

    render() {
        const {className, label} = this.props;

        return (
            <button type="button" className={className} onClick={this.onClick.bind(this)}>{label}</button>
        );
    }
}
