import React from "react";
import Widget from "widgets/Widget";

export default class NavigationBurger extends Widget {

    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    toggleBurger = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    get stateClassName(){
        return this.state.open ? 'open': '';
    }

    renderChild(child, index){
        return React.cloneElement(child, {className: [child.props.className, this.stateClassName].join(' ')});
    }

    renderChildren(){
        
        if(React.Children.count(this.props.children) === 0){
            return null;
        }

        return React.Children.map(this.props.children, child => {
            return this.renderChild(child);
        });

    }

    renderWidget() {
        return (
            <React.Fragment>
                {this.renderChildren()}
                <div id="navigation-toggle" className={this.stateClassName} onClick={this.toggleBurger}>
                    <div></div>
                </div>
            </React.Fragment>
        );
    }

}