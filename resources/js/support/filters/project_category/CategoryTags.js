import React from 'react';
import {createPortal} from "react-dom";
import {Iterator} from "@morningtrain/react-resources";
import {inject} from "@morningtrain/react-decorators";
import CategoryTag from "support/filters/project_category/CategoryTag";
import Badges from "widgets/forum/Badges";
import WhenCollection from "support/conditionals/WhenCollection";

@inject(['collection', 'selection'])
export default class CategoryTags extends React.Component {

    get categories() {
        const {selection, collection} = this.props;

        return collection.filter(e => selection.isSelected(e.id))
    }

    renderContent() {

        if(!this.categories.length) {
            return null;
        }

        return (
            <React.Fragment>
                <Badges>
                    <Iterator collection={this.categories} >
                        <CategoryTag/>
                    </Iterator>
                </Badges>
            </React.Fragment>
        );
    }

    render() {
        const {portalElement: {current}} = this.props;

        return (current) ?
            createPortal(this.renderContent(), current) :
            this.renderContent();
    }
}

CategoryTags.defaultProps = {
    portalElement: {current: null},
};
