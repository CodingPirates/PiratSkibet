import React from 'react';
import {ToastContainer} from 'react-toastify';
import {inject} from '@morningtrain/react-decorators';
import {toast} from "react-toastify";

@inject(['operations'])
export default class Toastify extends React.Component {

    componentDidMount() {
        this.props.operations.onCreate(this.addCallbacks.bind(this));
    }

    addCallbacks(operation) {
        operation.onExecute(this.onSuccess.bind(this));
        operation.onError(this.onError.bind(this));
    }

    onSuccess(data) {
        if (data.message) {
            toast.success((
                <React.Fragment>
                    <i>✔</i>
                    <span>{data.message}</span>
                </React.Fragment>
            ));
        }
    }

    onError(error) {
        if (typeof (error.response) !== 'undefined') {

            if (error.response.status === 404) {
                /// Suppress 404 error - they should be caught and display a 404 page
                return;
            }

            const data = error.response.data;

            let message = null;

            if (data.errors) {
                message = (
                    <React.Fragment>
                        Du har ikke udfyldt alle felter korrekt - Tjek formularen for flere detaljer.
                    </React.Fragment>
                );
            } else if (data.message) {
                message = data.message;
            } else if (data.error) {
                message = data.error;
            } else {
                message = 'Der skete en ukendt serverfejl.';
            }

            if(message !== null) {
                toast.error((
                    <React.Fragment>
                        <i>❌</i>
                        <span>{message}</span>
                    </React.Fragment>
                ))
            }

        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer
                    position="bottom-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                {this.props.children}
            </React.Fragment>
        );
    }

}
