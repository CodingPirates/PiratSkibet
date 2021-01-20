import React from "react";
import Resources from "@morningtrain/resources";
import {inject} from "@morningtrain/react-decorators";
import {Injected as Radio} from "@morningtrain/react-fields/simpletons/Radio";

@inject(['model', 'operation', 'operations'])
export default class Answers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: this.isAnswered,
        }
    }

    static get defaultProps() {
        return {
            progress: {}
        };
    }

    get questionId() {
        return this.props.model.get('uuid');
    }

    get isAnswered() {
        return this.selectedAnswer !== null;
    }

    get selectedAnswer() {

        if(!this.props.progress[this.questionId]) {
            return null;
        }

        return this.props.progress[this.questionId].answer || null;
    }

    get isSelectedCorrect() {

        if(!this.props.progress[this.questionId]) {
            return false;
        }

        return this.props.progress[this.questionId].correct || false;
    }

    get correctAnswerUuid() {

        let answers = this.props.model.get('answers');

        if(!answers || !answers.length) {
            return null;
        }

        let answer = null;

        for(let i = 0; i < answers.length; i++) {
            answer = answers[i];

            if(parseInt(answer.is_correct) === 1) {
                return answer.uuid;
            }

        }

        return null;
    }

    get answers() {

        let answers = this.props.model.get('answers');

        if(!answers || !answers.length) {
            return [];
        }

        return answers.map(answer => ({
            label: answer.answer,
            value: answer.uuid,
        }))
    }

    get operation() {
        return Resources.make('api', 'courses.course_resource').operation('answer');
    }

    updateAnswers() {
        this.setState({disabled: true}, () => {
            if(!this.props.operation) {
                return;
            }

            this.props.operation.refresh();
        });
    }

    handleClick(value) {
        this.operation.executeForModel(this.props.resource, {
                question: this.props.model.get('uuid'),
                answer: value,
            })
            .then((data) => {
                this.updateAnswers();
            })
            .catch(() => {
                this.updateAnswers();
            });
    }

    render() {
        return (
            <div className={'course-questionnaire-answers'}>
                <Radio label={''}
                       name={'uuid'}
                       as={'answer'}
                       classNames={(model, field, {option}) => {

                           if(!this.isAnswered) {
                               return null;
                           }

                           return (this.selectedAnswer === option.value)
                               ? (
                                   (this.isSelectedCorrect)?'correct':'incorrect'
                               ) : (
                                   (this.correctAnswerUuid === option.value)?'correct':null
                               );
                       }}
                       options={this.answers}
                       defaultValue={this.selectedAnswer}
                       disabled={this.state.disabled}
                       onChange={this.handleClick.bind(this)}
                />
            </div>
        );
    }

}
