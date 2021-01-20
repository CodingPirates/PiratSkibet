import React from "react";
import {Context} from "support/pipes/Pipeline";
import shortid from "shortid";

class Pipe extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);

        this.uuid = shortid.generate();

        this.handle.bind(this);
    }

    get pipeline() {
        return this.context;
    }

    handle = () => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    componentDidMount() {
        if (this.pipeline) {
            return this.pipeline.pipe(this.uuid, this.handle);
        }
    }

    componentWillUnmount() {
        if (this.pipeline) {
            return this.pipeline.removePipe(this.uuid);
        }
    }

    render() {
        return null;
    }

}

export default Pipe;