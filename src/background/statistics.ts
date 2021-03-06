import * as store from '../core/store'
import * as logger from '../core/logger'
import message from '../core/message'
import * as utils from '../core/utils'

const eventCounts: Map<string, number> = new Map<string, number>()

let startOfToday: number
let adblockCountsInDays: Map<number, number>
let adblocksToday: number = 0
let accelerationCountsInDays: Map<number, number>
let accelerationsToday: number = 0

export function countEvent(event: string, count: number = 1) {
    if (!eventCounts.has(event)) {
        eventCounts.set(event, count)
    } else {
        eventCounts.set(event, eventCounts.get(event) + count)
    }

    switch (event) {
        case 'adblock':
            adblockCountsInDays.set(startOfToday, ++adblocksToday)
            break
        case 'web-accelerate':
            accelerationCountsInDays.set(startOfToday, ++accelerationsToday)
            break
    }

    logger.debug(`Statistics: count ${event} ${count} time(s).`)
}

export function getEventCount(event: string): number {
    return eventCounts.has(event) ? eventCounts.get(event) : 0
}

async function getCountFromStore(event: string): Promise<number> {
    let count = await store.get(`statistics.${event}`)
    count = parseInt(count, 10)
    if (isNaN(count)) {
        count = 0
    }
    return count
}

function saveAll() {
    eventCounts.forEach((value, key) => {
        store.set(`statistics.${key}`, value)
    })
    store.set('statisticFields', Array.from(eventCounts.keys()).join(','))

    store.set('adblock-counts-indays', utils.serializeMapNumNum(adblockCountsInDays))
    store.set('acceleration-counts-indays', utils.serializeMapNumNum(accelerationCountsInDays))
}

function refreshTodayTimeStamp() {
    const now = Date.now()
    startOfToday = now - (now % 86400000);
    setTimeout(() => {
        refreshTodayTimeStamp()
    }, startOfToday + 86400000 - now);
}

export async function start() {
    const keys = await store.get('statisticFields')
    if (keys) {
        keys.split(',').map(async (key) => {
            const count = await getCountFromStore(key)
            eventCounts.set(key, count)
        })
    }

    refreshTodayTimeStamp()
    store.get('adblock-counts-indays').then((recordString: string) => {
        const oldData = utils.deserializeMapNumNum(recordString)
        adblockCountsInDays = new Map<number, number>()
        for (let i = 0, j = startOfToday; i < 7; i++, j -= 86400000) {
            if (!isNaN(oldData.get(j))) {
                adblockCountsInDays.set(j, oldData.get(j))
            } else {
                adblockCountsInDays.set(j, 0)
            }
        }
        message.addListener({
            type: 'getAdblockCountsInDays',
            callback(message, sender, sendResponse) {
                sendResponse(utils.serializeMapNumNum(adblockCountsInDays))
            }
        })
    })
    store.get('acceleration-counts-indays').then((recordString: string) => {
        const oldData = utils.deserializeMapNumNum(recordString)
        accelerationCountsInDays = new Map<number, number>()
        for (let i = 0, j = startOfToday; i < 7; i++, j -= 86400000) {
            if (!isNaN(oldData.get(j))) {
                accelerationCountsInDays.set(j, oldData.get(j))
            } else {
                accelerationCountsInDays.set(j, 0)
            }
        }
        message.addListener({
            type: 'getAccelerationCountsInDays',
            callback(message, sender, sendResponse) {
                sendResponse(utils.serializeMapNumNum(accelerationCountsInDays))
            }
        })
    })

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status !== 'loading') {
            saveAll()
        }
    })

    message.addListener({type: 'countEvent', callback: (msg) => {
        countEvent(msg.text)
    }})

    message.addListener({type: 'getEventCount', callback: (msg, sender, sendResponse) => {
        const count = getEventCount(msg.text)
        sendResponse(count.toString())
    }})
}

start()
