
import {appStoreInstance} from '../services/app-store'

const onDestroyName = 'ngOnDestroy'
const onInitName = 'ngOnInit'
const onInitAppStoreSubscriptionName = 'onInitAppStoreSubscription'
const componentSubscriptionsName = Symbol('ComponentSubscriptions')

export interface IAppStoreSubscriber {
    onInitAppStoreSubscription(source: any): void
}

export function AppStoreSubscriber() {
    'use strict'
    const { defineProperty } = Object
    return function(target) {

        console.log('Calling AppStoreSubscriber')

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
                    this[componentSubscriptionsName] = [...subscription]
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
                    let subscriptionList = this[componentSubscriptionsName]
                    console.log(`Unsubscribing from ${subscriptionList.length} subscription(s).`)
                    subscriptionList.forEach(subscription => subscription.unsubscribe())
                    console.log('Decorator ngOnDestroy()')
                    subscriptionList = undefined
                }
            }
        });
    }
}
