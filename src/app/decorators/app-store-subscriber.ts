
import {appStoreInstance} from '../services/app-store'

const { defineProperty } = Object
const onDestroyName = 'ngOnDestroy'
const onInitName = 'ngOnInit'
const onInitAppStoreSubscriptionName = 'onInitAppStoreSubscription'

export interface IAppStoreSubscriber {
    onInitAppStoreSubscription(source: any): void
}

export function AppStoreSubscriber() {
    'use strict'
    return function(target) {

        console.log('Calling AppStoreSubscriber')

        let subscriptionList: any[] = []
        let ngOnDestroyOriginal, ngOnInitOriginal, onInitAppStoreSubscription
        const targetPrototype = target.prototype;

        if (typeof targetPrototype[onInitAppStoreSubscriptionName] === 'function') {
            onInitAppStoreSubscription = targetPrototype[onInitAppStoreSubscriptionName]
        } else {
            throw new Error(`The required method, ${onInitAppStoreSubscriptionName}, was not defined on the object.`)
        }

        if (typeof targetPrototype[onInitName] === 'function') {
            ngOnInitOriginal = targetPrototype[onInitName]
        }
        if (typeof targetPrototype[onDestroyName] === 'function') {
            ngOnDestroyOriginal = targetPrototype[onDestroyName]
        }

        defineProperty(targetPrototype, onInitName, {
            configurable: true,
            enumerable: true,
            get() {
                return () => {
                    if (ngOnInitOriginal) {
                        ngOnInitOriginal.bind(this)()
                    }
                    console.log(`Subscribing ...`)
                    let subscription = onInitAppStoreSubscription.bind(this)(appStoreInstance.source)
                    if (!Array.isArray(subscription)) {
                        subscription = [subscription]
                    }
                    subscriptionList = [...subscriptionList, ...subscription]
                    console.log('Decorator ngOnInit()')
                }
            }
        });

        defineProperty(targetPrototype, onDestroyName, {
            configurable: true,
            enumerable: true,
            get() {
                return () => {
                    if (ngOnDestroyOriginal) {
                        ngOnDestroyOriginal.bind(this)()
                    }
                    console.log(`Unsubscribing from ${subscriptionList.length} subscription(s).`)
                    subscriptionList.forEach(subscription => subscription.unsubscribe())
                    console.log('Decorator ngOnDestroy()')
                    subscriptionList = undefined
                }
            }
        });
    }
}
