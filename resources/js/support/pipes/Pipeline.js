import React from "react";

const Context = React.createContext(null);

export default class Pipeline extends React.Component {

    constructor(props) {
        super(props);

        this.pipe.bind(this);
    }


    pipes = {};

    pipe(uuid, pipe) {
        this.pipes[uuid] = pipe;
    }

    removePipe(uuid) {
        if (typeof this.pipes[uuid] !== 'undefined') {
            delete this.pipes[uuid];
        }
    }

    trigger() {
        return new Promise((resolve, reject) => {
            let promise = Promise.resolve();

            const pipes = Object.values(this.pipes);

            if (pipes.length > 0) {
                pipes.forEach(pipe => {
                    promise = promise.then(() => {
                        return (typeof(pipe) === 'function')?pipe():pipe;
                    });
                });
            }

            promise.then(resolve).catch(reject);
        });
    }

    render() {
        return (
            <Context.Provider value={this}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </Context.Provider>
        )
    }

}

export {Context};