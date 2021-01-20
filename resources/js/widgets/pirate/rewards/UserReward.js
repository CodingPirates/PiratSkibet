import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Modal} from "support/modals";
import TreasureChestWorld from "widgets/animations/worlds/TreasureChestWorld";
import RawTreasureChest from "widgets/animations/partials/RawTreasureChest";
import TreasureChest from "widgets/animations/partials/TreasureChest";
import {Iterator} from "@morningtrain/react-resources";
import * as Displays from "support/displays";

@inject(['operation', 'model'])
export default class UserReward extends Widget {

    constructor(props) {
        super(props);

        this.modal     = React.createRef();
        this.onOpen    = this.onOpen.bind(this);
        this.openModal = this.openModal.bind(this);

        this.state = {
            ...super.state,
            rewards: [],
            showChest: true,
        }
    }

    openModal() {
        const {current} = this.modal;

        if (current) current.open();
    }

    onOpen() {
        const {operation, model} = this.props;

        operation.executeForModel(model)
            .then(res => {
                if (res && res.collection) {
                    setTimeout(
                        () => this.setState({rewards: res.collection, showChest: false}),
                        3000,
                    )
                }
            })
    }

    get treasureChestWorld() {
        return (
            <TreasureChestWorld>
                <TreasureChest onOpen={this.onOpen} />
            </TreasureChestWorld>
        )
    }

    renderWidget() {
        const {rewards, showChest} = this.state;

        return (
            <React.Fragment>
                <RawTreasureChest onClick={this.openModal} />
                <Modal ref={this.modal} label={'Se hvad din skattekiste gemmer!'}>
                    <div className={`treasure-chest-modal${showChest ? '' : ' treasure-chest-modal--rewards'}`}>
                        {showChest ? this.treasureChestWorld : null}
                        <Iterator collection={rewards} >
                            <div className="treasure-chest-reward">
                                <Displays.Text name={'item.name'} />
                                <Displays.Text name={'item.title'} />
                            </div>
                        </Iterator>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}
