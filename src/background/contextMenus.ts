import * as i18n from '../core/i18n'
import * as coreConfig from '../core/config'
import * as notification from '../core/notification'
import * as tabOp from '../core/tab'
import * as utils from '../core/utils'
import * as logger from '../core/logger'

chrome.contextMenus.create({
    id: 'cloudopt',
    title: 'Cloudopt',
    contexts: ['all'],
    onclick: () => undefined,
}),

(async () => {
    const config = await coreConfig.get()

    if (config.rightClickSearch) { 
        const searchEngines = [
            {
                name: 'Cloudopt',
                url: 'https://s.cloudopt.net/search?q={{word}}'
            },
            {
                name: 'Google',
                url: 'https://www.google.com.hk/#&q={{word}}&ie=utf-8'
            },
            {
                name: 'Baidu',
                url: 'https://www.baidu.com/s?wd={{word}}'
            }
        ]

        for (let searchEngine of searchEngines) {
            chrome.contextMenus.create( {
                title: `Search by ${searchEngine.name}`,
                parentId: 'cloudopt',
                contexts: ['selection'],
                onclick: async (info) => {
                    window.open(searchEngine.url.replace('{{word}}',info.selectionText))
                },
            })
        }

        chrome.contextMenus.create( {
            title: '————————————',
            parentId: 'cloudopt',
            contexts: ['selection'],
            enabled: false,
        })
    }

    chrome.contextMenus.create({
        title: i18n.get('contextMenus1'),
        parentId: 'cloudopt',
        contexts: ['all'],
        onclick: async (info, tab) => {
            const result = await coreConfig.fastAddAllowList(tab.url)
            if (result === coreConfig.AddListResult.SUCCESS) {
                notification.success(i18n.get('optionTipsAddAllowListSuccess'))
            } else {
                coreConfig.fireAddListErrorNotification(result)
            }
        },
    })
    
    chrome.contextMenus.create({
        title: i18n.get('contextMenus4'),
        parentId: 'cloudopt',
        contexts: ['all'],
        onclick: async (info, tab) => {
            const result = await coreConfig.fastAddBlockList(tab.url)
            if (result === coreConfig.AddListResult.SUCCESS) {
                notification.success(i18n.get('optionTipsAddBlockListSuccess'))
            } else {
                coreConfig.fireAddListErrorNotification(result)
            }
        },
    })
    
    chrome.contextMenus.create({
        title: i18n.get('contextMenus2'),
        parentId: 'cloudopt',
        contexts: ['all'],
        onclick: (info, tab) => {
            if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
                tabOp.open(`https://www.cloudopt.net/report/${utils.getHost(tab.url)}`)
            }
        },
    })
    
    chrome.contextMenus.create({
        title: i18n.get('contextMenus3'),
        parentId: 'cloudopt',
        contexts: ['all'],
        onclick: (info, tab) => {
            logger.debug(`Opening Assistant UI for tab id=${tab.id} url= ${tab.url}`)
            const backgroundPage = chrome.extension.getBackgroundPage()
            const adguardApi = backgroundPage.adguardApi
            adguardApi.openAssistant(tab.id)
        },
    })
})()


