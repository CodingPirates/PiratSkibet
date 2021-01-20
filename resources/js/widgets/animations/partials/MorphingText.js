import React from 'react';
import Animation from 'widgets/animations/Animation';
import {textMorph} from 'helpers/textMorph';
import {inject} from '@morningtrain/react-decorators';

@inject('collection')
export default class MorphingText extends Animation {

    constructor(props) {
        super(props);
        this.textNode = React.createRef();
        this.counter = 0;
        this.interval;
    }

    static get defaultProps() {
        return {
            ...super.defaultProps,
            duration: 1,
            interval: 5000
        };
    }

    get classNames() {
        return 'morphing-text-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
    }

    get styles() {
        return {
            ...super.styles
        }
    }

    get words() {
        const {collection} = this.props;
        let words = collection;

        if (!collection) return [];

        if (typeof (collection.toJS) === 'function') {
            words = collection.toJS();
        }

        return words.map(item => item.title);
    }

    componentDidMount() {
        this.updateInterval();
    }

    componentDidUpdate() {
        this.updateInterval();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateInterval() {
        if(this.words.length) {
            this.morphText();

            const {interval} = this.props;

            if(!this.interval && interval > 0) {
                this.interval = setInterval(() => this.morphText(), interval);
            }
        }
    }

    morphText = () => {
        const startText = this.textNode.current.textContent;
        const endText = this.words[this.counter];

        textMorph(this.textNode.current, startText, endText, this.props.duration);
        this.counter < this.words.length - 1 ? this.counter += 1 : this.counter = 0;
    }

    onClick() {
        const news = document.querySelector('.news-section');

        if (!news) return;

        news.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    }

    renderContent() {
        return (
            <div ref={this.textNode} className="text" onClick={this.onClick.bind(this)}>
                {this.words[0]}
            </div>
        );
    }
}
