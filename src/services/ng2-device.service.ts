/**
 * Created by ahsanayaz on 08/11/2016.
 */

import {Injectable} from '@angular/core';
import * as Constants from '../constants/ng2-device.constants';
import {ReTree} from './retree.service';

@Injectable()
export class Device {
    public userAgent: any;
    public os: any;
    public browser: any;
    public device: any;
    public os_version: any;
    public browser_version: any;

    public isMobile: boolean;
    public isTablet: boolean;
    public isDesktop: boolean;

    constructor() {
        this._setDeviceInfo();
        this._cacheDeviceType();
    }

    public getDeviceInfo(): any {
        return {
            userAgent: this.userAgent,
            os: this.os,
            browser: this.browser,
            device: this.device,
            os_version: this.os_version,
            browser_version: this.browser_version,
        };
    }

    private _setDeviceInfo(): void {
        let reTree = new ReTree();
        let ua = window.navigator.userAgent;

        this.os = Object.keys(Constants.OS).reduce((obj: any, item: any) => {
            obj[Constants.OS[item]] = reTree.test(ua, Constants.OS_RE[item]);
            return obj;
        }, {});

        this.browser = Object.keys(Constants.BROWSERS).reduce((obj: any, item: any) => {
            obj[Constants.BROWSERS[item]] = reTree.test(ua, Constants.BROWSERS_RE[item]);
            return obj;
        }, {});

        this.device = Object.keys(Constants.DEVICES).reduce((obj: any, item: any) => {
            obj[Constants.DEVICES[item]] = reTree.test(ua, Constants.DEVICES_RE[item]);
            return obj;
        }, {});

        this.os_version = Object.keys(Constants.OS_VERSIONS).reduce((obj: any, item: any) => {
            obj[Constants.OS_VERSIONS[item]] = reTree.test(ua, Constants.OS_VERSIONS_RE[item]);
            return obj;
        }, {});

        this.os = [
            Constants.OS.WINDOWS,
            Constants.OS.IOS,
            Constants.OS.MAC,
            Constants.OS.ANDROID,
            Constants.OS.LINUX,
            Constants.OS.UNIX,
            Constants.OS.FIREFOX_OS,
            Constants.OS.CHROME_OS,
            Constants.OS.WINDOWS_PHONE
        ].reduce((previousValue, currentValue) => {
            return (previousValue === Constants.OS.UNKNOWN && this.os[currentValue]) ? currentValue : previousValue;
        }, Constants.OS.UNKNOWN);

        this.browser = [
            Constants.BROWSERS.CHROME,
            Constants.BROWSERS.FIREFOX,
            Constants.BROWSERS.SAFARI,
            Constants.BROWSERS.OPERA,
            Constants.BROWSERS.IE,
            Constants.BROWSERS.MS_EDGE,
            Constants.BROWSERS.FB_MESSANGER
        ].reduce((previousValue, currentValue) => {
            return (previousValue === Constants.BROWSERS.UNKNOWN && this.browser[currentValue]) ? currentValue : previousValue;
        }, Constants.BROWSERS.UNKNOWN);

        this.device = [
            Constants.DEVICES.ANDROID,
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.IPHONE,
            Constants.DEVICES.I_POD,
            Constants.DEVICES.BLACKBERRY,
            Constants.DEVICES.FIREFOX_OS,
            Constants.DEVICES.CHROME_BOOK,
            Constants.DEVICES.WINDOWS_PHONE,
            Constants.DEVICES.PS4,
            Constants.DEVICES.CHROMECAST,
            Constants.DEVICES.APPLE_TV,
            Constants.DEVICES.GOOGLE_TV,
            Constants.DEVICES.VITA
        ].reduce((previousValue, currentValue) => {
            return (previousValue === Constants.DEVICES.UNKNOWN && this.device[currentValue]) ? currentValue : previousValue;
        }, Constants.DEVICES.UNKNOWN);

        this.os_version = [
            Constants.OS_VERSIONS.WINDOWS_3_11,
            Constants.OS_VERSIONS.WINDOWS_95,
            Constants.OS_VERSIONS.WINDOWS_ME,
            Constants.OS_VERSIONS.WINDOWS_98,
            Constants.OS_VERSIONS.WINDOWS_CE,
            Constants.OS_VERSIONS.WINDOWS_2000,
            Constants.OS_VERSIONS.WINDOWS_XP,
            Constants.OS_VERSIONS.WINDOWS_SERVER_2003,
            Constants.OS_VERSIONS.WINDOWS_VISTA,
            Constants.OS_VERSIONS.WINDOWS_7,
            Constants.OS_VERSIONS.WINDOWS_8_1,
            Constants.OS_VERSIONS.WINDOWS_8,
            Constants.OS_VERSIONS.WINDOWS_10,
            Constants.OS_VERSIONS.WINDOWS_PHONE_7_5,
            Constants.OS_VERSIONS.WINDOWS_PHONE_8_1,
            Constants.OS_VERSIONS.WINDOWS_PHONE_10,
            Constants.OS_VERSIONS.WINDOWS_NT_4_0,
            Constants.OS_VERSIONS.MACOSX,
            Constants.OS_VERSIONS.MACOSX_3,
            Constants.OS_VERSIONS.MACOSX_4,
            Constants.OS_VERSIONS.MACOSX_5,
            Constants.OS_VERSIONS.MACOSX_6,
            Constants.OS_VERSIONS.MACOSX_7,
            Constants.OS_VERSIONS.MACOSX_8,
            Constants.OS_VERSIONS.MACOSX_9,
            Constants.OS_VERSIONS.MACOSX_10,
            Constants.OS_VERSIONS.MACOSX_11,
            Constants.OS_VERSIONS.MACOSX_12,
            Constants.OS_VERSIONS.MACOSX_13,
            Constants.OS_VERSIONS.MACOSX_14,
            Constants.OS_VERSIONS.MACOSX_15
        ].reduce((previousValue, currentValue) => {
            return (previousValue === Constants.OS_VERSIONS.UNKNOWN && this.os_version[currentValue]) ? currentValue : previousValue;
        }, Constants.OS_VERSIONS.UNKNOWN);

        this.browser_version = '0';
        if (this.browser !== Constants.BROWSERS.UNKNOWN) {
            let re = Constants.BROWSER_VERSIONS_RE[this.browser];
            let res = reTree.exec(ua, re);
            if (!!res) {
                this.browser_version = res[1];
            }
        }

        this.userAgent = ua;
    }

    private _cacheDeviceType(): void {
        this.isMobile = this._isMobile();
        this.isTablet = this._isTablet();
        this.isDesktop = this._isDesktop();
    }

    private _isMobile(): boolean {
        return [
            Constants.DEVICES.ANDROID,
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.IPHONE,
            Constants.DEVICES.I_POD,
            Constants.DEVICES.BLACKBERRY,
            Constants.DEVICES.FIREFOX_OS,
            Constants.DEVICES.WINDOWS_PHONE,
            Constants.DEVICES.VITA
        ].some((item) => {
            return this.device === item;
        });
    };

    private _isTablet(): boolean {
        return [
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.FIREFOX_OS
        ].some((item) => {
            return this.device === item;
        });
    };

    private _isDesktop(): boolean {
        return [
            Constants.DEVICES.PS4,
            Constants.DEVICES.CHROME_BOOK,
            Constants.DEVICES.UNKNOWN
        ].some((item) => {
            return this.device === item;
        });
    };
}
