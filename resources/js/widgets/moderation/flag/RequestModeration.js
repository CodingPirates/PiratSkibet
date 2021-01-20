import React from 'react';
import PropTypes from 'prop-types';
import {inject} from '@morningtrain/react-decorators';
import {Item} from 'react-contexify';
import RequestModerationModal from 'widgets/moderation/flag/RequestModerationModal';

@inject(['menu', 'spawner'])
export default class RequestModeration extends React.Component {

    requestModeration(args) {
        const {spawner, resource, resourceId, resourceName} = this.props;

        if (spawner) {
            spawner.spawn(<RequestModerationModal/>, {
                resource:     resource,
                resourceName: resourceName,
                resourceId:   resourceId,
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Item onClick={this.requestModeration.bind(this)}>{this.props.label}</Item>
            </React.Fragment>
        );
    }

}

RequestModeration.propTypes = {
    label: PropTypes.string,
    resource: PropTypes.string.isRequired,
    resourceName: PropTypes.string.isRequired,
    resourceId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

RequestModeration.defaultProps = {
    label: 'Rapporter',
};
