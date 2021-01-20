import React from "react";
import World from "widgets/animations/worlds/World";
import Director from "widgets/animations/Director";

import Cloud from "widgets/animations/partials/Cloud";
import Sky from "widgets/animations/partials/Sky";
import SeagullFlying from "widgets/animations/partials/SeagullFlying";
import Water from "widgets/animations/partials/Water";
import WaterLine from "widgets/animations/partials/WaterLine";
import Section from "layouts/Section";
import {Text} from "@morningtrain/react-displays";
import IslandHalf from "widgets/animations/partials/IslandHalf";
import {Avatar} from "support/displays";
import CurrentUserAvatar from "services/avatar/CurrentUserAvatar";
import * as Auth from "@morningtrain/react-auth";
import {inject} from "@morningtrain/react-decorators";
import PirateContextMenu from "widgets/menus/PirateContextMenu";

@inject(['model'])
export default class ProfileHeaderWorld extends World {

    get name() {
        return 'profile-header';
    }

    get isCurrentUser() {
        return Auth.is(this.props.model.get('id'));
    }

    renderWorld() {
        return (
            <React.Fragment>
                <Sky />

                <IslandHalf scaleFactor={0.34} left="26%" background="#00AEEF" zIndex="2" />
                <IslandHalf scaleFactor={0.14} right="8%" background="#00AEEF" scaleX={0.8} zIndex="2" />
                <IslandHalf scaleFactor={0.10} right="3%" background="#01A2DE" zIndex="1" />

                <Director limit={2}>
                    <Cloud scaleFactor={1} durationFactor={150} left="-20%" top="10%" zIndex="3" glitch={false} randomizeInitial={true} />
                    <Cloud scaleFactor={0.3} durationFactor={100} left="-4%" top="30%" zIndex="4" glitch={false} randomizeInitial={true} />
                    <Cloud scaleFactor={0.5} durationFactor={90} left="-8%" top="15%" zIndex="4" glitch={false} randomizeInitial={true} />
                    <Cloud scaleFactor={0.8} durationFactor={95} left="-15%" top="25%" zIndex="2" glitch={false} randomizeInitial={true} />
                    <Cloud scaleFactor={0.3} durationFactor={70} left="-4%" top="28%" zIndex="4" glitch={false} randomizeInitial={true} />
                </Director>

                <Director limit={1}>
                    <SeagullFlying scaleFactor={0.04} durationFactor={40} right="-5%" top="15%" zIndex="7" direction="left" glitch={false} randomizeInitial={true} />
                    <SeagullFlying scaleFactor={0.035} durationFactor={30} right="-5%" top="20%" zIndex="7" direction="left" glitch={false} randomizeInitial={true} />
                    <SeagullFlying scaleFactor={0.04} durationFactor={37} right="-5%" top="28%" zIndex="7" direction="left" glitch={false} randomizeInitial={true} />
                    <SeagullFlying scaleFactor={0.035} durationFactor={30} left="-5%" top="25%" zIndex="7" direction="right" glitch={false} randomizeInitial={true} />
                    <SeagullFlying scaleFactor={0.04} durationFactor={40} right="-5%" top="30%" zIndex="7" direction="left" glitch={false} randomizeInitial={true} />
                </Director>

                <Water bottom="0" zIndex="3" />

                <Section className={'profile-title-section'}>
                    <h1 className={'profile-title'}>Profil for <Text name={'username'} /></h1>
                    <PirateContextMenu/>
                </Section>

                <div className={'profile-avatar'}>
                    <div className="avatar-wrap">
                        <IslandHalf scaleFactor={0.8} left="10%" bottom="-7%" background={'#1F9DCE'} zIndex={4} />

                        <Auth.Is modelKey={'id'}>
                            <CurrentUserAvatar />
                        </Auth.Is>

                        <Auth.Is modelKey={'id'} not={true}>
                            <Avatar/>
                        </Auth.Is>

                    </div>
                </div>

                <WaterLine left="0" bottom="-22px" zIndex="5" />

            </React.Fragment>
        );
    }

}
