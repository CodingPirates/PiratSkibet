import React from "react";
import Widget from "widgets/Widget";
import Resources from "@morningtrain/resources";
import debounce from "lodash/debounce";
import * as Auth from "@morningtrain/react-auth";
import {inject} from '@morningtrain/react-decorators';

@inject(['model'])
export default class Endorse extends Widget {

    constructor(props) {
        super(props);

        this.state = {
            count: props.count,
            reacted: props.reacted,
        };

    }

    componentDidUpdate(prevProps) {

        let changes = {};

        if (prevProps.count !== this.props.count) {
            changes.count = this.props.count;
        }

        if (prevProps.reacted !== this.props.reacted) {
            changes.reacted = this.props.reacted;
        }

        if (Object.keys(changes).length > 0) {
            this.setState(changes);
        }

    }

    static get defaultProps() {
        return {
            resourceName: null,
            operationName: 'endorse',
            count: 0,
            reacted: false,
        };
    }

    get permission() {
        const {resourceName, operationName} = this.props;

        return `api.${resourceName}.${operationName}`;
    }

    get operation() {
        const {resourceName, operationName} = this.props;

        return Resources.make('api', resourceName).operation(operationName);
    }

    handleClick = debounce(() => {

        let request = {type: 'endorsement', react: (this.state.reacted)?0:1};

        this.operation.executeForModel(this.props.model, request).then((data) => {
            this.setState({reacted: request.react, count: data.count});
        });

    }, 500, {leading: true})

    wrapperClassNames(reactable) {

        let classes = [
            'reaction endorse'
        ];

        if (this.state.reacted) {
            classes[classes.length] = 'reacted';
        }


        if (reactable) {
            classes[classes.length] = 'reactable';
        }

        return classes.join(' ');
    }

    renderInner(reactable) {
        return (
            <div className={this.wrapperClassNames(reactable)} onClick={reactable ? this.handleClick : null}>
                <div className={'reaction__count'}>
                    {this.state.count}
                </div>
            </div>
        );
    }

    renderWidget() {
        return (
            <React.Fragment>
                <Auth.Can permission={this.permission} >
                    {this.renderInner(true)}
                </Auth.Can>
            </React.Fragment>
        );
    }

}
