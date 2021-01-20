import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";
import UserAvatar from "services/avatar/CurrentUserAvatar";

@inject(['director'])
export default class Submarine extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left',
            maxWidth: null
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'submarine-';
    }

    get width() {
        return this.scaleWidth(24) + '%';
    }

    get baseDuration() {
        return 1;
    }

    get styles() {
        return {
            ...super.styles,
            transitionDuration: this.duration + 's'
        }
    }

    get submarineSVG() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.26 293.31" style={{maxWidth: this.props.maxWidth}}>
                <defs>
                    <linearGradient id="submarine_gradient_4" x1="196.37" y1="115.57" x2="196.37" y2="100.82" gradientTransform="matrix(1, 0, 0, -1, 0, 295.18)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#fff799" />
                        <stop offset="1" stopColor="#fff200" />
                    </linearGradient>
                    <linearGradient id="submarine_gradient_2" x1="-1344.44" y1="122.72" x2="-1344.44" y2="107.97" gradientTransform="translate(-1118.07 295.18) rotate(180)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#fff799" />
                        <stop offset="1" stopColor="#eddd1b" />
                    </linearGradient>
                    <linearGradient id="submarine_gradient" x1="-1367.44" y1="139.45" x2="-1367.44" y2="124.7" xlinkHref="#submarine_gradient_2" />
                    <linearGradient id="submarine_gradient_4-2" x1="166.37" y1="122.6" x2="166.37" y2="107.85" xlinkHref="#submarine_gradient_4" />
                    <linearGradient id="submarine_gradient_4-3" x1="144.37" y1="139.46" x2="144.37" y2="124.7" xlinkHref="#submarine_gradient_4" />
                    <linearGradient id="submarine_gradient_10" x1="117.29" y1="134.92" x2="117.29" y2="33.67" gradientTransform="matrix(1, 0, 0, -1, 0, 295.18)" gradientUnits="userSpaceOnUse">
                        <stop offset="0.15" stopColor="#fff" />
                        <stop offset="0.9" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="submarine_gradient_10-2" x1="149.98" y1="110.19" x2="149.98" y2="8.94" gradientTransform="matrix(0.97, -0.25, -0.25, -0.97, 21.26, 327.8)" xlinkHref="#submarine_gradient_10" />
                    <linearGradient id="submarine_gradient_10-3" x1="190.2" y1="101.11" x2="190.2" y2="-0.14" gradientTransform="matrix(0.9, -0.43, -0.43, -0.9, 41.72, 369.29)" xlinkHref="#submarine_gradient_10" />
                    <linearGradient id="submarine_gradient_10-4" x1="274.77" y1="134.92" x2="274.77" y2="33.67" gradientTransform="translate(551.25 295.18) rotate(180)" xlinkHref="#submarine_gradient_10" />
                    <linearGradient id="submarine_gradient_10-5" x1="303.04" y1="69.25" x2="303.04" y2="-32" gradientTransform="translate(529.98 327.8) rotate(-165.62)" xlinkHref="#submarine_gradient_10" />
                </defs>
                <title>Submarine</title>
                <g>
                    <g>
                        <rect className="cls-1" x="319.96" y="138.47" width="13.71" height="52.98" transform="translate(680.41 259.71) rotate(168.22)" />
                        <rect className="cls-2" x="320.02" y="139.14" width="7.11" height="52.98" transform="translate(674.16 261.71) rotate(168.22)" />
                        <rect className="cls-3" x="325.57" y="190.63" width="13.71" height="2.49" transform="translate(697.02 311.84) rotate(168.22)" />
                        <rect className="cls-1" x="326.05" y="192.88" width="13.94" height="3.39" transform="translate(-32.77 72.28) rotate(-11.81)" />
                        <rect className="cls-1" x="338.08" y="194.19" width="9.92" height="3.36" transform="translate(109.36 -122.62) rotate(24.01)" />
                        <polygon className="cls-1" points="348 205.92 348.22 196.38 346.14 196.34 345.93 206.36 348 205.92" />
                        <rect className="cls-1" x="319.4" y="198.1" width="9.92" height="3.36" transform="translate(690.55 94.81) rotate(132.37)" />
                        <polygon className="cls-1" points="323.42 211.02 319.72 202.22 321.65 201.42 325.51 210.67 323.42 211.02" />
                        <rect className="cls-1" x="298.16" y="93.35" width="13.71" height="52.98" transform="translate(617.03 19.63) rotate(140.75)" />
                        <rect className="cls-2" x="298.91" y="95.44" width="7.11" height="52.98" transform="translate(613.82 24.95) rotate(140.75)" />
                        <path className="cls-3" d="M275.41,83.63c9.15-3.08,19.58,1.67,22.66,10.81s-2.37,19.24-11.52,22.31l-2.64.89L272.77,84.52Z" />
                        <circle className="cls-3" cx="321.66" cy="140.2" r="11.14" />
                        <circle className="cls-4" cx="321.66" cy="140.2" r="6.96" />
                        <path className="cls-5" d="M137.87,53.85h116.2v123H137.87Z" />

                        <UserAvatar embed={true} />

                        <rect className="cls-1" x="131.22" y="174.28" width="49.01" height="24" transform="translate(67.61 -39.96) rotate(18.61)" />
                        <rect className="cls-1" x="212.99" y="174.28" width="49.01" height="24" transform="translate(522.02 287.01) rotate(161.39)" />
                        <path className="cls-21" d="M196.37,18.69c-48.37,0-87.58,40.91-87.58,91.36s39.21,91.37,87.58,91.37S284,160.51,284,110.05,244.75,18.69,196.37,18.69Zm-1.05,143.83c-27.3-.62-49.1-24.09-48.6-52.67s22.9-51.22,50.2-50.7,49.2,23.89,48.7,52.57S222.72,163.05,195.32,162.52Z" />
                        <path className="cls-3" d="M196.37,18.69V59.15h.55c27.4.42,49.2,23.89,48.7,52.57-.39,28.22-22.32,50.72-49.25,50.8v38.9c48.38,0,87.59-40.91,87.59-91.37S244.75,18.69,196.37,18.69Z" />
                        <path className="cls-22" d="M197.67,64a53.21,53.21,0,1,0,52.3,54.1A53.25,53.25,0,0,0,197.67,64Zm-2,84.9a39.51,39.51,0,1,1,40.2-38.8A39.46,39.46,0,0,1,195.67,148.85Z" />
                        <path className="cls-1" d="M196.67,61.25a49.56,49.56,0,1,0,48.7,50.4A49.32,49.32,0,0,0,196.67,61.25Zm-1,87.2a39,39,0,1,1,39.7-38.3A39.38,39.38,0,0,1,195.67,148.45Z" />
                        <path className="cls-23" d="M196,163.55h-.9a52.83,52.83,0,0,1-35.8-90.9A53.47,53.47,0,0,1,197,57.75a52.9,52.9,0,0,1-1,105.8Zm0-100.3a47.22,47.22,0,0,0-32.9,13.4,47.51,47.51,0,0,0,32.2,81.6,47.61,47.61,0,0,0,33.8-13.4,47.51,47.51,0,0,0-32.2-81.6Z" />
                        <path className="cls-24" d="M195.67,148.85a39.51,39.51,0,1,0-38.8-40.2,39.27,39.27,0,0,0,38.8,40.2" />
                        <path className="cls-25" d="M178.37,92.25a3.55,3.55,0,1,0-3.5-3.6,3.5,3.5,0,0,0,3.5,3.6" />
                        <path className="cls-1" d="M233.62,51a6.68,6.68,0,1,1,9.4-1A6.78,6.78,0,0,1,233.62,51Zm6.92-8.65a4.4,4.4,0,1,0,.65,6.19A4.33,4.33,0,0,0,240.54,42.34Z" />
                        <path className="cls-1" d="M235,49.18a5.54,5.54,0,1,0-.86-7.79,5.65,5.65,0,0,0,.86,7.79" />
                        <path className="cls-26" d="M234.27,50.14a6.68,6.68,0,1,1,9.39-1A6.77,6.77,0,0,1,234.27,50.14Zm6.92-8.65a4.4,4.4,0,1,0,.64,6.2A4.43,4.43,0,0,0,241.19,41.49Z" />
                        <path className="cls-27" d="M236.21,44.64a1.49,1.49,0,0,1-.24-2.19l10.34-12.92.41-.49a1.47,1.47,0,0,1,2.19-.24,1.49,1.49,0,0,1,.25,2.2l-.34.37-10.31,13a1.61,1.61,0,0,1-2.3.26Z" />
                        <path className="cls-28" d="M239.18,47.2a1.48,1.48,0,0,1-.24-2.19l10.34-12.92.41-.49a1.47,1.47,0,0,1,2.19-.24,1.49,1.49,0,0,1,.25,2.2l-.34.37L241.46,46.84a1.52,1.52,0,0,1-2.28.36Z" />
                        <path className="cls-1" d="M246.19,62.62a6.67,6.67,0,1,1,9.42.64A6.74,6.74,0,0,1,246.19,62.62Zm8.39-7.42a4.39,4.39,0,1,0-.37,6.2A4.39,4.39,0,0,0,254.58,55.2Z" />
                        <path className="cls-1" d="M247.93,61.14a5.56,5.56,0,1,0,.45-7.84,5.63,5.63,0,0,0-.45,7.84" />
                        <path className="cls-26" d="M247.05,61.83a6.68,6.68,0,1,1,9.42.64A6.6,6.6,0,0,1,247.05,61.83Zm8.31-7.3a4.39,4.39,0,1,0-.37,6.2A4.49,4.49,0,0,0,255.36,54.53Z" />
                        <path className="cls-27" d="M249.9,56.76a1.62,1.62,0,0,1,.15-2.27l12.36-11,.43-.4A1.62,1.62,0,1,1,265,45.54l-.36.28-12.46,11A1.39,1.39,0,0,1,249.9,56.76Z" />
                        <path className="cls-28" d="M252.46,59.81a1.62,1.62,0,0,1,.15-2.27l12.36-11,.43-.39a1.63,1.63,0,0,1,2.28.15,1.55,1.55,0,0,1-.15,2.27l-.36.28-12.46,11A1.49,1.49,0,0,1,252.46,59.81Z" />
                        <circle className="cls-29" cx="196.37" cy="185.88" r="7.4" />
                        <circle className="cls-30" cx="196.37" cy="186.98" r="7.4" />
                        <circle className="cls-4" cx="196.37" cy="186.98" r="5.8" />
                        <circle className="cls-29" cx="226.37" cy="178.73" r="7.4" />
                        <circle className="cls-31" cx="226.37" cy="179.83" r="7.4" />
                        <circle className="cls-4" cx="226.37" cy="179.83" r="5.8" />
                        <circle className="cls-29" cx="249.37" cy="162.03" r="7.4" />
                        <circle className="cls-32" cx="249.37" cy="163.13" r="7.4" />
                        <circle className="cls-4" cx="249.37" cy="163.13" r="5.8" />
                        <circle className="cls-29" cx="166.37" cy="178.88" r="7.4" />
                        <circle className="cls-33" cx="166.37" cy="179.98" r="7.4" />
                        <circle className="cls-4" cx="166.37" cy="179.98" r="5.8" />
                        <circle className="cls-29" cx="144.37" cy="162.08" r="7.4" />
                        <circle className="cls-34" cx="144.37" cy="163.08" r="7.4" />
                        <circle className="cls-4" cx="144.37" cy="163.08" r="5.8" />
                        <rect className="cls-21" x="180.36" y="1.85" width="7.6" height="43.16" />
                        <rect className="cls-21" x="159.73" y="1.84" width="28.24" height="7.6" />
                        <rect className="cls-3" x="184.17" y="1.85" width="3.8" height="43.16" />
                        <rect className="cls-3" x="159.73" y="1.85" width="28.24" height="3.94" />
                        <rect className="cls-21" x="159.43" width="3.5" height="11.32" />
                        <rect className="cls-3" x="159.27" width="3.65" height="5.81" />
                        <ellipse className="cls-1" cx="159.43" cy="5.66" rx="1.36" ry="5.3" />
                        <path className="cls-23" d="M159.43,11.32h0c-.39,0-.75-.64-1-1.73a17,17,0,0,1-.41-4,16.71,16.71,0,0,1,.44-4c.29-1,.65-1.6,1-1.59s.75.64,1,1.73a17.53,17.53,0,0,1,.42,4,16.58,16.58,0,0,1-.45,4C160.16,10.78,159.81,11.32,159.43,11.32Zm0-10.73c-.34,0-.67.51-.91,1.43a14.41,14.41,0,0,0-.4,3.57,14.74,14.74,0,0,0,.37,3.61c.24,1,.56,1.53.92,1.56s.67-.49.93-1.44a14.94,14.94,0,0,0,.4-3.56,15.94,15.94,0,0,0-.37-3.62c-.25-1-.57-1.53-.92-1.55Z" />
                        <path className="cls-35" d="M159.42,9.28c.53,0,1-1.63,1-3.69s-.42-3.78-1-3.83-1,1.63-1,3.7.41,3.79.95,3.82" />
                        <path className="cls-36" d="M159.12,5c.08,0,.15-.25.15-.58s-.06-.6-.15-.6-.15.25-.15.58.06.6.15.6" />
                        <rect className="cls-37" x="162.93" y="1.84" width="0.54" height="7.6" />

                        <g className={'submarine__lights'}>
                            <path className="cls-38" d="M89.27,224.09a49.54,49.54,0,0,0-3.3,6.5c-5.4,13,3.8,25,17.2,29.4s26.9,0,31.3-13.4c3-9.1,5.3-22,6.8-32.6,2.8-20.7,8.9-50.6,8.9-50.6l-10.9-3s-25,31.5-31.8,40.1C102.87,206.19,93.47,217.79,89.27,224.09Z" />
                            <path className="cls-39" d="M127.89,252.6a48.58,48.58,0,0,0-1.58,7.12c-2,13.93,9.89,23.27,24,24.21s26.06-6.69,27-20.76c.64-9.56-.33-22.63-1.51-33.27-2.43-20.74-3.95-51.22-3.95-51.22l-11.3-.2s-16.4,36.72-20.85,46.74C136.61,231.89,130.39,245.46,127.89,252.6Z" />
                            <path className="cls-40" d="M172.57,266.49a50.39,50.39,0,0,0-.22,7.28c.66,14.07,14.09,21,28.09,19.28s24.34-11.46,22.61-25.46c-1.16-9.51-4.58-22.16-7.73-32.39-6.29-19.92-13.5-49.57-13.5-49.57l-11.14,1.93s-9.21,39.15-11.69,49.82C177.25,244.5,173.69,259,172.57,266.49Z" />
                            <path className="cls-41" d="M304.49,224.09a49.54,49.54,0,0,1,3.3,6.5c5.4,13-3.8,25-17.2,29.4s-26.9,0-31.3-13.4c-3-9.1-5.3-22-6.8-32.6-2.8-20.7-8.9-50.6-8.9-50.6l10.9-3s25,31.5,31.8,40.1C290.89,206.19,300.29,217.79,304.49,224.09Z" />
                            <path className="cls-42" d="M264.93,254.24a51,51,0,0,1,1.58,7.12c2,13.93-9.89,23.27-24,24.2s-26-6.68-27-20.75c-.64-9.56.33-22.63,1.51-33.27,2.43-20.75,3.95-51.23,3.95-51.23l11.31-.19s16.39,36.72,20.84,46.74C256.2,233.52,262.42,247.09,264.93,254.24Z" />
                        </g>

                        <rect className="cls-1" x="81.37" y="86.45" width="13.71" height="52.98" transform="translate(91.37 -30.34) rotate(39.25)" />
                        <rect className="cls-1" x="39.25" y="114.95" width="13.71" height="52.98" transform="translate(167.54 55.51) rotate(72.77)" />
                        <rect className="cls-2" x="82.1" y="84.39" width="7.21" height="52.98" transform="translate(89.5 -29.21) rotate(39.25)" />
                        <rect className="cls-2" x="41.56" y="111.81" width="7.13" height="52.98" transform="translate(163.85 54.23) rotate(72.77)" />
                        <rect className="cls-21" x="12.98" y="148.34" width="13.71" height="2.49" transform="translate(156.83 86.33) rotate(72.77)" />
                        <path className="cls-21" d="M117.83,76.73c-9.15-3.08-19.59,1.67-22.66,10.82s2.37,19.23,11.52,22.31l2.64.88,11.14-33.12Z" />
                        <circle className="cls-21" cx="71.58" cy="133.3" r="11.14" />
                        <circle className="cls-4" cx="71.58" cy="133.3" r="6.96" />
                        <rect className="cls-1" x="10.21" y="148.68" width="13.94" height="3.39" transform="translate(-121.38 211.26) rotate(-107.2)" />
                        <rect className="cls-1" x="6.23" y="140.56" width="9.92" height="3.36" transform="translate(-65.44 262.59) rotate(-143.02)" />
                        <polygon className="cls-1" points="0 142.77 8.23 137.95 9.28 139.75 0.62 144.8 0 142.77" />
                        <rect className="cls-1" x="11.87" y="158.8" width="9.92" height="3.36" transform="translate(174.29 195.75) rotate(108.61)" />
                        <polygon className="cls-1" points="7.46 166.74 16.95 165.71 16.72 163.64 6.75 164.75 7.46 166.74" />
                        <path className="cls-43" d="M99,92.19a1.26,1.26,0,0,1-.33,0,1,1,0,0,1-.61-1.28c4.09-11.86,14.7-10.72,14.81-10.7a1,1,0,0,1,.87,1.11,1,1,0,0,1-1.11.87h0c-.37,0-9.13-.93-12.68,9.38A1,1,0,0,1,99,92.19Z" />
                        <path className="cls-43" d="M129,73.07a1.57,1.57,0,0,1-.3,0,1.52,1.52,0,0,1-1.1-1.84c2.86-11.3,10.83-21.66,23-29.94a82.39,82.39,0,0,1,17.72-9.17,1.52,1.52,0,0,1,1,2.87c-.32.11-32.34,11.35-38.81,37A1.52,1.52,0,0,1,129,73.07Z" />
                    </g>
                </g>
            </svg>
        )
    }

    renderContent() {
        return this.submarineSVG;
    }

}
