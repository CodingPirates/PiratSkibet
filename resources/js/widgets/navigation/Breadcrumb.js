import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Link from "widgets/navigation/Link";

@inject(['model'])
class Breadcrumb extends React.Component {

    render() {
        return (
            <Link route={this.props.model.get('route')}
                  parameters={this.props.model.get('parameters')}
                  label={this.props.model.get('label')}
                  className={"breadcrumb-link"} />
        );
    }

}

export default Breadcrumb;
