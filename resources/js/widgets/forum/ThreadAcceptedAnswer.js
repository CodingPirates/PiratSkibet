import React from 'react';
import Widget from 'widgets/Widget';
import ThreadMessage from 'widgets/forum/ThreadMessage';
import {inject} from '@morningtrain/react-decorators';
import {Model} from '@morningtrain/react-resources';
import * as Filters from 'support/filters';
import shortid from 'shortid';

@inject(['model', 'operations'])
export default class ThreadAcceptedAnswer extends Widget {

    uuid = shortid.generate();

    constructor(props) {
        super(props);

        this.state = {
            firstId:       this.getFirstId(),
            hasPagination: this.getHasPagination(),
        };
    }

    componentDidMount() {
        this.operation.onData(this.uuid, this.updateData.bind(this));
    }

    componentWillUnmount() {
        this.operation.unsetOnDataCallback(this.uuid);
    }

    updateData(data) {
        this.setState({
            firstId:       this.getFirstId(data),
            hasPagination: this.getHasPagination(data),
        });
    }

    get id() {
        const {model} = this.props;

        return model?.get('accepted_answer_id') || null;
    }

    get operation() {
        return this.props.operations.get('api', 'forum.message', 'index');
    }

    getFirstId(data = null) {
        return data?.collection?.[0]?.id || null;
    }

    getHasPagination(data = null) {
        return data?.meta?.filters?.pagination?.pages > 1;
    }

    renderWidget() {
        const {id, state: {firstId, hasPagination}, props: {model}} = this;

        if (!id || (id === firstId && !hasPagination)) {
            return null;
        }

        return (
            <Model resourceName={'forum.message'}>
                <Filters.Static constraint={'message'} value={id}/>
                <ThreadMessage thread={model}/>
            </Model>
        );
    }

}
