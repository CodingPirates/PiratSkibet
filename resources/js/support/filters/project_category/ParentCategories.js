import React from 'react';
import Widget from "widgets/Widget";
import {Iterator} from "@morningtrain/react-resources";
import {inject} from "@morningtrain/react-decorators";
import ParentCategory from "support/filters/project_category/ParentCategory";

export default @inject(['collection'])
class ParentCategories extends Widget {

    get parents() {
        return this.props.collection[null].map(group => ({
            ...group,
            children: this.props.collection[group.id],
        }));
    }

    renderWidget() {
        return (
            <React.Fragment>
                <Iterator collection={this.parents}>
                    <ParentCategory/>
                </Iterator>
            </React.Fragment>
        );
    }
}
