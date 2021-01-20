import React from 'react';
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Iterator} from "@morningtrain/react-resources";
import Category from "support/filters/project_category/Category";
import TableList from "layouts/TableList";

export default @inject(['model'])
class ParentCategory extends Widget {

    get name() {
        return this.props.model.get('name');
    }

    get visible() {
        if (this.props.model.get('status') !== 'visible') return false;

        return this.children.some(child => child.status === 'visible');
    }

    get children() {
        return this.props.model.get('children');
    }

    renderWidget() {
        if (!this.visible) return null;

        return (
            <TableList title={this.name}>
                <Iterator collection={this.children} >
                    <Category/>
                </Iterator>
            </TableList>
        );
    }
}
