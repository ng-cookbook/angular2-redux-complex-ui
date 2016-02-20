
const { defineProperty } = Object
const methodName = 'ngOnDestroy'

export function AppStoreSubscriber() {
    'use strict'
    return function(target) {

        console.log('Calling AppStoreSubscriber')

        let originalFxn
        if (typeof target.prototype[methodName] === 'function') {
            originalFxn = target.prototype[methodName]
        }

        defineProperty(target.prototype, methodName, {
            configurable: true,
            enumerable: true,
            get() {
                return () => {
                    if (originalFxn) {
                        originalFxn.bind(this)()
                    }
                    console.log('Decorator ngOnDestroy()')
                }
            },
            set(newValue) {
                // TODO: What should be done when the method is being replaced?
                return newValue;
            }
        });
    }
}
