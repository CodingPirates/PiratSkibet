import React from "react";
import {inject} from '@morningtrain/react-decorators';
import {Env} from "@morningtrain/helpers";

export default
@inject(["form", "auth"])
class RefreshUserReaction extends React.Component {

    constructor(props) {
        super(props);

        this.props.form.onSubmit(data => {
            this.reaction(data);
        });

    }

    reaction(data) {
        this.props.auth.refresh();
    }

    render() {
        return null;
    }
}
