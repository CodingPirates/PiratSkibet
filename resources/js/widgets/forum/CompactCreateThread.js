import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Form, Operation} from "@morningtrain/react-resources";
import {router} from "@morningtrain/helpers";
import * as Fields from "support/fields";
import React from "react";
import {Fieldset} from "layouts";
import * as Auth from "@morningtrain/react-auth";
import Section from "layouts/Section";
import Login from "widgets/auth/Login";
import Register from "widgets/auth/Register";
import Link from "widgets/navigation/Link";

@inject(['model'])
export default class CompactCreateThread extends Widget {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }

        this.makeVisible = this.makeVisible.bind(this);
    }

    handleSubmit = (response) => {

        if(response.model && response.model.id) {
            let params = {thread: response.model.id};
            location.href = router.route('app.forum.thread', params);
        }

    }

    makeVisible() {
        if (this.state.visible) return;

        this.setState({visible: true});
    }

    renderWidget() {
        return (
            <div className="forum-topics forum-create-thread">
                <Section>
                        <div className="custom-table">
                            <div className="custom-table__titlebar">
                                <div className="custom-table__title">Start ny chat_</div>
                            </div>
                            <div className="custom-table__list">
                                <Auth.Check negate={true} >
                                    <div className={'thread-not-logged-in'}>
                                        <p>
                                            Hov, du kan ikke oprette piratsnak samtaler uden at være logget ind
                                        </p>
                                        <div className={'buttons-wrap'}>
                                            <Login className={'button button--yellow'} />
                                            <Register label={'Tilmeld dig'}  className={'button button--yellow'} />
                                        </div>
                                    </div>
                                </Auth.Check>
                                <div className="custom-table-row">
                                    <Auth.Can permission={'api.forum.thread.create'} >
                                        <Operation resourceName={'forum.thread'} operationName={'create'}>
                                            <Form submitTo={'create'} resourceName={'forum.thread'} onSubmit={this.handleSubmit} flash={false}>
                                                <Fieldset cols={2}>
                                                    <Fields.Hidden name={'type'} value={'question'} />
                                                    <Fields.Input name={'subject'}
                                                                  label={'Overskrift - Hvad skal chatten hedde?'}
                                                                  onFocus={this.makeVisible}/>
                                                    <Fields.BelongsTo as={'topic_id'}
                                                                      resourceName={'forum.topics'}
                                                                      optionsKey={'name'} label={'Placering - Hvad handler chatten om?'}
                                                                      onFocus={this.makeVisible}
                                                                      placeholder={'Vælg kategori'}
                                                    />
                                                </Fieldset>
                                                <Fields.Cases.If if={this.state.visible}>
                                                    <Fieldset cols={1}>
                                                        <Fields.Comment name={'message'} label={'Besked - Skriv chattens første besked'}/>
                                                        <Fields.Checkbox name={'grownups_can_participate'} label={'Må voksne chatte med?'} defaultValue={true}/>
                                                        <div className="form-element">
                                                            <input type={'submit'} className={'button--yellow send-message-button'} value={'Start chatten'}/>
                                                            <p><b>Husk at <Link route={'app.pages.rules'} label={'“vi skal være gode ved hinanden”'}/></b></p>
                                                        </div>
                                                    </Fieldset>
                                                </Fields.Cases.If>
                                            </Form>
                                        </Operation>
                                    </Auth.Can>
                                </div>
                            </div>
                        </div>
                </Section>
            </div>
        );
    }

}
