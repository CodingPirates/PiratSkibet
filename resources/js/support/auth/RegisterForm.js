import React from "react";
import {Model, Operation} from '@morningtrain/react-resources';
import {AvatarEditor} from 'services/avatar';
import {inject} from "@morningtrain/react-decorators";
import * as Fields from "support/fields";
import * as Filters from "support/filters";
import Back from "./Back";
import ModelReaction from "support/reactions/ModelReaction";
import {Fieldset} from "layouts";
import * as Auth from "@morningtrain/react-auth";
import EditUserForm from "widgets/user/EditUserForm";

@inject(["modal"])
export default class RegisterForm extends React.Component {

    static getPreviousStep() {
        return 'user';
    }

    static get stepLabels() {
        return {
            default: 'Opret Pixel Pirat',
            user:    'Pirat Oplysninger',
            avatar:  'Design din pirat',
        };
    }

    static get amountOfSteps() {
        return Object.keys(RegisterForm.stepLabels).length - 1;
    }

    static getStepNumber(step) {
        return (Object.keys(RegisterForm.stepLabels).indexOf(step)) || 0;
    }

    changeModalLabel(step) {

        let currentStep = RegisterForm.getStepNumber(step);
        let stepCount = RegisterForm.amountOfSteps;

        let stepGuide = `Trin ${currentStep} af ${stepCount}`;

        const label = (
            <React.Fragment>
                <h1>{RegisterForm.stepLabels.default}</h1>
                <span>{stepGuide} - {RegisterForm.stepLabels[step]}</span>
            </React.Fragment>
        );

        this.setModalLabel(label);
    }

    setModalLabel(label) {
        this.props.modal.setLabel(label);
    }

    render() {
        return (
            <Model namespace='auth' resourceName='register' submitoperationName='register' operationName={'register'} submittable={true}>

                <Filters.AutoFetch/>
                <Auth.Reaction/>
                <ModelReaction name={'step'} onReaction={this.changeModalLabel.bind(this)} />

                <Fields.Case name={'step'} when={'user'} defaultValue={'user'}>
                    <div className="form-content register-form">
                        <Fields.Hidden name='step' defaultValue={'user'}/>

                        <Fieldset cols={2}>
                            <Fields.Input name='name' label='Fulde navn' required={true} />
                            <Fields.Input name='username' label='Brugernavn' required={true} />
                            <Fields.Number name='age' label='Alder' required={true} min={1} />
                            <Fields.Input name='email' label='Mail' type='email'/>
                            <Fields.Input name='password' label='Angiv adgangskode' type='password' required={true} />
                            <Fields.Input name='password_confirmation' label='Gentag adgangskode' type='password' required={true} />
                        </Fieldset>
                        <Fieldset cols={1}>
                            <Fields.Checkbox id={'newsletter_checkbox'}
                                             name={'newsletter'}
                                             label={'Nyt fra Piratskibet'}
                                             boxed={true}/>
                            <label htmlFor={'newsletter_checkbox'}>
                                <p>Modtag dine seneste notfikationer og andre spændende nyheder fra Piratskibet i din mail hver lørdag</p>
                            </label>
                        </Fieldset>
                    </div>
                </Fields.Case>

                <Fields.Case name={'step'} when={'avatar'}>
                    <div className="form-content avatar-form">
                        <Fields.Hidden name='step' defaultValue={'avatar'}/>

                        <div className="avatar-editor">
                            <AvatarEditor name='avatar' />
                        </div>
                    </div>
                </Fields.Case>

                <div className="modal-footer">
                    <Fields.Case name={'step'} when={'user'} not={true} defaultValue={'user'} >
                        <Back label='Tilbage' type='none' className='button button--yellow' onClick={RegisterForm.getPreviousStep}/>
                    </Fields.Case>

                    <Fields.Case name={'step'} when={'register'} not={true} >
                        <div></div>
                        <input type='submit' value={'Næste trin'} />
                    </Fields.Case>
                    <Fields.Case name={'step'} when={'register'} >
                        <input type='submit' value='Tilmeld' />
                    </Fields.Case>
                </div>

            </Model>
        );
    }
}
