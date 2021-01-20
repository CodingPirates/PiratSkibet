import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Enum} from "@morningtrain/helpers";
import {Iterator} from "@morningtrain/react-resources";
import LandlubberChecklistItem from "widgets/landlubber/LandlubberChecklistItem";
import UserSettingsModal from "widgets/user/UserSettingsModal";
import PirateVowsModal from "widgets/landlubber/PirateVowsModal";

@inject('auth')
export default class LandlubberChecklist extends Widget {

    constructor(props) {
        super(props);

        this.userModal = React.createRef();
        this.vowsModal = React.createRef();

        this.openUserModal = this.openModal.bind(this, this.userModal);
        this.openVowsModal = this.openModal.bind(this, this.vowsModal);

        this.enum = new Enum('landlubber_requirements');
    }

    openModal(modal) {
        modal.current.open();
    }

    get uncompleted() {
        return this.props.auth.user.get('uncompleted_landlubber_requirements') || [];
    }

    get checklist() {
        return this.enum.options;
    }

    renderWidget() {
        return (
            <div className={'form-content checklist-wrapper'}>
                <Iterator collection={this.checklist}>
                    <LandlubberChecklistItem uncompleted={this.uncompleted}
                                             vowsAction={this.openVowsModal}
                                             mainAction={this.openUserModal}/>
                </Iterator>
                <UserSettingsModal ref={this.userModal} defaultTab={'user'} />
                <PirateVowsModal ref={this.vowsModal}/>
            </div>
        );
    }
}
