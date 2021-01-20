import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Display from "@morningtrain/react-displays/Display";
import {inject} from "@morningtrain/react-decorators";

@inject(['model'])
export default class ImageSlider extends Display {

    constructor(props) {
        super(props);

        this.bigSliderRef = React.createRef();


        this.state = {
            nav1: null,
            nav2: null
        };

    }

    renderImages() {

        const images = this.value;

        if (!images || !images.length) {
            return null;
        }

        return images.map((image, index) => {
            return (
                <img key={index} src={image.url}/>
            );
        })
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }


    render() {

        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            swipeToSlide: false,
            arrows: false,
            focusOnSelect: false,
            variableWidth: false,
            className: 'preview-images-slider',
        };

        var navigation_settings = {
            dots: false,
            infinite: false,
            speed: 500,
            //slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            swipeToSlide: true,
            focusOnSelect: true,
            variableWidth: true,
            className: 'navigation-images-slider',
        };

        return (
            <React.Fragment>
                <Slider {...settings}
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)} >
                    {this.renderImages()}
                </Slider>
                <Slider {...navigation_settings}
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)} >
                    {this.renderImages()}
                </Slider>
            </React.Fragment>
        );
    }

}
