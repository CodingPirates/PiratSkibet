import React from 'react';
import Widget from 'widgets/Widget';
import {Env} from '@morningtrain/helpers';

const Context = React.createContext(null);

export default class Jitsi extends Widget {

    api = null;

    constructor(props) {
        super(props);

        this.player    = React.createRef();
        this.joinCall  = this.joinCall.bind(this);
        this.leaveCall = this.leaveCall.bind(this);

        this.state     = {
            open: false,
        }
    }

    componentWillUnmount() {
        this.leaveCall();
    }

    get meeting() {
        return Env.get('content.meeting')
    }

    get options() {
        const options = {
            roomName:   this.meeting.meeting_room,
            width:      592,
            height:     333,
            parentNode: this.player.current,
            defaultLanguage: 'da',
            configOverwrite: {
                // Options related to the remote participant menu.
                remoteVideoMenu: {
                    // If set to true the 'Kick out' button will be disabled.
                    disableKick: true
                },

                // If set to true all muting operations of remote participants will be disabled.
                disableRemoteMute: true,

                // Start calls with audio muted.
                startWithAudioMuted: true,
            },
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SETTINGS_SECTIONS: ['devices', 'language', 'profile',],
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'settings',
                    'raisehand', 'videoquality', 'filmstrip', 'invite', 'feedback', 'stats',
                    'shortcuts', 'tileview', 'videobackgroundblur', 'download', 'help', 'e2ee'
                ],
            },
        }

        const user = Env.get('user');

        if (user) {
            options.userInfo = {
                email:       user.email,
                displayName: user.username,
            };
        }

        return options;
    }

    joinCall() {
        if (!this.meeting || !this.meeting.meeting_room) return null;

        this.setState({open: true}, () => {
            this.api = new JitsiMeetExternalAPI('meet.jit.si', this.options);
            this.api.addListener('readyToClose', this.leaveCall);
        });
    }

    leaveCall() {
        this.setState({open: false}, () => {
            if (this.api) {
                this.api.removeListener('readyToClose', this.leaveCall);
                this.api.dispose();
            }
        });
    }

    renderWidget() {
        if (!this.meeting || !this.meeting.meeting_room || !this.state.open) return null;

        return (
            <div id={'jitsi'}>
                <div ref={this.player}/>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Context.Provider
                    value={{open: this.state.open, joinCall: this.joinCall}}>
                    {super.render()}
                    {this.props.children}
                </Context.Provider>
            </React.Fragment>
        )
    }
}

export {Context};
