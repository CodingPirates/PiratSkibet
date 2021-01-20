import React from 'react';
import PropTypes from 'prop-types';
import {inject} from '@morningtrain/react-decorators';
import {Item} from 'react-contexify';
import RequestRemovalModal from 'widgets/moderation/removal/RequestRemovalModal';

@inject(['menu', 'spawner'])
export default class RequestRemoval extends React.Component {

    requestRemoval(args) {
        const {spawner, resource, resourceId, resourceName, label} = this.props;

        if (spawner) {
            spawner.spawn(<RequestRemovalModal label={label}/>, {
                resource:     resource,
                resourceName: resourceName,
                resourceId:   resourceId,
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Item onClick={this.requestRemoval.bind(this)}>{this.props.label}</Item>
            </React.Fragment>
        );
    }

}

RequestRemoval.propTypes = {
    label:        PropTypes.string,
    resource:     PropTypes.string.isRequired,
    resourceName: PropTypes.string.isRequired,
    resourceId:   PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

RequestRemoval.defaultProps = {
    label: 'Slet',
};
