import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import * as Components from "widgets/courses/resources/videos/index";
import TVMonitor from "widgets/tv/TVMonitor";

export default
@inject(['model'])
class Video extends Widget {

    constructor(props) {
        super(props);
    }

    get meta(){
        return this.props.model.get('meta');
    }

    get title(){
        return this.meta.title;
    }

    get type(){
        return this.meta.type;
    }

    get link(){
        return this.meta.link;
    }

    get videoElement(){
        return React.createElement(
            Components[this.type.charAt(0).toUpperCase() + this.type.slice(1)],
            {link: this.link}
        )
    }

    get renderTitle() {
        return this.title ? <h1>{this.title}</h1> : '';
    }

    renderWidget() {
        return (
            <div className="video-wrapper">
                {this.renderTitle}
                <TVMonitor maxWidth={'800px'}>
                    {this.videoElement}
                </TVMonitor>
            </div>
        );
    }

}
