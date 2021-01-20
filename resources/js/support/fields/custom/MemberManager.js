import React from "react";
import Field from "@morningtrain/react-fields/base/Field";
import ReactQuill from "react-quill";
import Resources from "@morningtrain/resources";
import ReactDOMServer from 'react-dom/server';
import UserAvatar from "services/avatar/UserAvatar";
import {Iterator} from "@morningtrain/react-resources";
import {Provider} from "mobx-react";
import {observable} from "mobx";
import {inject} from "@morningtrain/react-decorators";

import Mention from "quill-mention";
import Quill from 'quill';
import * as Fields from "support/fields";

class ModifiedMention extends Mention {

    onSomethingChange() {
        const range = this.quill.getSelection();
        if (range == null) return;
        this.cursorPos = range.index;
        const startPos = Math.max(0, this.cursorPos - this.options.maxChars);
        const beforeCursorPos = this.quill.getText(startPos, this.cursorPos - startPos);
        const textAfter = beforeCursorPos.substring(0);
        this.mentionCharPos = 0;
        if(!textAfter) {
            this.hideMentionList();
        } else {
            const mentionChar = beforeCursorPos[0];
            this.options.source(textAfter, this.renderList.bind(this, mentionChar), mentionChar);
        }

    }

}

Quill.register('modules/mentionModified', ModifiedMention);

export default class MemberManager extends Field {

    @observable selected = [];
    @observable removed = [];

    constructor(props) {
        super(props);

        this.editor = React.createRef();

        this.setFromValue();
    }

    /////////////////////////////////
    // Init
    /////////////////////////////////

    triggerDataChange(other_states = {}) {
        super.triggerDataChange(other_states);
        this.setFromValue();
    }

    /////////////////////////////////
    // Handlers
    /////////////////////////////////

    add(model) {
        const index = this.selected
            .findIndex(item => item.get('id') === model.get('id'));

        if (index === -1) {
            this.selected.push(model);
        }
    }

    remove(model) {
        const index = this.selected
            .findIndex(item => item.get('id') === model.get('id'));

        if (index !== -1) {
            this.removed.push(model);
            this.selected.splice(index, 1);
        }
    }

    unremove(model) {
        const index = this.removed
            .findIndex(item => item.get('id') === model.get('id'));


        if (index !== -1) {
            this.selected.push(model);
            this.removed.splice(index, 1);
        }
    }

    setFromValue() {
        this.selected.replace(this.value.map(i => new Map(Object.entries(i))));
        this.removed.replace([]);
    }

    /////////////////////////////////
    // Getters
    /////////////////////////////////

    get operation() {
        return this.resource.operation('mentionables');
    }

    get resource() {
        return Resources.make('api', 'user');
    }

    get quillModules() {
        return {
            toolbar: false,
            mentionModified: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: [],
                defaultMenuOrientation: 'top',
                dataAttributes: ['model'],
                renderItem: (item, searchTerm) => {
                    return this.renderUserSuggestion(item, searchTerm);
                },
                source: (searchTerm, renderList, mentionChar) => {

                    if (searchTerm.length === 0) {
                        renderList([], searchTerm);
                    } else {
                        const matches = [];
                        this.search(searchTerm, (results) => {
                            renderList(results, searchTerm);
                        });

                    }
                },
                onSelect: (item, insertitem) => {
                    this.add(new Map(Object.entries(JSON.parse(item.model))));
                    this.clearEditor();
                }
            },
        };
    }

    clearEditor() {
        const {current} = this.editor;

        if (current) {
            const editor = current.getEditor();

            if (editor) editor.setContents('');
        }
    }

    search = (query, callback) => {
        if (!query) return;

        const params = {
            query: query,
            exclude: this.selected.map(i => i.get('id')),
        };

        this.operation.execute(params)
            .then(data => {
                if (!data.collection || data.collection.length === 0) {
                    return callback([]);
                }

                return callback(
                    data.collection.map(user => {
                        return {
                            value:    user.username,
                            display:  user.username,
                            username: user.username,
                            id:       user.id,
                            avatar:   user.avatar,
                            model:    JSON.stringify(user),
                        };
                    })
                );

            })
            .catch((err) => {
                console.log(err);
                callback([]);
            });
    }

    /////////////////////////////////
    // Renders
    /////////////////////////////////

    renderUserSuggestion(entry, search) {
        return ReactDOMServer.renderToStaticMarkup(
            <div className={'mentions__suggestions__item'}>
                <UserAvatar svg={entry.avatar}/>
                <div>
                    {entry.username}
                </div>
            </div>
        );
    }

    renderInnerField() {
        return (
            <React.Fragment >
                <React.Fragment key={this.field_key} >
                    {this.renderField()}
                </React.Fragment >
                {this.renderErrors()}
            </React.Fragment >
        );
    }

    renderSelected() {
        return (
            <div className={'selected'}>
                <p className={'title'}>Pirater på holdet</p>
                <Iterator collection={this.selected}>
                    <ToggleableItem fieldName={this.name} onClick={this.remove.bind(this)} provideIdField={true} >
                        {this.props.children}
                    </ToggleableItem>
                </Iterator>
            </div>
        );
    }

    renderRemoved() {

        if(this.removed.length === 0) {
            return null;
        }

        return (
            <div className={'selected'}>
                <p className={'title'}>Pirater der vil blive fjernet</p>
                <Iterator collection={this.removed}>
                    <ToggleableItem fieldName={this.name} onClick={this.unremove.bind(this)}>
                        {this.props.children}
                    </ToggleableItem>
                </Iterator>
            </div>
        );
    }

    renderField() {
        return (
            <div className="has-many-field-wrap">
                <div className={'all'}>
                    <p className={'title'}>Find pirat</p>
                    <ReactQuill ref={this.editor} placeholder={'Skriv for at søge efter pirat...'} modules={this.quillModules}/>
                </div>
                {this.renderSelected()}
                {this.renderRemoved()}
            </div>
        );
    }
}

