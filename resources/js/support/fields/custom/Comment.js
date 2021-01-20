import React from 'react';
import Field from "@morningtrain/react-fields/base/Field";
import {Provider} from "mobx-react";
import ReactQuill from "react-quill";
import Resources from "@morningtrain/resources";
import UserAvatar from "services/avatar/UserAvatar";
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import ReactDOMServer from 'react-dom/server';
import QuillMention from "quill-mention";
import QuillEmoji from "quill-emoji";
import QuillTenor from "quill-tenor";
import {Injected as HiddenField} from "@morningtrain/react-fields/simpletons/Hidden";
import {isObservable, observable} from "mobx";
import {observe} from "mobx";
import {Env} from "@morningtrain/helpers";

export default class Comment extends Field {

    @observable data = new Map();

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,

        }


        if (isObservable(props.model) && props.model) {
            observe(props.model, change => {
                if (`${change.name}` === `${this.firstPartOfName}`) {
                    this.triggerDataChange();
                }
            })
        }

    }

    triggerDataChange(other_states = {}) {
        super.triggerDataChange(other_states);

        this.data.set(this.as, this.value);

    }

    get operation() {
        return this.resource.operation('mentionables');
    }

    get resource() {
        return Resources.make('api', 'user');
    }

    handleChange = (value) => {

        if (typeof (this.props.handleChange) === 'function') {
            this.props.handleChange(value);
        }

        this.data.set(this.as, value);

    }

    search = (query, callback) => {

        if (!query) {
            return;
        }

        let operation = this.operation;

        //operation.constraints = {query: query};
        operation.execute({query: query})
            .then(data => {

                if (!data.collection || data.collection.length === 0) {
                    return callback([]);
                }

                return callback(
                    data.collection.map(user => {
                        return {value: user.username, display: user.username, username: user.username, id: user.id, avatar: user.avatar};
                    })
                );

            })
            .catch((err) => {
                console.log(err);
                callback([]);
            });

    }

    get quillToolbarOptions() {
        return [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            //[{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            //[{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            //[{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            //[{'direction': 'rtl'}],                         // text direction

            //[{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            //[{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['emoji', 'tenor'],
            [
                //'link',
                //'image',
                //'video'
            ],
            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            //[{'font': []}],
            //[{'align': []}],

            ['clean']                                         // remove formatting button
        ];
    }

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

    getEditor() {
        if (this.editor) {
            return this.editor.getEditor();
        }
    }

    clearEditor = () => {
        let editor = this.getEditor();

        if (editor) {
            editor.setContents('');
        }

    }

    get quillModules() {
        return {
            toolbar: this.quillToolbarOptions,
            "tenor-toolbar": {
                apiKey: Env.get('services.tenor.key'),
                ContentFilter: "medium",
                MediaFilter: "minimal",
                Locale: 'da_DK',
                InitialSearch: 'pirat',
                SearchPlaceholder: 'Søg efter GIFs',
            },
            "emoji-toolbar": true,
            "emoji-textarea": true,
            "emoji-shortname": true,
            mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@"],
                defaultMenuOrientation: 'top',
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
            },
        };
    }

    renderField() {
        // TODO - Waiting for this (https://github.com/zenoamaro/react-quill/pull/496) to fix autofocus on load
        return (
            <React.Fragment>
                <Provider model={this.data}>
                    <HiddenField name={this.as}/>
                </Provider>
                <ReactQuill ref={ref => this.editor = ref} defaultValue={this.value} onChange={this.handleChange.bind(this)} modules={this.quillModules}/>
            </React.Fragment>
        );
    }
}

export const Injected = Comment.inject();
