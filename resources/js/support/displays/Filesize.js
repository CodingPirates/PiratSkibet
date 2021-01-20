import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";

@inject(['model'])
export default class Filesize extends Display {

    static get defaultProps(){
        return {
            ...super.defaultProps,
            name: 'size'
        }
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    formatValue(value) {

        if(!(typeof value === 'number')){
            value = parseFloat(value);
        }

        if(isNaN(value)) {
            return null;
        }

        return this.formatBytes(value, 0);
    }

}