@inject(['model'])
class ToggleableItem extends React.Component {

    static get defaultProps(){
        return {
            provideIdField: false
        }
    }

    onClick() {
        const {onClick, model} = this.props;

        if (onClick && typeof onClick === 'function') {
            onClick(model);
        }

    }

    get prefix() {
        const {fieldName, data_index} = this.props;

        return [fieldName, data_index].join('.');
    }

    get icon() {
        return(
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                <polygon points="365.714,231.619 365.714,195.048 402.286,195.048 402.286,158.476 438.857,158.476 438.857,121.905
                    475.429,121.905 475.429,85.333 512,85.333 512,36.571 475.429,36.571 475.429,0 426.667,0 426.667,36.571 390.095,36.571
                    390.095,73.143 353.524,73.143 353.524,109.714 316.952,109.714 316.952,146.286 280.381,146.286 280.381,182.857
                    231.619,182.857 231.619,146.286 195.048,146.286 195.048,109.714 158.476,109.714 158.476,73.143 121.905,73.143 121.905,36.571
                    85.333,36.571 85.333,0 36.571,0 36.571,36.571 0,36.571 0,85.333 36.571,85.333 36.571,121.905 73.143,121.905 73.143,158.476
                    109.714,158.476 109.714,195.048 146.286,195.048 146.286,231.619 182.857,231.619 182.857,280.381 146.286,280.381
                    146.286,316.952 109.714,316.952 109.714,353.524 73.143,353.524 73.143,390.095 36.571,390.095 36.571,426.667 0,426.667
                    0,475.429 36.571,475.429 36.571,512 85.333,512 85.333,475.429 121.905,475.429 121.905,438.857 158.476,438.857
                    158.476,402.286 195.048,402.286 195.048,365.714 231.619,365.714 231.619,329.143 280.381,329.143 280.381,365.714
                    316.952,365.714 316.952,402.286 353.524,402.286 353.524,438.857 390.095,438.857 390.095,475.429 426.667,475.429 426.667,512
                    475.429,512 475.429,475.429 512,475.429 512,426.667 475.429,426.667 475.429,390.095 438.857,390.095 438.857,353.524
                    402.286,353.524 402.286,316.952 365.714,316.952 365.714,280.381 329.143,280.381 329.143,231.619"/>
            </svg>
        )
    }

    renderIdField() {

        if(!this.props.provideIdField) {
            return null;
        }

        return (
            <Provider prefix={this.prefix}>
                <Fields.Hidden name={'id'} prefixName={false} />
            </Provider>
        );
    }

    render() {
        return (
            <div className={'user-removable'}>
                {this.renderIdField()}
                <div>
                    {this.props.children}
                </div>
                <button onClick={this.onClick.bind(this)} type={'button'}>{this.icon}</button>
            </div>
        );
    }
}

export const Injected = MemberManager.inject();
