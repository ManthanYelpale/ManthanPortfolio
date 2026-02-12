// Event Listener Manager - Prevents memory leaks from event listeners
// Uses WeakMap for automatic garbage collection
class EventManager {
    constructor() {
        this.listeners = new WeakMap();
    }

    add(element, event, handler, options = {}) {
        if (!element) return;

        // Store listener reference for cleanup
        if (!this.listeners.has(element)) {
            this.listeners.set(element, new Map());
        }

        const elementListeners = this.listeners.get(element);

        // Wrap handler to enable passive listeners by default
        const wrappedHandler = options.passive !== false
            ? handler
            : handler;

        const listenerOptions = {
            passive: options.passive !== false,
            capture: options.capture || false,
            once: options.once || false
        };

        element.addEventListener(event, wrappedHandler, listenerOptions);

        // Store for cleanup
        if (!elementListeners.has(event)) {
            elementListeners.set(event, []);
        }
        elementListeners.get(event).push({ handler: wrappedHandler, options: listenerOptions });
    }

    remove(element, event, handler) {
        if (!element || !this.listeners.has(element)) return;

        const elementListeners = this.listeners.get(element);
        if (!elementListeners.has(event)) return;

        const handlers = elementListeners.get(event);
        const index = handlers.findIndex(h => h.handler === handler);

        if (index !== -1) {
            const { handler: storedHandler, options } = handlers[index];
            element.removeEventListener(event, storedHandler, options);
            handlers.splice(index, 1);
        }
    }

    removeAll(element) {
        if (!element || !this.listeners.has(element)) return;

        const elementListeners = this.listeners.get(element);

        elementListeners.forEach((handlers, event) => {
            handlers.forEach(({ handler, options }) => {
                element.removeEventListener(event, handler, options);
            });
        });

        this.listeners.delete(element);
    }

    // Throttle helper - reduces event frequency
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce helper - delays execution until events stop
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

export default new EventManager(); // Singleton
