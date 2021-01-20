import React from "react";
import {inject} from "@morningtrain/react-decorators";
import AfterExecute from "support/conditionals/AfterExecute";
import {isObservable, observe} from "mobx";

@inject(['constrainable'])
export default class WhenOperationConstraint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shouldRender: false,
        }

        this.disposer = null;
    }

    componentDidMount() {
        const {constrainable} = this.props;

        if (constrainable && constrainable.constraints && isObservable(constrainable.constraints )) {
            this.disposer = observe(constrainable.constraints, change => {
                const {name} = this.props;

                const shouldRender = !!change.object.get(name);

                if (this.state.shouldRender !== shouldRender) {
                    this.setState({shouldRender: shouldRender});
                }
            })
        }
    }

    componentWillUnmount() {
        if (this.disposer) {
            this.disposer();
        }
    }

    renderContent() {
        return this.state.shouldRender ? this.props.children : null;
    }

    render() {
        return (
            <AfterExecute>
                <React.Fragment>
                    {this.renderContent()}
                </React.Fragment>
            </AfterExecute>
        );
    }

}
