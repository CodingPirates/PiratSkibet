import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";
import ProfileModal from "widgets/pirate/ProfileModal";
import Link from "widgets/navigation/Link";

@inject(['model'])
export default class Username extends Display {

    static get defaultProps(){
        return {
            ...super.defaultProps,
            name: 'username'
        }
    }

    handleClick() {
        if(this.modal) {
            this.modal.open();
        }
    }


    render() {

        if(this.value === this.props.defaultValue) {
            return this.value;
        }

        return (
            <React.Fragment>
                <ProfileModal ref={ref => this.modal = ref} username={this.value} />
                <Link onClick={this.handleClick.bind(this)} className={''}>
                    <div className={'thread-message__username'}>
                        {this.value}
                    </div>
                </Link>
            </React.Fragment>
        )
    }
}
