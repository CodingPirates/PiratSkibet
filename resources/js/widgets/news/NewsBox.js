import React from "react";
import Widget from "widgets/Widget";
import Hoverable from "support/interactions/Hoverable";
import Theme from "layouts/Theme";
import {inject} from "@morningtrain/react-decorators";
import * as Displays from "support/displays";

export default
@inject(['model'])
class NewsBox extends Widget {

    static get defaultProps() {
        return {
            type: 'big',
            theme: 'default',
            dummyId: 0
        };
    }

    get classNames() {
        let classNames = [];

        classNames.push('news-box');
        classNames.push('news-box--' + this.props.type);

        return classNames.join(' ');
    }

    get link() {
        return this.props.model.get('link');
    }

    get image() {
        return <img src={this.props.model.get('img')} alt={this.props.model.get('img')} />;
    }

    get title() {
        return this.props.model.get('title');
    }

    get excerpt() {
        return this.props.model.get('subtext');
    }

    get theme() {
        return this.props.model.get('theme');
    }

    renderWidget() {
        return (
            <Hoverable className={this.classNames}>
                <div className="news-box__image object-fit">
                    {this.image}
                </div>
                <Theme name={this.theme} >
                    <a href={this.link} className="news-box__text" target={'_blank'}>
                        <div className="news-box__content">
                            <div className="news-box__title heading">
                                {this.title}
                            </div>
                            <Displays.Html name={'subtext'} />
                        </div>
                    </a>
                </Theme>
            </Hoverable>
        );
    }

}
