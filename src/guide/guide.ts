import './guide.scss'
import { createSwitchInfoDom } from './common/switchInfo'
import { get as getCoreConfig } from '../core/config'
import * as i18n from '../core/i18n'
import rtpl from 'art-template/lib/template-web.js'

export class GuideManager {

    private mainDOM = document.createElement("div");
    static ID: string = "guidePages";

    constructor() {
        this.mainDOM.id = GuideManager.ID;
        this.mainDOM.innerHTML = rtpl.render(`
            <div class="container">
                <span class="title"><img src="image/logo-d.svg" class="cloudopt-title" width="100px"/></span>
                <div class="content-block" id="contentBlock">
                    <div class="header"></div>
                    <div class="body"></div>
                    <div class="footer"></div>
                </div>
            </div>
        `, null)
        document.querySelector('body').appendChild(this.mainDOM)
        window.addEventListener('hashchange', this.route.bind(this))
        this.route()
    }

    private route() {
        switch (window.location.hash) {
            case '#step2':
                this.step2()
                break
            case '#step3':
                this.step3()
                break
            case '#step4':
                this.step4()
                break
            case '#step5':
                this.step5()
                break
            case '#step6':
                this.step6()
                break
            default:
                this.step1()
                break
        }
    }

    private setHeader(headerElement: HTMLElement) {
        this.mainDOM.querySelector('#contentBlock .header').innerHTML = rtpl.render(' ', null)
        this.mainDOM.querySelector('#contentBlock .header').appendChild(headerElement)
    }

    private setFooter(footerElement: HTMLElement) {
        this.mainDOM.querySelector('#contentBlock .footer').innerHTML = rtpl.render(' ', null)
        this.mainDOM.querySelector('#contentBlock .footer').appendChild(footerElement)
    }

    private setBody(bodyElement: HTMLElement) {
        this.mainDOM.querySelector('#contentBlock .body').innerHTML = rtpl.render(' ', null)
        this.mainDOM.querySelector('#contentBlock .body').appendChild(bodyElement)
    }

    private step1() {
        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_airport_2581@2x.png'
        header.width = 250
        header.height = 213
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        body.innerHTML = rtpl.render(`
            <h3>{{ title }}</h3>
            <span class="text">{{ text }}</span>
        `, {
            title: i18n.get('guideStep1Title'),
            text: i18n.get('guideStep1Content'),
        })
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = rtpl.render('{{ text }}', { text: i18n.get('guideNext') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.location.hash = '#step2'
        })
        this.setFooter(button)
    }

    private async step2() {
        const config = await getCoreConfig()

        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_privacy_protection_nlwy@2x.png'
        header.width = 250
        header.height = 225
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        const switchElement = createSwitchInfoDom({
            icon: '',
            title: i18n.get('guideSafeCloudSwitchTitle'),
            content: i18n.get('guideSafeCloudSwitchContent'),
            key: 'safeCloud',
            on: config.safeCloud,
        }).divElement
        body.innerHTML = rtpl.render('<h3>{{ text }}</h3>', { text: i18n.get('guideStep2Title') })
        body.appendChild(switchElement)
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML =  rtpl.render('{{ text }}', { text: i18n.get('guideNext') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.location.hash = '#step3'
        })
        this.setFooter(button)
    }

    private async step3() {
        const config = await getCoreConfig()

        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_heatmap_uyye@2x.png'
        header.width = 277
        header.height = 159
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        const switchElement = createSwitchInfoDom({
            icon: '',
            title: i18n.get('guideAdblockActivateSwitchTitle'),
            content: i18n.get('guideAdblockActivateSwitchContent'),
            key: 'adblockActivating',
            on: config.adblockActivating
        }).divElement
        body.innerHTML = rtpl.render('<h3>{{ text }}</h3>', { text: i18n.get('guideStep3Title') })
        body.appendChild(switchElement)
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = rtpl.render('{{ text }}', { text: i18n.get('guideNext') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.location.hash = '#step4'
        })
        this.setFooter(button)
    }

    private async step4() {
        const config = await getCoreConfig()

        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_fingerprint_swrc@2x.png'
        header.width = 250
        header.height = 220
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        const switchElement = createSwitchInfoDom({
            icon: '',
            title: i18n.get('guideSafePrivacySwitchTitle'),
            content: i18n.get('guideSafePrivacySwitchContent'),
            key: 'safePrivacy',
            on: config.safePrivacy
        }).divElement
        body.innerHTML = rtpl.render('<h3>{{ text }}</h3>', { text: i18n.get('guideStep4Title') })
        body.appendChild(switchElement)
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = rtpl.render('{{ text }}', { text: i18n.get('guideNext') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.location.hash = '#step5'
        })
        this.setFooter(button)
    }

    private async step5() {
        const config = await getCoreConfig()

        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_to_the_moon_v1mv@2x.png'
        header.width = 250
        header.height = 202
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        const switchElement = createSwitchInfoDom({
            icon: '',
            title: i18n.get('guideDataCollectionSwitchTitle'),
            i18n: 'guideDataCollectionSwitchContent',
            key: 'dataCollection',
            on: config.dataCollection
        }).divElement
        i18n.translateComponent(switchElement)
        body.innerHTML = rtpl.render('<h3>{{ text }}</h3>', { text: i18n.get('guideStep5Title') })
        body.appendChild(switchElement)
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = rtpl.render('{{ text }}', { text: i18n.get('guideNext') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.location.hash = '#step6'
        })
        this.setFooter(button)
    }

    private step6() {
        const header = document.createElement('img')
        header.src = 'image/icon/option/guide/undraw_having_fun_iais@2x.png'
        header.width = 289
        header.height = 182
        this.setHeader(header)

        const body = document.createElement("div")
        body.className = 'guide-content'
        body.innerHTML = rtpl.render(`
            <h3>{{ title }}</h3>
            <span class="text">{{ text }}</span>
        `, {
            title: i18n.get('guideStep6Title'),
            text: i18n.get('guideStep6Content')
        })
        this.setBody(body)

        const button = document.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = rtpl.render('{{ text }}', { text: i18n.get('guideLogin') })
        button.addEventListener("click", (ev: MouseEvent) => {
            window.open('https://www.cloudopt.net/account/login')
        })
        this.setFooter(button)
    }
}

export default new GuideManager()
