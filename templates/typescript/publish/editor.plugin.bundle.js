(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material'), require('@angular/forms'), require('@angular/router'), require('pepperi-user-service')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/material', '@angular/forms', '@angular/router', 'pepperi-user-service'], factory) :
    (global = global || self, factory(global.scheduler = {}, global.core, global.common, global.material, global.forms, global.router, global.pepperiUserService));
}(this, (function (exports, core, common, material, forms, router, pepperiUserService) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isFunction(x) {
        return typeof x === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    var config = {
        Promise: undefined,
        set useDeprecatedSynchronousErrorHandling(value) {
            if (value) {
                var error = /*@__PURE__*/ new Error();
                /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
            }
            _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return _enable_super_gross_mode_that_will_cause_bad_things;
        },
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function hostReportError(err) {
        setTimeout(function () { throw err; }, 0);
    }

    /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        },
        complete: function () { }
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isObject(x) {
        return x !== null && typeof x === 'object';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
        function UnsubscriptionErrorImpl(errors) {
            Error.call(this);
            this.message = errors ?
                errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
            return this;
        }
        UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return UnsubscriptionErrorImpl;
    })();
    var UnsubscriptionError = UnsubscriptionErrorImpl;

    /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
    var Subscription = /*@__PURE__*/ (function () {
        function Subscription(unsubscribe) {
            this.closed = false;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (unsubscribe) {
                this._unsubscribe = unsubscribe;
            }
        }
        Subscription.prototype.unsubscribe = function () {
            var errors;
            if (this.closed) {
                return;
            }
            var _a = this, _parentOrParents = _a._parentOrParents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
            this.closed = true;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (_parentOrParents instanceof Subscription) {
                _parentOrParents.remove(this);
            }
            else if (_parentOrParents !== null) {
                for (var index = 0; index < _parentOrParents.length; ++index) {
                    var parent_1 = _parentOrParents[index];
                    parent_1.remove(this);
                }
            }
            if (isFunction(_unsubscribe)) {
                try {
                    _unsubscribe.call(this);
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
                }
            }
            if (isArray(_subscriptions)) {
                var index = -1;
                var len = _subscriptions.length;
                while (++index < len) {
                    var sub = _subscriptions[index];
                    if (isObject(sub)) {
                        try {
                            sub.unsubscribe();
                        }
                        catch (e) {
                            errors = errors || [];
                            if (e instanceof UnsubscriptionError) {
                                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                            }
                            else {
                                errors.push(e);
                            }
                        }
                    }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        };
        Subscription.prototype.add = function (teardown) {
            var subscription = teardown;
            if (!teardown) {
                return Subscription.EMPTY;
            }
            switch (typeof teardown) {
                case 'function':
                    subscription = new Subscription(teardown);
                case 'object':
                    if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                        return subscription;
                    }
                    else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    }
                    else if (!(subscription instanceof Subscription)) {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [tmp];
                    }
                    break;
                default: {
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                }
            }
            var _parentOrParents = subscription._parentOrParents;
            if (_parentOrParents === null) {
                subscription._parentOrParents = this;
            }
            else if (_parentOrParents instanceof Subscription) {
                if (_parentOrParents === this) {
                    return subscription;
                }
                subscription._parentOrParents = [_parentOrParents, this];
            }
            else if (_parentOrParents.indexOf(this) === -1) {
                _parentOrParents.push(this);
            }
            else {
                return subscription;
            }
            var subscriptions = this._subscriptions;
            if (subscriptions === null) {
                this._subscriptions = [subscription];
            }
            else {
                subscriptions.push(subscription);
            }
            return subscription;
        };
        Subscription.prototype.remove = function (subscription) {
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        };
        Subscription.EMPTY = (function (empty) {
            empty.closed = true;
            return empty;
        }(new Subscription()));
        return Subscription;
    }());
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var rxSubscriber = /*@__PURE__*/ (function () {
        return typeof Symbol === 'function'
            ? /*@__PURE__*/ Symbol('rxSubscriber')
            : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
    })();

    /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
    var Subscriber = /*@__PURE__*/ (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destinationOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this.syncErrorValue = null;
            _this.syncErrorThrown = false;
            _this.syncErrorThrowable = false;
            _this.isStopped = false;
            switch (arguments.length) {
                case 0:
                    _this.destination = empty;
                    break;
                case 1:
                    if (!destinationOrNext) {
                        _this.destination = empty;
                        break;
                    }
                    if (typeof destinationOrNext === 'object') {
                        if (destinationOrNext instanceof Subscriber) {
                            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                            _this.destination = destinationOrNext;
                            destinationOrNext.add(_this);
                        }
                        else {
                            _this.syncErrorThrowable = true;
                            _this.destination = new SafeSubscriber(_this, destinationOrNext);
                        }
                        break;
                    }
                default:
                    _this.syncErrorThrowable = true;
                    _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                    break;
            }
            return _this;
        }
        Subscriber.prototype[rxSubscriber] = function () { return this; };
        Subscriber.create = function (next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        };
        Subscriber.prototype.next = function (value) {
            if (!this.isStopped) {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            this.destination.error(err);
            this.unsubscribe();
        };
        Subscriber.prototype._complete = function () {
            this.destination.complete();
            this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function () {
            var _parentOrParents = this._parentOrParents;
            this._parentOrParents = null;
            this.unsubscribe();
            this.closed = false;
            this.isStopped = false;
            this._parentOrParents = _parentOrParents;
            return this;
        };
        return Subscriber;
    }(Subscription));
    var SafeSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this._parentSubscriber = _parentSubscriber;
            var next;
            var context = _this;
            if (isFunction(observerOrNext)) {
                next = observerOrNext;
            }
            else if (observerOrNext) {
                next = observerOrNext.next;
                error = observerOrNext.error;
                complete = observerOrNext.complete;
                if (observerOrNext !== empty) {
                    context = Object.create(observerOrNext);
                    if (isFunction(context.unsubscribe)) {
                        _this.add(context.unsubscribe.bind(context));
                    }
                    context.unsubscribe = _this.unsubscribe.bind(_this);
                }
            }
            _this._context = context;
            _this._next = next;
            _this._error = error;
            _this._complete = complete;
            return _this;
        }
        SafeSubscriber.prototype.next = function (value) {
            if (!this.isStopped && this._next) {
                var _parentSubscriber = this._parentSubscriber;
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                }
                else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                if (this._error) {
                    if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, this._error, err);
                        this.unsubscribe();
                    }
                }
                else if (!_parentSubscriber.syncErrorThrowable) {
                    this.unsubscribe();
                    if (useDeprecatedSynchronousErrorHandling) {
                        throw err;
                    }
                    hostReportError(err);
                }
                else {
                    if (useDeprecatedSynchronousErrorHandling) {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                    }
                    else {
                        hostReportError(err);
                    }
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.complete = function () {
            var _this = this;
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                if (this._complete) {
                    var wrappedComplete = function () { return _this._complete.call(_this._context); };
                    if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(wrappedComplete);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                        this.unsubscribe();
                    }
                }
                else {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                this.unsubscribe();
                if (config.useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                else {
                    hostReportError(err);
                }
            }
        };
        SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
            if (!config.useDeprecatedSynchronousErrorHandling) {
                throw new Error('bad call');
            }
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                else {
                    hostReportError(err);
                    return true;
                }
            }
            return false;
        };
        SafeSubscriber.prototype._unsubscribe = function () {
            var _parentSubscriber = this._parentSubscriber;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
    function canReportError(observer) {
        while (observer) {
            var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
            if (closed_1 || isStopped) {
                return false;
            }
            else if (destination && destination instanceof Subscriber) {
                observer = destination;
            }
            else {
                observer = null;
            }
        }
        return true;
    }

    /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber]) {
                return nextOrObserver[rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber(empty);
        }
        return new Subscriber(nextOrObserver, error, complete);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function identity(x) {
        return x;
    }

    /** PURE_IMPORTS_START _identity PURE_IMPORTS_END */
    function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return pipeFromArray(fns);
    }
    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
    var Observable = /*@__PURE__*/ (function () {
        function Observable(subscribe) {
            this._isScalar = false;
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var operator = this.operator;
            var sink = toSubscriber(observerOrNext, error, complete);
            if (operator) {
                sink.add(operator.call(sink, this.source));
            }
            else {
                sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                    this._subscribe(sink) :
                    this._trySubscribe(sink));
            }
            if (config.useDeprecatedSynchronousErrorHandling) {
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
            }
            return sink;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                }
                if (canReportError(sink)) {
                    sink.error(err);
                }
                else {
                    console.warn(err);
                }
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscription;
                subscription = _this.subscribe(function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                }, reject, resolve);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var source = this.source;
            return source && source.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            if (operations.length === 0) {
                return this;
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        if (!promiseCtor) {
            promiseCtor =  Promise;
        }
        if (!promiseCtor) {
            throw new Error('no Promise impl found');
        }
        return promiseCtor;
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
        function ObjectUnsubscribedErrorImpl() {
            Error.call(this);
            this.message = 'object unsubscribed';
            this.name = 'ObjectUnsubscribedError';
            return this;
        }
        ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ObjectUnsubscribedErrorImpl;
    })();
    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
    var SubjectSubscription = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
            var _this = _super.call(this) || this;
            _this.subject = subject;
            _this.subscriber = subscriber;
            _this.closed = false;
            return _this;
        }
        SubjectSubscription.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var subject = this.subject;
            var observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        };
        return SubjectSubscription;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
    var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            return _this;
        }
        return SubjectSubscriber;
    }(Subscriber));
    var Subject = /*@__PURE__*/ (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.observers = [];
            _this.closed = false;
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype[rxSubscriber] = function () {
            return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype.next = function (value) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        };
        Subject.prototype.error = function (err) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        };
        Subject.prototype.complete = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        };
        Subject.prototype._trySubscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return _super.prototype._trySubscribe.call(this, subscriber);
            }
        };
        Subject.prototype._subscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            else if (this.isStopped) {
                subscriber.complete();
                return Subscription.EMPTY;
            }
            else {
                this.observers.push(subscriber);
                return new SubjectSubscription(this, subscriber);
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = /*@__PURE__*/ (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var destination = this.destination;
            if (destination && destination.next) {
                destination.next(value);
            }
        };
        AnonymousSubject.prototype.error = function (err) {
            var destination = this.destination;
            if (destination && destination.error) {
                this.destination.error(err);
            }
        };
        AnonymousSubject.prototype.complete = function () {
            var destination = this.destination;
            if (destination && destination.complete) {
                this.destination.complete();
            }
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var source = this.source;
            if (source) {
                return this.source.subscribe(subscriber);
            }
            else {
                return Subscription.EMPTY;
            }
        };
        return AnonymousSubject;
    }(Subject));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function refCount() {
        return function refCountOperatorFunction(source) {
            return source.lift(new RefCountOperator(source));
        };
    }
    var RefCountOperator = /*@__PURE__*/ (function () {
        function RefCountOperator(connectable) {
            this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function (subscriber, source) {
            var connectable = this.connectable;
            connectable._refCount++;
            var refCounter = new RefCountSubscriber(subscriber, connectable);
            var subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
                refCounter.connection = connectable.connect();
            }
            return subscription;
        };
        return RefCountOperator;
    }());
    var RefCountSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        RefCountSubscriber.prototype._unsubscribe = function () {
            var connectable = this.connectable;
            if (!connectable) {
                this.connection = null;
                return;
            }
            this.connectable = null;
            var refCount = connectable._refCount;
            if (refCount <= 0) {
                this.connection = null;
                return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
                this.connection = null;
                return;
            }
            var connection = this.connection;
            var sharedConnection = connectable._connection;
            this.connection = null;
            if (sharedConnection && (!connection || sharedConnection === connection)) {
                sharedConnection.unsubscribe();
            }
        };
        return RefCountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
    var ConnectableObservable = /*@__PURE__*/ (function (_super) {
        __extends(ConnectableObservable, _super);
        function ConnectableObservable(source, subjectFactory) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.subjectFactory = subjectFactory;
            _this._refCount = 0;
            _this._isComplete = false;
            return _this;
        }
        ConnectableObservable.prototype._subscribe = function (subscriber) {
            return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable.prototype.getSubject = function () {
            var subject = this._subject;
            if (!subject || subject.isStopped) {
                this._subject = this.subjectFactory();
            }
            return this._subject;
        };
        ConnectableObservable.prototype.connect = function () {
            var connection = this._connection;
            if (!connection) {
                this._isComplete = false;
                connection = this._connection = new Subscription();
                connection.add(this.source
                    .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                if (connection.closed) {
                    this._connection = null;
                    connection = Subscription.EMPTY;
                }
            }
            return connection;
        };
        ConnectableObservable.prototype.refCount = function () {
            return refCount()(this);
        };
        return ConnectableObservable;
    }(Observable));
    var connectableObservableDescriptor = /*@__PURE__*/ (function () {
        var connectableProto = ConnectableObservable.prototype;
        return {
            operator: { value: null },
            _refCount: { value: 0, writable: true },
            _subject: { value: null, writable: true },
            _connection: { value: null, writable: true },
            _subscribe: { value: connectableProto._subscribe },
            _isComplete: { value: connectableProto._isComplete, writable: true },
            getSubject: { value: connectableProto.getSubject },
            connect: { value: connectableProto.connect },
            refCount: { value: connectableProto.refCount }
        };
    })();
    var ConnectableSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(ConnectableSubscriber, _super);
        function ConnectableSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        ConnectableSubscriber.prototype._error = function (err) {
            this._unsubscribe();
            _super.prototype._error.call(this, err);
        };
        ConnectableSubscriber.prototype._complete = function () {
            this.connectable._isComplete = true;
            this._unsubscribe();
            _super.prototype._complete.call(this);
        };
        ConnectableSubscriber.prototype._unsubscribe = function () {
            var connectable = this.connectable;
            if (connectable) {
                this.connectable = null;
                var connection = connectable._connection;
                connectable._refCount = 0;
                connectable._subject = null;
                connectable._connection = null;
                if (connection) {
                    connection.unsubscribe();
                }
            }
        };
        return ConnectableSubscriber;
    }(SubjectSubscriber));

    /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
    var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
    function empty$1(scheduler) {
        return scheduler ? emptyScheduled(scheduler) : EMPTY;
    }
    function emptyScheduled(scheduler) {
        return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isScheduler(value) {
        return value && typeof value.schedule === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var subscribeToArray = function (array) {
        return function (subscriber) {
            for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        };
    };

    /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
    function scheduleArray(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
    function fromArray(input, scheduler) {
        if (!scheduler) {
            return new Observable(subscribeToArray(input));
        }
        else {
            return scheduleArray(input, scheduler);
        }
    }

    /** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
    function of() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = args[args.length - 1];
        if (isScheduler(scheduler)) {
            args.pop();
            return scheduleArray(args, scheduler);
        }
        else {
            return fromArray(args);
        }
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/ (function () {
        function ArgumentOutOfRangeErrorImpl() {
            Error.call(this);
            this.message = 'argument out of range';
            this.name = 'ArgumentOutOfRangeError';
            return this;
        }
        ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ArgumentOutOfRangeErrorImpl;
    })();
    var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function map(project, thisArg) {
        return function mapOperation(source) {
            if (typeof project !== 'function') {
                throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
            }
            return source.lift(new MapOperator(project, thisArg));
        };
    }
    var MapOperator = /*@__PURE__*/ (function () {
        function MapOperator(project, thisArg) {
            this.project = project;
            this.thisArg = thisArg;
        }
        MapOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        };
        return MapOperator;
    }());
    var MapSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(MapSubscriber, _super);
        function MapSubscriber(destination, project, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.count = 0;
            _this.thisArg = thisArg || _this;
            return _this;
        }
        MapSubscriber.prototype._next = function (value) {
            var result;
            try {
                result = this.project.call(this.thisArg, value, this.count++);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return MapSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    var OuterSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(OuterSubscriber, _super);
        function OuterSubscriber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        OuterSubscriber.prototype.notifyError = function (error, innerSub) {
            this.destination.error(error);
        };
        OuterSubscriber.prototype.notifyComplete = function (innerSub) {
            this.destination.complete();
        };
        return OuterSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    var InnerSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(InnerSubscriber, _super);
        function InnerSubscriber(parent, outerValue, outerIndex) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.outerValue = outerValue;
            _this.outerIndex = outerIndex;
            _this.index = 0;
            return _this;
        }
        InnerSubscriber.prototype._next = function (value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        };
        InnerSubscriber.prototype._error = function (error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
        };
        InnerSubscriber.prototype._complete = function () {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        };
        return InnerSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
    var subscribeToPromise = function (promise) {
        return function (subscriber) {
            promise.then(function (value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function (err) { return subscriber.error(err); })
                .then(null, hostReportError);
            return subscriber;
        };
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function getSymbolIterator() {
        if (typeof Symbol !== 'function' || !Symbol.iterator) {
            return '@@iterator';
        }
        return Symbol.iterator;
    }
    var iterator = /*@__PURE__*/ getSymbolIterator();

    /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
    var subscribeToIterable = function (iterable) {
        return function (subscriber) {
            var iterator$1 = iterable[iterator]();
            do {
                var item = iterator$1.next();
                if (item.done) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(item.value);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
            if (typeof iterator$1.return === 'function') {
                subscriber.add(function () {
                    if (iterator$1.return) {
                        iterator$1.return();
                    }
                });
            }
            return subscriber;
        };
    };

    /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
    var subscribeToObservable = function (obj) {
        return function (subscriber) {
            var obs = obj[observable]();
            if (typeof obs.subscribe !== 'function') {
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
            }
            else {
                return obs.subscribe(subscriber);
            }
        };
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isPromise(value) {
        return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }

    /** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
    var subscribeTo = function (result) {
        if (!!result && typeof result[observable] === 'function') {
            return subscribeToObservable(result);
        }
        else if (isArrayLike(result)) {
            return subscribeToArray(result);
        }
        else if (isPromise(result)) {
            return subscribeToPromise(result);
        }
        else if (!!result && typeof result[iterator] === 'function') {
            return subscribeToIterable(result);
        }
        else {
            var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
            var msg = "You provided " + value + " where a stream was expected."
                + ' You can provide an Observable, Promise, Array, or Iterable.';
            throw new TypeError(msg);
        }
    };

    /** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
        if (innerSubscriber === void 0) {
            innerSubscriber = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
        }
        if (innerSubscriber.closed) {
            return undefined;
        }
        if (result instanceof Observable) {
            return result.subscribe(innerSubscriber);
        }
        return subscribeTo(result)(innerSubscriber);
    }

    /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */
    function scheduleObservable(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function () {
                var observable$1 = input[observable]();
                sub.add(observable$1.subscribe({
                    next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                    error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                    complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                }));
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
    function schedulePromise(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
                });
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */
    function scheduleIterable(input, scheduler) {
        if (!input) {
            throw new Error('Iterable cannot be null');
        }
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            var iterator$1;
            sub.add(function () {
                if (iterator$1 && typeof iterator$1.return === 'function') {
                    iterator$1.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator$1 = input[iterator]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator$1.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
    function isInteropObservable(input) {
        return input && typeof input[observable] === 'function';
    }

    /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
    function isIterable(input) {
        return input && typeof input[iterator] === 'function';
    }

    /** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */
    function scheduled(input, scheduler) {
        if (input != null) {
            if (isInteropObservable(input)) {
                return scheduleObservable(input, scheduler);
            }
            else if (isPromise(input)) {
                return schedulePromise(input, scheduler);
            }
            else if (isArrayLike(input)) {
                return scheduleArray(input, scheduler);
            }
            else if (isIterable(input) || typeof input === 'string') {
                return scheduleIterable(input, scheduler);
            }
        }
        throw new TypeError((input !== null && typeof input || input) + ' is not observable');
    }

    /** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */
    function from(input, scheduler) {
        if (!scheduler) {
            if (input instanceof Observable) {
                return input;
            }
            return new Observable(subscribeTo(input));
        }
        else {
            return scheduled(input, scheduler);
        }
    }

    /** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */
    function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        if (typeof resultSelector === 'function') {
            return function (source) { return source.pipe(mergeMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
        }
        else if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
    }
    var MergeMapOperator = /*@__PURE__*/ (function () {
        function MergeMapOperator(project, concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            this.project = project;
            this.concurrent = concurrent;
        }
        MergeMapOperator.prototype.call = function (observer, source) {
            return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
        };
        return MergeMapOperator;
    }());
    var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(MergeMapSubscriber, _super);
        function MergeMapSubscriber(destination, project, concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.concurrent = concurrent;
            _this.hasCompleted = false;
            _this.buffer = [];
            _this.active = 0;
            _this.index = 0;
            return _this;
        }
        MergeMapSubscriber.prototype._next = function (value) {
            if (this.active < this.concurrent) {
                this._tryNext(value);
            }
            else {
                this.buffer.push(value);
            }
        };
        MergeMapSubscriber.prototype._tryNext = function (value) {
            var result;
            var index = this.index++;
            try {
                result = this.project(value, index);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.active++;
            this._innerSub(result, value, index);
        };
        MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
            var innerSubscriber = new InnerSubscriber(this, value, index);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = subscribeToResult(this, ish, undefined, undefined, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                destination.add(innerSubscription);
            }
        };
        MergeMapSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                this.destination.complete();
            }
            this.unsubscribe();
        };
        MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
            var buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            }
            else if (this.active === 0 && this.hasCompleted) {
                this.destination.complete();
            }
        };
        return MergeMapSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */
    function mergeAll(concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        return mergeMap(identity, concurrent);
    }

    /** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */
    function concatAll() {
        return mergeAll(1);
    }

    /** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */
    function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return concatAll()(of.apply(void 0, observables));
    }

    /** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */
    function merge() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var concurrent = Number.POSITIVE_INFINITY;
        var scheduler = null;
        var last = observables[observables.length - 1];
        if (isScheduler(last)) {
            scheduler = observables.pop();
            if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
                concurrent = observables.pop();
            }
        }
        else if (typeof last === 'number') {
            concurrent = observables.pop();
        }
        if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable) {
            return observables[0];
        }
        return mergeAll(concurrent)(fromArray(observables, scheduler));
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function filter(predicate, thisArg) {
        return function filterOperatorFunction(source) {
            return source.lift(new FilterOperator(predicate, thisArg));
        };
    }
    var FilterOperator = /*@__PURE__*/ (function () {
        function FilterOperator(predicate, thisArg) {
            this.predicate = predicate;
            this.thisArg = thisArg;
        }
        FilterOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
        };
        return FilterOperator;
    }());
    var FilterSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(FilterSubscriber, _super);
        function FilterSubscriber(destination, predicate, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.thisArg = thisArg;
            _this.count = 0;
            return _this;
        }
        FilterSubscriber.prototype._next = function (value) {
            var result;
            try {
                result = this.predicate.call(this.thisArg, value, this.count++);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.destination.next(value);
            }
        };
        return FilterSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */
    function concatMap(project, resultSelector) {
        return mergeMap(project, resultSelector, 1);
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function defaultIfEmpty(defaultValue) {
        if (defaultValue === void 0) {
            defaultValue = null;
        }
        return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
    }
    var DefaultIfEmptyOperator = /*@__PURE__*/ (function () {
        function DefaultIfEmptyOperator(defaultValue) {
            this.defaultValue = defaultValue;
        }
        DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
        };
        return DefaultIfEmptyOperator;
    }());
    var DefaultIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
        __extends(DefaultIfEmptySubscriber, _super);
        function DefaultIfEmptySubscriber(destination, defaultValue) {
            var _this = _super.call(this, destination) || this;
            _this.defaultValue = defaultValue;
            _this.isEmpty = true;
            return _this;
        }
        DefaultIfEmptySubscriber.prototype._next = function (value) {
            this.isEmpty = false;
            this.destination.next(value);
        };
        DefaultIfEmptySubscriber.prototype._complete = function () {
            if (this.isEmpty) {
                this.destination.next(this.defaultValue);
            }
            this.destination.complete();
        };
        return DefaultIfEmptySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
    function take(count) {
        return function (source) {
            if (count === 0) {
                return empty$1();
            }
            else {
                return source.lift(new TakeOperator(count));
            }
        };
    }
    var TakeOperator = /*@__PURE__*/ (function () {
        function TakeOperator(total) {
            this.total = total;
            if (this.total < 0) {
                throw new ArgumentOutOfRangeError;
            }
        }
        TakeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TakeSubscriber(subscriber, this.total));
        };
        return TakeOperator;
    }());
    var TakeSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(TakeSubscriber, _super);
        function TakeSubscriber(destination, total) {
            var _this = _super.call(this, destination) || this;
            _this.total = total;
            _this.count = 0;
            return _this;
        }
        TakeSubscriber.prototype._next = function (value) {
            var total = this.total;
            var count = ++this.count;
            if (count <= total) {
                this.destination.next(value);
                if (count === total) {
                    this.destination.complete();
                    this.unsubscribe();
                }
            }
        };
        return TakeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
    function takeLast(count) {
        return function takeLastOperatorFunction(source) {
            if (count === 0) {
                return empty$1();
            }
            else {
                return source.lift(new TakeLastOperator(count));
            }
        };
    }
    var TakeLastOperator = /*@__PURE__*/ (function () {
        function TakeLastOperator(total) {
            this.total = total;
            if (this.total < 0) {
                throw new ArgumentOutOfRangeError;
            }
        }
        TakeLastOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
        };
        return TakeLastOperator;
    }());
    var TakeLastSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(TakeLastSubscriber, _super);
        function TakeLastSubscriber(destination, total) {
            var _this = _super.call(this, destination) || this;
            _this.total = total;
            _this.ring = new Array();
            _this.count = 0;
            return _this;
        }
        TakeLastSubscriber.prototype._next = function (value) {
            var ring = this.ring;
            var total = this.total;
            var count = this.count++;
            if (ring.length < total) {
                ring.push(value);
            }
            else {
                var index = count % total;
                ring[index] = value;
            }
        };
        TakeLastSubscriber.prototype._complete = function () {
            var destination = this.destination;
            var count = this.count;
            if (count > 0) {
                var total = this.count >= this.total ? this.total : this.count;
                var ring = this.ring;
                for (var i = 0; i < total; i++) {
                    var idx = (count++) % total;
                    destination.next(ring[idx]);
                }
            }
            destination.complete();
        };
        return TakeLastSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function scan(accumulator, seed) {
        var hasSeed = false;
        if (arguments.length >= 2) {
            hasSeed = true;
        }
        return function scanOperatorFunction(source) {
            return source.lift(new ScanOperator(accumulator, seed, hasSeed));
        };
    }
    var ScanOperator = /*@__PURE__*/ (function () {
        function ScanOperator(accumulator, seed, hasSeed) {
            if (hasSeed === void 0) {
                hasSeed = false;
            }
            this.accumulator = accumulator;
            this.seed = seed;
            this.hasSeed = hasSeed;
        }
        ScanOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
        };
        return ScanOperator;
    }());
    var ScanSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(ScanSubscriber, _super);
        function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
            var _this = _super.call(this, destination) || this;
            _this.accumulator = accumulator;
            _this._seed = _seed;
            _this.hasSeed = hasSeed;
            _this.index = 0;
            return _this;
        }
        Object.defineProperty(ScanSubscriber.prototype, "seed", {
            get: function () {
                return this._seed;
            },
            set: function (value) {
                this.hasSeed = true;
                this._seed = value;
            },
            enumerable: true,
            configurable: true
        });
        ScanSubscriber.prototype._next = function (value) {
            if (!this.hasSeed) {
                this.seed = value;
                this.destination.next(value);
            }
            else {
                return this._tryNext(value);
            }
        };
        ScanSubscriber.prototype._tryNext = function (value) {
            var index = this.index++;
            var result;
            try {
                result = this.accumulator(this.seed, value, index);
            }
            catch (err) {
                this.destination.error(err);
            }
            this.seed = result;
            this.destination.next(result);
        };
        return ScanSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */
    function reduce(accumulator, seed) {
        if (arguments.length >= 2) {
            return function reduceOperatorFunctionWithSeed(source) {
                return pipe(scan(accumulator, seed), takeLast(1), defaultIfEmpty(seed))(source);
            };
        }
        return function reduceOperatorFunction(source) {
            return pipe(scan(function (acc, value, index) { return accumulator(acc, value, index + 1); }), takeLast(1))(source);
        };
    }

    /** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */
    function multicast(subjectOrSubjectFactory, selector) {
        return function multicastOperatorFunction(source) {
            var subjectFactory;
            if (typeof subjectOrSubjectFactory === 'function') {
                subjectFactory = subjectOrSubjectFactory;
            }
            else {
                subjectFactory = function subjectFactory() {
                    return subjectOrSubjectFactory;
                };
            }
            if (typeof selector === 'function') {
                return source.lift(new MulticastOperator(subjectFactory, selector));
            }
            var connectable = Object.create(source, connectableObservableDescriptor);
            connectable.source = source;
            connectable.subjectFactory = subjectFactory;
            return connectable;
        };
    }
    var MulticastOperator = /*@__PURE__*/ (function () {
        function MulticastOperator(subjectFactory, selector) {
            this.subjectFactory = subjectFactory;
            this.selector = selector;
        }
        MulticastOperator.prototype.call = function (subscriber, source) {
            var selector = this.selector;
            var subject = this.subjectFactory();
            var subscription = selector(subject).subscribe(subscriber);
            subscription.add(source.subscribe(subject));
            return subscription;
        };
        return MulticastOperator;
    }());

    /** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */
    function shareSubjectFactory() {
        return new Subject();
    }
    function share() {
        return function (source) { return refCount()(multicast(shareSubjectFactory)(source)); };
    }

    /** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */
    function switchMap(project, resultSelector) {
        if (typeof resultSelector === 'function') {
            return function (source) { return source.pipe(switchMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
        }
        return function (source) { return source.lift(new SwitchMapOperator(project)); };
    }
    var SwitchMapOperator = /*@__PURE__*/ (function () {
        function SwitchMapOperator(project) {
            this.project = project;
        }
        SwitchMapOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
        };
        return SwitchMapOperator;
    }());
    var SwitchMapSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SwitchMapSubscriber, _super);
        function SwitchMapSubscriber(destination, project) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.index = 0;
            return _this;
        }
        SwitchMapSubscriber.prototype._next = function (value) {
            var result;
            var index = this.index++;
            try {
                result = this.project(value, index);
            }
            catch (error) {
                this.destination.error(error);
                return;
            }
            this._innerSub(result, value, index);
        };
        SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            var innerSubscriber = new InnerSubscriber(this, value, index);
            var destination = this.destination;
            destination.add(innerSubscriber);
            this.innerSubscription = subscribeToResult(this, result, undefined, undefined, innerSubscriber);
            if (this.innerSubscription !== innerSubscriber) {
                destination.add(this.innerSubscription);
            }
        };
        SwitchMapSubscriber.prototype._complete = function () {
            var innerSubscription = this.innerSubscription;
            if (!innerSubscription || innerSubscription.closed) {
                _super.prototype._complete.call(this);
            }
            this.unsubscribe();
        };
        SwitchMapSubscriber.prototype._unsubscribe = function () {
            this.innerSubscription = null;
        };
        SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
            var destination = this.destination;
            destination.remove(innerSub);
            this.innerSubscription = null;
            if (this.isStopped) {
                _super.prototype._complete.call(this);
            }
        };
        SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        return SwitchMapSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function takeUntil(notifier) {
        return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
    }
    var TakeUntilOperator = /*@__PURE__*/ (function () {
        function TakeUntilOperator(notifier) {
            this.notifier = notifier;
        }
        TakeUntilOperator.prototype.call = function (subscriber, source) {
            var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
            var notifierSubscription = subscribeToResult(takeUntilSubscriber, this.notifier);
            if (notifierSubscription && !takeUntilSubscriber.seenValue) {
                takeUntilSubscriber.add(notifierSubscription);
                return source.subscribe(takeUntilSubscriber);
            }
            return takeUntilSubscriber;
        };
        return TakeUntilOperator;
    }());
    var TakeUntilSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(TakeUntilSubscriber, _super);
        function TakeUntilSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.seenValue = false;
            return _this;
        }
        TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.seenValue = true;
            this.complete();
        };
        TakeUntilSubscriber.prototype.notifyComplete = function () {
        };
        return TakeUntilSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */
    function toArrayReducer(arr, item, index) {
        if (index === 0) {
            return [item];
        }
        arr.push(item);
        return arr;
    }
    function toArray() {
        return reduce(toArrayReducer, []);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var  /**
     * @abstract
     */
    TranslateLoader = /** @class */ (function () {
        function TranslateLoader() {
        }
        return TranslateLoader;
    }());
    /**
     * This loader is just a placeholder that does nothing, in case you don't need a loader at all
     */
    var TranslateFakeLoader = /** @class */ (function (_super) {
        __extends(TranslateFakeLoader, _super);
        function TranslateFakeLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeLoader.prototype.getTranslation = /**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            return of({});
        };
        TranslateFakeLoader.decorators = [
            { type: core.Injectable }
        ];
        return TranslateFakeLoader;
    }(TranslateLoader));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var  /**
     * @abstract
     */
    MissingTranslationHandler = /** @class */ (function () {
        function MissingTranslationHandler() {
        }
        return MissingTranslationHandler;
    }());
    /**
     * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
     */
    var FakeMissingTranslationHandler = /** @class */ (function () {
        function FakeMissingTranslationHandler() {
        }
        /**
         * @param {?} params
         * @return {?}
         */
        FakeMissingTranslationHandler.prototype.handle = /**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            return params.key;
        };
        FakeMissingTranslationHandler.decorators = [
            { type: core.Injectable }
        ];
        return FakeMissingTranslationHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var  /**
     * @abstract
     */
    TranslateCompiler = /** @class */ (function () {
        function TranslateCompiler() {
        }
        return TranslateCompiler;
    }());
    /**
     * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
     */
    var TranslateFakeCompiler = /** @class */ (function (_super) {
        __extends(TranslateFakeCompiler, _super);
        function TranslateFakeCompiler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeCompiler.prototype.compile = /**
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
        function (value, lang) {
            return value;
        };
        /**
         * @param {?} translations
         * @param {?} lang
         * @return {?}
         */
        TranslateFakeCompiler.prototype.compileTranslations = /**
         * @param {?} translations
         * @param {?} lang
         * @return {?}
         */
        function (translations, lang) {
            return translations;
        };
        TranslateFakeCompiler.decorators = [
            { type: core.Injectable }
        ];
        return TranslateFakeCompiler;
    }(TranslateCompiler));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /* tslint:disable */
    /**
     * Determines if two objects or two values are equivalent.
     *
     * Two objects or values are considered equivalent if at least one of the following is true:
     *
     * * Both objects or values pass `===` comparison.
     * * Both objects or values are of the same type and all of their properties are equal by
     *   comparing them with `equals`.
     *
     * @param {?} o1 Object or value to compare.
     * @param {?} o2 Object or value to compare.
     * @return {?} true if arguments are equal.
     */
    function equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true; // NaN === NaN
        // NaN === NaN
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var length;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 == t2 && t1 == 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2))
                    return false;
                if ((length = o1.length) == o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(o2)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in o1) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    /* tslint:enable */
    /**
     * @param {?} value
     * @return {?}
     */
    function isDefined(value) {
        return typeof value !== 'undefined' && value !== null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function isObject$1(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    /**
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    function mergeDeep(target, source) {
        /** @type {?} */
        var output = Object.assign({}, target);
        if (isObject$1(target) && isObject$1(source)) {
            Object.keys(source).forEach(function (key) {
                var _a, _b;
                if (isObject$1(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                    }
                    else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
            });
        }
        return output;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var  /**
     * @abstract
     */
    TranslateParser = /** @class */ (function () {
        function TranslateParser() {
        }
        return TranslateParser;
    }());
    var TranslateDefaultParser = /** @class */ (function (_super) {
        __extends(TranslateDefaultParser, _super);
        function TranslateDefaultParser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
            return _this;
        }
        /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolate = /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        function (expr, params) {
            /** @type {?} */
            var result;
            if (typeof expr === 'string') {
                result = this.interpolateString(expr, params);
            }
            else if (typeof expr === 'function') {
                result = this.interpolateFunction(expr, params);
            }
            else {
                // this should not happen, but an unrelated TranslateService test depends on it
                result = (/** @type {?} */ (expr));
            }
            return result;
        };
        /**
         * @param {?} target
         * @param {?} key
         * @return {?}
         */
        TranslateDefaultParser.prototype.getValue = /**
         * @param {?} target
         * @param {?} key
         * @return {?}
         */
        function (target, key) {
            /** @type {?} */
            var keys = key.split('.');
            key = '';
            do {
                key += keys.shift();
                if (isDefined(target) && isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                    target = target[key];
                    key = '';
                }
                else if (!keys.length) {
                    target = undefined;
                }
                else {
                    key += '.';
                }
            } while (keys.length);
            return target;
        };
        /**
         * @param {?} fn
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolateFunction = /**
         * @param {?} fn
         * @param {?=} params
         * @return {?}
         */
        function (fn, params) {
            return fn(params);
        };
        /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        TranslateDefaultParser.prototype.interpolateString = /**
         * @param {?} expr
         * @param {?=} params
         * @return {?}
         */
        function (expr, params) {
            var _this = this;
            if (!params) {
                return expr;
            }
            return expr.replace(this.templateMatcher, function (substring, b) {
                /** @type {?} */
                var r = _this.getValue(params, b);
                return isDefined(r) ? r : substring;
            });
        };
        TranslateDefaultParser.decorators = [
            { type: core.Injectable }
        ];
        return TranslateDefaultParser;
    }(TranslateParser));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateStore = /** @class */ (function () {
        function TranslateStore() {
            /**
             * The lang currently used
             */
            this.currentLang = this.defaultLang;
            /**
             * a list of translations per lang
             */
            this.translations = {};
            /**
             * an array of langs
             */
            this.langs = [];
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             */
            this.onTranslationChange = new core.EventEmitter();
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             */
            this.onLangChange = new core.EventEmitter();
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             */
            this.onDefaultLangChange = new core.EventEmitter();
        }
        return TranslateStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var USE_STORE = new core.InjectionToken('USE_STORE');
    /** @type {?} */
    var USE_DEFAULT_LANG = new core.InjectionToken('USE_DEFAULT_LANG');
    var TranslateService = /** @class */ (function () {
        /**
         *
         * @param store an instance of the store (that is supposed to be unique)
         * @param currentLoader An instance of the loader currently used
         * @param compiler An instance of the compiler currently used
         * @param parser An instance of the parser currently used
         * @param missingTranslationHandler A handler for missing translations.
         * @param isolate whether this service should use the store or not
         * @param useDefaultLang whether we should use default language translation when current language translation is missing.
         */
        function TranslateService(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate) {
            if (useDefaultLang === void 0) { useDefaultLang = true; }
            if (isolate === void 0) { isolate = false; }
            this.store = store;
            this.currentLoader = currentLoader;
            this.compiler = compiler;
            this.parser = parser;
            this.missingTranslationHandler = missingTranslationHandler;
            this.useDefaultLang = useDefaultLang;
            this.isolate = isolate;
            this.pending = false;
            this._onTranslationChange = new core.EventEmitter();
            this._onLangChange = new core.EventEmitter();
            this._onDefaultLangChange = new core.EventEmitter();
            this._langs = [];
            this._translations = {};
            this._translationRequests = {};
        }
        Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */
            function () {
                return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onLangChange", {
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */
            function () {
                return this.isolate ? this._onLangChange : this.store.onLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
               *     // do something
               * });
             */
            get: /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             * @return {?}
             */
            function () {
                return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "defaultLang", {
            /**
             * The default lang to fallback when translations are missing on the current lang
             */
            get: /**
             * The default lang to fallback when translations are missing on the current lang
             * @return {?}
             */
            function () {
                return this.isolate ? this._defaultLang : this.store.defaultLang;
            },
            set: /**
             * @param {?} defaultLang
             * @return {?}
             */
            function (defaultLang) {
                if (this.isolate) {
                    this._defaultLang = defaultLang;
                }
                else {
                    this.store.defaultLang = defaultLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "currentLang", {
            /**
             * The lang currently used
             */
            get: /**
             * The lang currently used
             * @return {?}
             */
            function () {
                return this.isolate ? this._currentLang : this.store.currentLang;
            },
            set: /**
             * @param {?} currentLang
             * @return {?}
             */
            function (currentLang) {
                if (this.isolate) {
                    this._currentLang = currentLang;
                }
                else {
                    this.store.currentLang = currentLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "langs", {
            /**
             * an array of langs
             */
            get: /**
             * an array of langs
             * @return {?}
             */
            function () {
                return this.isolate ? this._langs : this.store.langs;
            },
            set: /**
             * @param {?} langs
             * @return {?}
             */
            function (langs) {
                if (this.isolate) {
                    this._langs = langs;
                }
                else {
                    this.store.langs = langs;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "translations", {
            /**
             * a list of translations per lang
             */
            get: /**
             * a list of translations per lang
             * @return {?}
             */
            function () {
                return this.isolate ? this._translations : this.store.translations;
            },
            set: /**
             * @param {?} translations
             * @return {?}
             */
            function (translations) {
                if (this.isolate) {
                    this._translations = translations;
                }
                else {
                    this.store.translations = translations;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the default language to use as a fallback
         */
        /**
         * Sets the default language to use as a fallback
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.setDefaultLang = /**
         * Sets the default language to use as a fallback
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            var _this = this;
            if (lang === this.defaultLang) {
                return;
            }
            /** @type {?} */
            var pending = this.retrieveTranslations(lang);
            if (typeof pending !== "undefined") {
                // on init set the defaultLang immediately
                if (!this.defaultLang) {
                    this.defaultLang = lang;
                }
                pending.pipe(take(1))
                    .subscribe(function (res) {
                    _this.changeDefaultLang(lang);
                });
            }
            else { // we already have this language
                this.changeDefaultLang(lang);
            }
        };
        /**
         * Gets the default language used
         */
        /**
         * Gets the default language used
         * @return {?}
         */
        TranslateService.prototype.getDefaultLang = /**
         * Gets the default language used
         * @return {?}
         */
        function () {
            return this.defaultLang;
        };
        /**
         * Changes the lang currently used
         */
        /**
         * Changes the lang currently used
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.use = /**
         * Changes the lang currently used
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            var _this = this;
            // don't change the language if the language given is already selected
            if (lang === this.currentLang) {
                return of(this.translations[lang]);
            }
            /** @type {?} */
            var pending = this.retrieveTranslations(lang);
            if (typeof pending !== "undefined") {
                // on init set the currentLang immediately
                if (!this.currentLang) {
                    this.currentLang = lang;
                }
                pending.pipe(take(1))
                    .subscribe(function (res) {
                    _this.changeLang(lang);
                });
                return pending;
            }
            else { // we have this language, return an Observable
                this.changeLang(lang);
                return of(this.translations[lang]);
            }
        };
        /**
         * Retrieves the given translations
         */
        /**
         * Retrieves the given translations
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.retrieveTranslations = /**
         * Retrieves the given translations
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            /** @type {?} */
            var pending;
            // if this language is unavailable, ask for it
            if (typeof this.translations[lang] === "undefined") {
                this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
                pending = this._translationRequests[lang];
            }
            return pending;
        };
        /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         */
        /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.getTranslation = /**
         * Gets an object of translations for a given language with the current loader
         * and passes it through the compiler
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            var _this = this;
            this.pending = true;
            /** @type {?} */
            var loadingTranslations = this.currentLoader.getTranslation(lang).pipe(share());
            this.loadingTranslations = loadingTranslations.pipe(take(1), map(function (res) { return _this.compiler.compileTranslations(res, lang); }), share());
            this.loadingTranslations
                .subscribe(function (res) {
                _this.translations[lang] = res;
                _this.updateLangs();
                _this.pending = false;
            }, function (err) {
                _this.pending = false;
            });
            return loadingTranslations;
        };
        /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         */
        /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         * @param {?} lang
         * @param {?} translations
         * @param {?=} shouldMerge
         * @return {?}
         */
        TranslateService.prototype.setTranslation = /**
         * Manually sets an object of translations for a given language
         * after passing it through the compiler
         * @param {?} lang
         * @param {?} translations
         * @param {?=} shouldMerge
         * @return {?}
         */
        function (lang, translations, shouldMerge) {
            if (shouldMerge === void 0) { shouldMerge = false; }
            translations = this.compiler.compileTranslations(translations, lang);
            if (shouldMerge && this.translations[lang]) {
                this.translations[lang] = mergeDeep(this.translations[lang], translations);
            }
            else {
                this.translations[lang] = translations;
            }
            this.updateLangs();
            this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Returns an array of currently available langs
         */
        /**
         * Returns an array of currently available langs
         * @return {?}
         */
        TranslateService.prototype.getLangs = /**
         * Returns an array of currently available langs
         * @return {?}
         */
        function () {
            return this.langs;
        };
        /**
         * Add available langs
         */
        /**
         * Add available langs
         * @param {?} langs
         * @return {?}
         */
        TranslateService.prototype.addLangs = /**
         * Add available langs
         * @param {?} langs
         * @return {?}
         */
        function (langs) {
            var _this = this;
            langs.forEach(function (lang) {
                if (_this.langs.indexOf(lang) === -1) {
                    _this.langs.push(lang);
                }
            });
        };
        /**
         * Update the list of available langs
         */
        /**
         * Update the list of available langs
         * @return {?}
         */
        TranslateService.prototype.updateLangs = /**
         * Update the list of available langs
         * @return {?}
         */
        function () {
            this.addLangs(Object.keys(this.translations));
        };
        /**
         * Returns the parsed result of the translations
         */
        /**
         * Returns the parsed result of the translations
         * @param {?} translations
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        TranslateService.prototype.getParsedResult = /**
         * Returns the parsed result of the translations
         * @param {?} translations
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        function (translations, key, interpolateParams) {
            var e_1, _a, e_2, _b;
            /** @type {?} */
            var res;
            if (key instanceof Array) {
                /** @type {?} */
                var result = {};
                /** @type {?} */
                var observables = false;
                try {
                    for (var key_1 = __values(key), key_1_1 = key_1.next(); !key_1_1.done; key_1_1 = key_1.next()) {
                        var k = key_1_1.value;
                        result[k] = this.getParsedResult(translations, k, interpolateParams);
                        if (typeof result[k].subscribe === "function") {
                            observables = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (key_1_1 && !key_1_1.done && (_a = key_1.return)) _a.call(key_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (observables) {
                    /** @type {?} */
                    var mergedObs = void 0;
                    try {
                        for (var key_2 = __values(key), key_2_1 = key_2.next(); !key_2_1.done; key_2_1 = key_2.next()) {
                            var k = key_2_1.value;
                            /** @type {?} */
                            var obs = typeof result[k].subscribe === "function" ? result[k] : of((/** @type {?} */ (result[k])));
                            if (typeof mergedObs === "undefined") {
                                mergedObs = obs;
                            }
                            else {
                                mergedObs = merge(mergedObs, obs);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (key_2_1 && !key_2_1.done && (_b = key_2.return)) _b.call(key_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return mergedObs.pipe(toArray(), map(function (arr) {
                        /** @type {?} */
                        var obj = {};
                        arr.forEach(function (value, index) {
                            obj[key[index]] = value;
                        });
                        return obj;
                    }));
                }
                return result;
            }
            if (translations) {
                res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
            }
            if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang && this.useDefaultLang) {
                res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
            }
            if (typeof res === "undefined") {
                /** @type {?} */
                var params = { key: key, translateService: this };
                if (typeof interpolateParams !== 'undefined') {
                    params.interpolateParams = interpolateParams;
                }
                res = this.missingTranslationHandler.handle(params);
            }
            return typeof res !== "undefined" ? res : key;
        };
        /**
         * Gets the translated value of a key (or an array of keys)
         * @returns the translated key, or an object of translated keys
         */
        /**
         * Gets the translated value of a key (or an array of keys)
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} the translated key, or an object of translated keys
         */
        TranslateService.prototype.get = /**
         * Gets the translated value of a key (or an array of keys)
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} the translated key, or an object of translated keys
         */
        function (key, interpolateParams) {
            var _this = this;
            if (!isDefined(key) || !key.length) {
                throw new Error("Parameter \"key\" required");
            }
            // check if we are loading a new translation to use
            if (this.pending) {
                return Observable.create(function (observer) {
                    /** @type {?} */
                    var onComplete = function (res) {
                        observer.next(res);
                        observer.complete();
                    };
                    /** @type {?} */
                    var onError = function (err) {
                        observer.error(err);
                    };
                    _this.loadingTranslations.subscribe(function (res) {
                        res = _this.getParsedResult(res, key, interpolateParams);
                        if (typeof res.subscribe === "function") {
                            res.subscribe(onComplete, onError);
                        }
                        else {
                            onComplete(res);
                        }
                    }, onError);
                });
            }
            else {
                /** @type {?} */
                var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
                if (typeof res.subscribe === "function") {
                    return res;
                }
                else {
                    return of(res);
                }
            }
        };
        /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @returns A stream of the translated key, or an object of translated keys
         */
        /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} A stream of the translated key, or an object of translated keys
         */
        TranslateService.prototype.stream = /**
         * Returns a stream of translated values of a key (or an array of keys) which updates
         * whenever the language changes.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?} A stream of the translated key, or an object of translated keys
         */
        function (key, interpolateParams) {
            var _this = this;
            if (!isDefined(key) || !key.length) {
                throw new Error("Parameter \"key\" required");
            }
            return concat(this.get(key, interpolateParams), this.onLangChange.pipe(switchMap(function (event) {
                /** @type {?} */
                var res = _this.getParsedResult(event.translations, key, interpolateParams);
                if (typeof res.subscribe === "function") {
                    return res;
                }
                else {
                    return of(res);
                }
            })));
        };
        /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         */
        /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        TranslateService.prototype.instant = /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         * @param {?} key
         * @param {?=} interpolateParams
         * @return {?}
         */
        function (key, interpolateParams) {
            if (!isDefined(key) || !key.length) {
                throw new Error("Parameter \"key\" required");
            }
            /** @type {?} */
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe !== "undefined") {
                if (key instanceof Array) {
                    /** @type {?} */
                    var obj_1 = {};
                    key.forEach(function (value, index) {
                        obj_1[key[index]] = key[index];
                    });
                    return obj_1;
                }
                return key;
            }
            else {
                return res;
            }
        };
        /**
         * Sets the translated value of a key, after compiling it
         */
        /**
         * Sets the translated value of a key, after compiling it
         * @param {?} key
         * @param {?} value
         * @param {?=} lang
         * @return {?}
         */
        TranslateService.prototype.set = /**
         * Sets the translated value of a key, after compiling it
         * @param {?} key
         * @param {?} value
         * @param {?=} lang
         * @return {?}
         */
        function (key, value, lang) {
            if (lang === void 0) { lang = this.currentLang; }
            this.translations[lang][key] = this.compiler.compile(value, lang);
            this.updateLangs();
            this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Changes the current lang
         */
        /**
         * Changes the current lang
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.changeLang = /**
         * Changes the current lang
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            this.currentLang = lang;
            this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
            // if there is no default lang, use the one that we just set
            if (!this.defaultLang) {
                this.changeDefaultLang(lang);
            }
        };
        /**
         * Changes the default lang
         */
        /**
         * Changes the default lang
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.changeDefaultLang = /**
         * Changes the default lang
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            this.defaultLang = lang;
            this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Allows to reload the lang file from the file
         */
        /**
         * Allows to reload the lang file from the file
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.reloadLang = /**
         * Allows to reload the lang file from the file
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            this.resetLang(lang);
            return this.getTranslation(lang);
        };
        /**
         * Deletes inner translation
         */
        /**
         * Deletes inner translation
         * @param {?} lang
         * @return {?}
         */
        TranslateService.prototype.resetLang = /**
         * Deletes inner translation
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            this._translationRequests[lang] = undefined;
            this.translations[lang] = undefined;
        };
        /**
         * Returns the language code name from the browser, e.g. "de"
         */
        /**
         * Returns the language code name from the browser, e.g. "de"
         * @return {?}
         */
        TranslateService.prototype.getBrowserLang = /**
         * Returns the language code name from the browser, e.g. "de"
         * @return {?}
         */
        function () {
            if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                return undefined;
            }
            /** @type {?} */
            var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
            browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
            if (browserLang.indexOf('-') !== -1) {
                browserLang = browserLang.split('-')[0];
            }
            if (browserLang.indexOf('_') !== -1) {
                browserLang = browserLang.split('_')[0];
            }
            return browserLang;
        };
        /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         */
        /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         * @return {?}
         */
        TranslateService.prototype.getBrowserCultureLang = /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         * @return {?}
         */
        function () {
            if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                return undefined;
            }
            /** @type {?} */
            var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
            browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
            return browserCultureLang;
        };
        TranslateService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TranslateService.ctorParameters = function () { return [
            { type: TranslateStore },
            { type: TranslateLoader },
            { type: TranslateCompiler },
            { type: TranslateParser },
            { type: MissingTranslationHandler },
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_DEFAULT_LANG,] }] },
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_STORE,] }] }
        ]; };
        return TranslateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateDirective = /** @class */ (function () {
        function TranslateDirective(translateService, element, _ref) {
            var _this = this;
            this.translateService = translateService;
            this.element = element;
            this._ref = _ref;
            // subscribe to onTranslationChange event, in case the translations of the current lang change
            if (!this.onTranslationChangeSub) {
                this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                    if (event.lang === _this.translateService.currentLang) {
                        _this.checkNodes(true, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChangeSub) {
                this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                    _this.checkNodes(true, event.translations);
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChangeSub) {
                this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                    _this.checkNodes(true);
                });
            }
        }
        Object.defineProperty(TranslateDirective.prototype, "translate", {
            set: /**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (key) {
                    this.key = key;
                    this.checkNodes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateDirective.prototype, "translateParams", {
            set: /**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                if (!equals(this.currentParams, params)) {
                    this.currentParams = params;
                    this.checkNodes(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TranslateDirective.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            this.checkNodes();
        };
        /**
         * @param {?=} forceUpdate
         * @param {?=} translations
         * @return {?}
         */
        TranslateDirective.prototype.checkNodes = /**
         * @param {?=} forceUpdate
         * @param {?=} translations
         * @return {?}
         */
        function (forceUpdate, translations) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            /** @type {?} */
            var nodes = this.element.nativeElement.childNodes;
            // if the element is empty
            if (!nodes.length) {
                // we add the key as content
                this.setContent(this.element.nativeElement, this.key);
                nodes = this.element.nativeElement.childNodes;
            }
            for (var i = 0; i < nodes.length; ++i) {
                /** @type {?} */
                var node = nodes[i];
                if (node.nodeType === 3) { // node type 3 is a text node
                    // node type 3 is a text node
                    /** @type {?} */
                    var key = void 0;
                    if (this.key) {
                        key = this.key;
                        if (forceUpdate) {
                            node.lastKey = null;
                        }
                    }
                    else {
                        /** @type {?} */
                        var content = this.getContent(node);
                        /** @type {?} */
                        var trimmedContent = content.trim();
                        if (trimmedContent.length) {
                            // we want to use the content as a key, not the translation value
                            if (content !== node.currentValue) {
                                key = trimmedContent;
                                // the content was changed from the user, we'll use it as a reference if needed
                                node.originalContent = this.getContent(node);
                            }
                            else if (node.originalContent && forceUpdate) { // the content seems ok, but the lang has changed
                                node.lastKey = null;
                                // the current content is the translation, not the key, use the last real content as key
                                key = node.originalContent.trim();
                            }
                        }
                    }
                    this.updateValue(key, node, translations);
                }
            }
        };
        /**
         * @param {?} key
         * @param {?} node
         * @param {?} translations
         * @return {?}
         */
        TranslateDirective.prototype.updateValue = /**
         * @param {?} key
         * @param {?} node
         * @param {?} translations
         * @return {?}
         */
        function (key, node, translations) {
            var _this = this;
            if (key) {
                if (node.lastKey === key && this.lastParams === this.currentParams) {
                    return;
                }
                this.lastParams = this.currentParams;
                /** @type {?} */
                var onTranslation = function (res) {
                    if (res !== key) {
                        node.lastKey = key;
                    }
                    if (!node.originalContent) {
                        node.originalContent = _this.getContent(node);
                    }
                    node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                    // we replace in the original content to preserve spaces that we might have trimmed
                    _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                    _this._ref.markForCheck();
                };
                if (isDefined(translations)) {
                    /** @type {?} */
                    var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                    if (typeof res.subscribe === "function") {
                        res.subscribe(onTranslation);
                    }
                    else {
                        onTranslation(res);
                    }
                }
                else {
                    this.translateService.get(key, this.currentParams).subscribe(onTranslation);
                }
            }
        };
        /**
         * @param {?} node
         * @return {?}
         */
        TranslateDirective.prototype.getContent = /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return isDefined(node.textContent) ? node.textContent : node.data;
        };
        /**
         * @param {?} node
         * @param {?} content
         * @return {?}
         */
        TranslateDirective.prototype.setContent = /**
         * @param {?} node
         * @param {?} content
         * @return {?}
         */
        function (node, content) {
            if (isDefined(node.textContent)) {
                node.textContent = content;
            }
            else {
                node.data = content;
            }
        };
        /**
         * @return {?}
         */
        TranslateDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.onLangChangeSub) {
                this.onLangChangeSub.unsubscribe();
            }
            if (this.onDefaultLangChangeSub) {
                this.onDefaultLangChangeSub.unsubscribe();
            }
            if (this.onTranslationChangeSub) {
                this.onTranslationChangeSub.unsubscribe();
            }
        };
        TranslateDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[translate],[ngx-translate]'
                    },] }
        ];
        /** @nocollapse */
        TranslateDirective.ctorParameters = function () { return [
            { type: TranslateService },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        TranslateDirective.propDecorators = {
            translate: [{ type: core.Input }],
            translateParams: [{ type: core.Input }]
        };
        return TranslateDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslatePipe = /** @class */ (function () {
        function TranslatePipe(translate, _ref) {
            this.translate = translate;
            this._ref = _ref;
            this.value = '';
        }
        /**
         * @param {?} key
         * @param {?=} interpolateParams
         * @param {?=} translations
         * @return {?}
         */
        TranslatePipe.prototype.updateValue = /**
         * @param {?} key
         * @param {?=} interpolateParams
         * @param {?=} translations
         * @return {?}
         */
        function (key, interpolateParams, translations) {
            var _this = this;
            /** @type {?} */
            var onTranslation = function (res) {
                _this.value = res !== undefined ? res : key;
                _this.lastKey = key;
                _this._ref.markForCheck();
            };
            if (translations) {
                /** @type {?} */
                var res = this.translate.getParsedResult(translations, key, interpolateParams);
                if (typeof res.subscribe === 'function') {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            this.translate.get(key, interpolateParams).subscribe(onTranslation);
        };
        /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
        TranslatePipe.prototype.transform = /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
        function (query) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!query || query.length === 0) {
                return query;
            }
            // if we ask another time for the same key, return the last value
            if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
                return this.value;
            }
            /** @type {?} */
            var interpolateParams;
            if (isDefined(args[0]) && args.length) {
                if (typeof args[0] === 'string' && args[0].length) {
                    // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                    // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                    /** @type {?} */
                    var validArgs = args[0]
                        .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                        .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                    try {
                        interpolateParams = JSON.parse(validArgs);
                    }
                    catch (e) {
                        throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                    }
                }
                else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                    interpolateParams = args[0];
                }
            }
            // store the query, in case it changes
            this.lastKey = query;
            // store the params, in case they change
            this.lastParams = args;
            // set the value
            this.updateValue(query, interpolateParams);
            // if there is a subscription to onLangChange, clean it
            this._dispose();
            // subscribe to onTranslationChange event, in case the translations change
            if (!this.onTranslationChange) {
                this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                    if (_this.lastKey && event.lang === _this.translate.currentLang) {
                        _this.lastKey = null;
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChange) {
                this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChange) {
                this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams);
                    }
                });
            }
            return this.value;
        };
        /**
         * Clean any existing subscription to change events
         */
        /**
         * Clean any existing subscription to change events
         * @return {?}
         */
        TranslatePipe.prototype._dispose = /**
         * Clean any existing subscription to change events
         * @return {?}
         */
        function () {
            if (typeof this.onTranslationChange !== 'undefined') {
                this.onTranslationChange.unsubscribe();
                this.onTranslationChange = undefined;
            }
            if (typeof this.onLangChange !== 'undefined') {
                this.onLangChange.unsubscribe();
                this.onLangChange = undefined;
            }
            if (typeof this.onDefaultLangChange !== 'undefined') {
                this.onDefaultLangChange.unsubscribe();
                this.onDefaultLangChange = undefined;
            }
        };
        /**
         * @return {?}
         */
        TranslatePipe.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._dispose();
        };
        TranslatePipe.decorators = [
            { type: core.Injectable },
            { type: core.Pipe, args: [{
                        name: 'translate',
                        pure: false // required to update the value when the promise is resolved
                    },] }
        ];
        /** @nocollapse */
        TranslatePipe.ctorParameters = function () { return [
            { type: TranslateService },
            { type: core.ChangeDetectorRef }
        ]; };
        return TranslatePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TranslateModule = /** @class */ (function () {
        function TranslateModule() {
        }
        /**
         * Use this method in your root module to provide the TranslateService
         */
        /**
         * Use this method in your root module to provide the TranslateService
         * @param {?=} config
         * @return {?}
         */
        TranslateModule.forRoot = /**
         * Use this method in your root module to provide the TranslateService
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: TranslateModule,
                providers: [
                    config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                    config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                    config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                    config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                    TranslateStore,
                    { provide: USE_STORE, useValue: config.isolate },
                    { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                    TranslateService
                ]
            };
        };
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         */
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         * @param {?=} config
         * @return {?}
         */
        TranslateModule.forChild = /**
         * Use this method in your other (non root) modules to import the directive/pipe
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: TranslateModule,
                providers: [
                    config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                    config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                    config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                    config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                    { provide: USE_STORE, useValue: config.isolate },
                    { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                    TranslateService
                ]
            };
        };
        TranslateModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            TranslatePipe,
                            TranslateDirective
                        ],
                        exports: [
                            TranslatePipe,
                            TranslateDirective
                        ]
                    },] }
        ];
        return TranslateModule;
    }());

    let PluginComponent = class PluginComponent {
        constructor(translate) {
            this.translate = translate;
            this.installing = false;
            let userLang = 'en';
            translate.setDefaultLang(userLang);
            userLang = translate.getBrowserLang().split('-')[0];
            translate.use(userLang);
        }
        ngOnInit() {
        }
        ngOnDestroy() {
        }
    };
    PluginComponent = __decorate([
        core.Component({
            selector: "plugin",
            template: `<div id="editor-container" class="plugin-container"><div id="pluginHeader" class="header-content"><div class="content pepperi-border-bottom"><div class="left-container spacing-element-negative pull-left flip"><div class="spacing-element title">{{ 'Plugin_Title' | translate }}</div></div></div></div><div id="pluginBody" class="main-content" *ngIf="installing == false"><mat-tab-group><mat-tab label="Test API"><app-api-tester></app-api-tester></mat-tab><mat-tab label="Pepperi Lists"><div>A list example (todo)</div></mat-tab></mat-tab-group></div></div>`,
            styles: [`#editor-container body{font-family:Inter}#editor-container h1,#editor-container h2,#editor-container h3,#editor-container h4,#editor-container h5,#editor-container h6{font-family:Inter}`],
            providers: [],
            encapsulation: core.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], PluginComponent);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var TranslateHttpLoader = /** @class */ (function () {
        function TranslateHttpLoader(http, prefix, suffix) {
            if (prefix === void 0) { prefix = "/assets/i18n/"; }
            if (suffix === void 0) { suffix = ".json"; }
            this.http = http;
            this.prefix = prefix;
            this.suffix = suffix;
        }
        /**
         * Gets the translations from the server
         */
        /**
         * Gets the translations from the server
         * @param {?} lang
         * @return {?}
         */
        TranslateHttpLoader.prototype.getTranslation = /**
         * Gets the translations from the server
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            return this.http.get("" + this.prefix + lang + this.suffix);
        };
        return TranslateHttpLoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENT_INJECTOR = new core.InjectionToken('ComponentInjector');
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ComponentOutletInjectorDirective = /** @class */ (function () {
        /**
         * @param {?} componentOutlet
         */
        function ComponentOutletInjectorDirective(componentOutlet) {
            this.componentOutlet = componentOutlet;
        }
        Object.defineProperty(ComponentOutletInjectorDirective.prototype, "componentRef", {
            /**
             * @return {?}
             */
            get: function () {
                return (( /** @type {?} */(this.componentOutlet)))._componentRef;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentOutletInjectorDirective;
    }());
    ComponentOutletInjectorDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ngComponentOutlet]',
                    exportAs: 'ndcComponentOutletInjector',
                },] },
    ];
    /** @nocollapse */
    ComponentOutletInjectorDirective.ctorParameters = function () { return [
        { type: common.NgComponentOutlet, decorators: [{ type: core.Host }] }
    ]; };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicAttributesDirective = /** @class */ (function () {
        /**
         * @param {?} renderer
         * @param {?} differs
         * @param {?} injector
         * @param {?} componentInjectorType
         * @param {?} componentOutletInjector
         */
        function DynamicAttributesDirective(renderer, differs, injector, componentInjectorType, componentOutletInjector) {
            this.renderer = renderer;
            this.differs = differs;
            this.injector = injector;
            this.componentInjectorType = componentInjectorType;
            this.componentOutletInjector = componentOutletInjector;
            this._attrsDiffer = this.differs.find({}).create();
            this._componentInjector = this.injector.get(this.componentInjectorType, null);
        }
        Object.defineProperty(DynamicAttributesDirective.prototype, "_attributes", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return (this.ndcDynamicAttributes || this.ngComponentOutletNdcDynamicAttributes);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicAttributesDirective.prototype, "_compInjector", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.componentOutletInjector || this._componentInjector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicAttributesDirective.prototype, "_nativeElement", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return (this._compInjector.componentRef &&
                    this._compInjector.componentRef.location.nativeElement);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicAttributesDirective.prototype, "_compType", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return (this._compInjector.componentRef &&
                    this._compInjector.componentRef.componentType);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicAttributesDirective.prototype, "_isCompChanged", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                if (this._lastCompType !== this._compType) {
                    this._lastCompType = this._compType;
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DynamicAttributesDirective.prototype.ngDoCheck = function () {
            /** @type {?} */
            var isCompChanged = this._isCompChanged;
            /** @type {?} */
            var changes = this._attrsDiffer.diff(this._attributes);
            if (changes) {
                this._lastAttrActions = this._changesToAttrActions(changes);
            }
            if (changes || (isCompChanged && this._lastAttrActions)) {
                this._updateAttributes(this._lastAttrActions);
            }
        };
        /**
         * @param {?} name
         * @param {?} value
         * @param {?=} namespace
         * @return {?}
         */
        DynamicAttributesDirective.prototype.setAttribute = function (name, value, namespace) {
            if (this._nativeElement) {
                this.renderer.setAttribute(this._nativeElement, name, value, namespace);
            }
        };
        /**
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */
        DynamicAttributesDirective.prototype.removeAttribute = function (name, namespace) {
            if (this._nativeElement) {
                this.renderer.removeAttribute(this._nativeElement, name, namespace);
            }
        };
        /**
         * @private
         * @param {?} actions
         * @return {?}
         */
        DynamicAttributesDirective.prototype._updateAttributes = function (actions) {
            var _this = this;
            // ? Early exit if no dynamic component
            if (!this._compType) {
                return;
            }
            Object.keys(actions.set).forEach(( /**
             * @param {?} key
             * @return {?}
             */function (/**
             * @param {?} key
             * @return {?}
             */ key) { return _this.setAttribute(key, actions.set[key]); }));
            actions.remove.forEach(( /**
             * @param {?} key
             * @return {?}
             */function (/**
             * @param {?} key
             * @return {?}
             */ key) { return _this.removeAttribute(key); }));
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        DynamicAttributesDirective.prototype._changesToAttrActions = function (changes) {
            /** @type {?} */
            var attrActions = {
                set: {},
                remove: [],
            };
            changes.forEachAddedItem(( /**
             * @param {?} r
             * @return {?}
             */function (/**
             * @param {?} r
             * @return {?}
             */ r) { return (attrActions.set[r.key] = r.currentValue); }));
            changes.forEachChangedItem(( /**
             * @param {?} r
             * @return {?}
             */function (/**
             * @param {?} r
             * @return {?}
             */ r) { return (attrActions.set[r.key] = r.currentValue); }));
            changes.forEachRemovedItem(( /**
             * @param {?} r
             * @return {?}
             */function (/**
             * @param {?} r
             * @return {?}
             */ r) { return attrActions.remove.push(r.key); }));
            return attrActions;
        };
        return DynamicAttributesDirective;
    }());
    DynamicAttributesDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ndcDynamicAttributes],[ngComponentOutletNdcDynamicAttributes]',
                    exportAs: 'ndcDynamicAttributes',
                },] },
    ];
    /** @nocollapse */
    DynamicAttributesDirective.ctorParameters = function () { return [
        { type: core.Renderer2 },
        { type: core.KeyValueDiffers },
        { type: core.Injector },
        { type: undefined, decorators: [{ type: core.Inject, args: [COMPONENT_INJECTOR,] }] },
        { type: ComponentOutletInjectorDirective, decorators: [{ type: core.Optional }, { type: core.Host }] }
    ]; };
    DynamicAttributesDirective.propDecorators = {
        ndcDynamicAttributes: [{ type: core.Input }],
        ngComponentOutletNdcDynamicAttributes: [{ type: core.Input }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} val
     * @return {?}
     */
    function createNewChange(val) {
        return new core.SimpleChange(undefined, val, true);
    }
    /**
     * @param {?} record
     * @param {?=} isFirstChange
     * @return {?}
     */
    function recordToChange(record, isFirstChange) {
        if (isFirstChange === void 0) { isFirstChange = false; }
        return isFirstChange
            ? createNewChange(record.currentValue)
            : new core.SimpleChange(record.previousValue, record.currentValue, false);
    }
    /**
     * @param {?} isFirstChanges
     * @param {?} setter
     * @return {?}
     */
    function setChangeFromRecord(isFirstChanges, setter) {
        return ( /**
         * @param {?} record
         * @return {?}
         */function (record) { return setter(record, recordToChange(record, isFirstChanges)); });
    }
    /**
     * @param {?} isFirstChanges
     * @return {?}
     */
    function getChangesRecords(isFirstChanges) {
        return ( /**
         * @param {?} changes
         * @return {?}
         */function (changes) { return setChangeFromRecord(isFirstChanges, ( /**
         * @param {?} record
         * @param {?} change
         * @return {?}
         */function (record, change) { return (changes[record.key] = change); })); });
    }
    /**
     * @param {?} isFirstChanges
     * @return {?}
     */
    function getNewChangesRecords(isFirstChanges) {
        return ( /**
         * @param {?} changes
         * @return {?}
         */function (changes) { return setChangeFromRecord(isFirstChanges, ( /**
         * @param {?} record
         * @param {?} change
         * @return {?}
         */function (record, change) {
            if (!changes[record.key]) {
                changes[record.key] = change;
            }
        })); });
    }
    /** @type {?} */
    var defaultOpts = {
        isFirstChanges: false,
        onlyNewChanges: false,
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    function changesFromRecord(opts) {
        if (opts === void 0) { opts = defaultOpts; }
        return opts.onlyNewChanges
            ? getNewChangesRecords(opts.isFirstChanges)
            : getChangesRecords(opts.isFirstChanges);
    }
    /**
     * @return {?}
     */
    function noop() { }
    /**
     * @param {?} ctor
     * @param {?} reflect
     * @return {?}
     */
    function getCtorType(ctor, reflect) {
        return reflect.getMetadata('design:paramtypes', ctor);
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var recordToChanges = changesFromRecord({ isFirstChanges: true });
    /** @type {?} */
    var recordToNewChanges = changesFromRecord({ onlyNewChanges: true });
    var IoService = /** @class */ (function () {
        /**
         * @param {?} _differs
         * @param {?} _cfr
         */
        function IoService(_differs, _cfr) {
            this._differs = _differs;
            this._cfr = _cfr;
            this.checkInit = this.failInit;
            this._lastComponentInst = null;
            this._inputsDiffer = this._differs.find({}).create();
            this._compFactory = null;
            this._outputsShouldDisconnect$ = new Subject();
            this._outputsChanged = ( /**
             * @return {?}
             */function () { return false; });
        }
        Object.defineProperty(IoService.prototype, "_compRef", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this._compInjector.componentRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoService.prototype, "_componentInst", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this._compRef ? this._compRef.instance : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoService.prototype, "_componentInstChanged", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                if (this._lastComponentInst !== this._componentInst) {
                    this._lastComponentInst = this._componentInst;
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoService.prototype, "_compCdr", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this._compRef ? this._compRef.injector.get(core.ChangeDetectorRef) : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        IoService.prototype.ngOnDestroy = function () {
            this._disconnectOutputs();
        };
        /**
         * @param {?} componentInjector
         * @param {?=} options
         * @return {?}
         */
        IoService.prototype.init = function (componentInjector, options) {
            if (options === void 0) { options = {}; }
            this.checkInit = componentInjector ? noop : this.failInit;
            this._compInjector = componentInjector;
            if (options.trackOutputChanges) {
                /** @type {?} */
                var outputsDiffer_1 = this._differs.find({}).create();
                this._outputsChanged = ( /**
                 * @param {?} outputs
                 * @return {?}
                 */function (/**
                 * @param {?} outputs
                 * @return {?}
                 */ outputs) { return !!outputsDiffer_1.diff(outputs); });
            }
        };
        /**
         * @param {?} inputs
         * @param {?} outputs
         * @param {?} inputsChanged
         * @param {?} outputsChanged
         * @return {?}
         */
        IoService.prototype.update = function (inputs, outputs, inputsChanged, outputsChanged) {
            this.checkInit();
            this.updateIO(inputs, outputs);
            /** @type {?} */
            var compChanged = this._componentInstChanged;
            if (compChanged || inputsChanged) {
                /** @type {?} */
                var inputsChanges = this._getInputsChanges(this._inputs);
                if (inputsChanges) {
                    this._updateInputChanges(inputsChanges);
                }
                this.updateInputs(compChanged || !this._lastInputChanges);
            }
            if (compChanged || outputsChanged) {
                this.bindOutputs();
            }
        };
        /**
         * @return {?}
         */
        IoService.prototype.maybeUpdate = function () {
            this.checkInit();
            if (this._componentInstChanged) {
                this.updateInputs(true);
                this.bindOutputs();
                return;
            }
            if (this._outputsChanged(this._outputs)) {
                this.bindOutputs();
            }
            if (!this._inputs) {
                return;
            }
            /** @type {?} */
            var inputsChanges = this._getInputsChanges(this._inputs);
            if (inputsChanges) {
                /** @type {?} */
                var isNotFirstChange = !!this._lastInputChanges;
                this._updateInputChanges(inputsChanges);
                if (isNotFirstChange) {
                    this.updateInputs();
                }
            }
        };
        /**
         * @private
         * @param {?} inputs
         * @param {?} outputs
         * @return {?}
         */
        IoService.prototype.updateIO = function (inputs, outputs) {
            this._inputs = inputs;
            this._outputs = outputs;
        };
        /**
         * @private
         * @param {?=} isFirstChange
         * @return {?}
         */
        IoService.prototype.updateInputs = function (isFirstChange) {
            if (isFirstChange === void 0) { isFirstChange = false; }
            if (isFirstChange) {
                this._updateCompFactory();
            }
            /** @type {?} */
            var compInst = this._componentInst;
            /** @type {?} */
            var inputs = this._inputs;
            if (!inputs || !compInst) {
                return;
            }
            inputs = this._resolveInputs(inputs);
            Object.keys(inputs).forEach(( /**
             * @param {?} p
             * @return {?}
             */function (/**
             * @param {?} p
             * @return {?}
             */ p) { return (compInst[p] = inputs[p]); }));
            // Mark component for check to re-render with new inputs
            if (this._compCdr) {
                this._compCdr.markForCheck();
            }
            this.notifyOnInputChanges(this._lastInputChanges, isFirstChange);
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype.bindOutputs = function () {
            var _this = this;
            this._disconnectOutputs();
            /** @type {?} */
            var compInst = this._componentInst;
            /** @type {?} */
            var outputs = this._outputs;
            if (!outputs || !compInst) {
                return;
            }
            outputs = this._resolveOutputs(outputs);
            Object.keys(outputs)
                .filter(( /**
         * @param {?} p
         * @return {?}
         */function (/**
         * @param {?} p
         * @return {?}
         */ p) { return compInst[p]; }))
                .forEach(( /**
         * @param {?} p
         * @return {?}
         */function (/**
         * @param {?} p
         * @return {?}
         */ p) { return compInst[p]
                .pipe(takeUntil(_this._outputsShouldDisconnect$))
                .subscribe(outputs[p]); }));
        };
        /**
         * @private
         * @param {?=} changes
         * @param {?=} forceFirstChanges
         * @return {?}
         */
        IoService.prototype.notifyOnInputChanges = function (changes, forceFirstChanges) {
            if (changes === void 0) { changes = {}; }
            // Exit early if component not interested to receive changes
            if (!this._componentInst.ngOnChanges) {
                return;
            }
            if (forceFirstChanges) {
                changes = this._collectFirstChanges();
            }
            this._componentInst.ngOnChanges(changes);
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype._disconnectOutputs = function () {
            this._outputsShouldDisconnect$.next();
        };
        /**
         * @private
         * @param {?} inputs
         * @return {?}
         */
        IoService.prototype._getInputsChanges = function (inputs) {
            return this._inputsDiffer.diff(this._inputs);
        };
        /**
         * @private
         * @param {?} differ
         * @return {?}
         */
        IoService.prototype._updateInputChanges = function (differ) {
            this._lastInputChanges = this._collectChangesFromDiffer(differ);
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype._collectFirstChanges = function () {
            /** @type {?} */
            var changes = ( /** @type {?} */({}));
            /** @type {?} */
            var inputs = this._inputs;
            Object.keys(inputs).forEach(( /**
             * @param {?} prop
             * @return {?}
             */function (/**
             * @param {?} prop
             * @return {?}
             */ prop) { return (changes[prop] = createNewChange(inputs[prop])); }));
            return this._resolveChanges(changes);
        };
        /**
         * @private
         * @param {?} differ
         * @return {?}
         */
        IoService.prototype._collectChangesFromDiffer = function (differ) {
            /** @type {?} */
            var changes = ( /** @type {?} */({}));
            differ.forEachAddedItem(recordToChanges(changes));
            differ.forEachItem(recordToNewChanges(changes));
            return this._resolveChanges(changes);
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype._resolveCompFactory = function () {
            try {
                try {
                    return this._cfr.resolveComponentFactory(this._compRef.componentType);
                }
                catch (e) {
                    // Fallback if componentType does not exist (happens on NgComponentOutlet)
                    return this._cfr.resolveComponentFactory(this._compRef.instance.constructor);
                }
            }
            catch (e) {
                // Factory not available - bailout
                return null;
            }
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype._updateCompFactory = function () {
            this._compFactory = this._resolveCompFactory();
        };
        /**
         * @private
         * @param {?} inputs
         * @return {?}
         */
        IoService.prototype._resolveInputs = function (inputs) {
            if (!this._compFactory) {
                return inputs;
            }
            return this._remapIO(inputs, this._compFactory.inputs);
        };
        /**
         * @private
         * @param {?} outputs
         * @return {?}
         */
        IoService.prototype._resolveOutputs = function (outputs) {
            if (!this._compFactory) {
                return outputs;
            }
            return this._remapIO(outputs, this._compFactory.outputs);
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        IoService.prototype._resolveChanges = function (changes) {
            if (!this._compFactory) {
                return changes;
            }
            return this._remapIO(changes, this._compFactory.inputs);
        };
        /**
         * @private
         * @param {?} io
         * @param {?} mapping
         * @return {?}
         */
        IoService.prototype._remapIO = function (io, mapping) {
            var _this = this;
            /** @type {?} */
            var newIO = {};
            Object.keys(io).forEach(( /**
             * @param {?} key
             * @return {?}
             */function (/**
             * @param {?} key
             * @return {?}
             */ key) {
                /** @type {?} */
                var newKey = _this._findPropByTplInMapping(key, mapping) || key;
                newIO[newKey] = io[key];
            }));
            return newIO;
        };
        /**
         * @private
         * @param {?} tplName
         * @param {?} mapping
         * @return {?}
         */
        IoService.prototype._findPropByTplInMapping = function (tplName, mapping) {
            for (var _i = 0, mapping_1 = mapping; _i < mapping_1.length; _i++) {
                var map = mapping_1[_i];
                if (map.templateName === tplName) {
                    return map.propName;
                }
            }
            return null;
        };
        /**
         * @private
         * @return {?}
         */
        IoService.prototype.failInit = function () {
            throw Error('IoService: ComponentInjector was not set! Please call init() method!');
        };
        return IoService;
    }());
    IoService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    IoService.ctorParameters = function () { return [
        { type: core.KeyValueDiffers },
        { type: core.ComponentFactoryResolver }
    ]; };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IoFactoryService = /** @class */ (function () {
        /**
         * @param {?} differs
         * @param {?} cfr
         */
        function IoFactoryService(differs, cfr) {
            this.differs = differs;
            this.cfr = cfr;
        }
        /**
         * @return {?}
         */
        IoFactoryService.prototype.create = function () {
            return new IoService(this.differs, this.cfr);
        };
        return IoFactoryService;
    }());
    IoFactoryService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    IoFactoryService.ctorParameters = function () { return [
        { type: core.KeyValueDiffers },
        { type: core.ComponentFactoryResolver }
    ]; };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var WINDOW_REF = new core.InjectionToken('WindowRef');
    var WindowRefService = /** @class */ (function () {
        /**
         * @param {?} injector
         */
        function WindowRefService(injector) {
            this.injector = injector;
            this.nativeWindow = this.injector.get(WINDOW_REF, null);
        }
        return WindowRefService;
    }());
    WindowRefService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    WindowRefService.ctorParameters = function () { return [
        { type: core.Injector }
    ]; };
    var DynamicDirectivesDirective = /** @class */ (function () {
        /**
         * @param {?} injector
         * @param {?} iterableDiffers
         * @param {?} ioFactoryService
         * @param {?} windowRef
         * @param {?} componentInjectorType
         * @param {?} componentOutletInjector
         */
        function DynamicDirectivesDirective(injector, iterableDiffers, ioFactoryService, windowRef, componentInjectorType, componentOutletInjector) {
            this.injector = injector;
            this.iterableDiffers = iterableDiffers;
            this.ioFactoryService = ioFactoryService;
            this.windowRef = windowRef;
            this.componentInjectorType = componentInjectorType;
            this.componentOutletInjector = componentOutletInjector;
            this.ndcDynamicDirectivesCreated = new core.EventEmitter();
            this.componentInjector = this.injector.get(this.componentInjectorType, null);
            this.dirRef = new Map();
            this.dirIo = new Map();
            this.dirsDiffer = this.iterableDiffers
                .find([])
                .create(( /**
         * @param {?} _
         * @param {?} def
         * @return {?}
         */function (_, def) { return def.type; }));
        }
        Object.defineProperty(DynamicDirectivesDirective.prototype, "directives", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return (this.ndcDynamicDirectives || this.ngComponentOutletNdcDynamicDirectives);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "compInjector", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.componentOutletInjector || this.componentInjector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "componentRef", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.compInjector.componentRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "compInstance", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.componentRef && this.componentRef.instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "isCompChanged", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                if (this.lastCompInstance !== this.compInstance) {
                    this.lastCompInstance = this.compInstance;
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "hostInjector", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.componentRef.injector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "hostVcr", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.componentRef['_viewRef']['_viewContainerRef'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirectivesDirective.prototype, "reflect", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return (( /** @type {?} */(this.windowRef.nativeWindow))).Reflect;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.ngDoCheck = function () {
            if (this.maybeDestroyDirectives()) {
                return;
            }
            /** @type {?} */
            var dirsChanges = this.dirsDiffer.diff(this.directives);
            if (!dirsChanges) {
                return this.updateDirectives();
            }
            this.processDirChanges(dirsChanges);
        };
        /**
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.ngOnDestroy = function () {
            this.destroyAllDirectives();
        };
        /**
         * @private
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.maybeDestroyDirectives = function () {
            if (this.isCompChanged || !this.componentRef) {
                this.dirsDiffer.diff([]);
                this.destroyAllDirectives();
            }
            return !this.componentRef;
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.processDirChanges = function (changes) {
            var _this = this;
            changes.forEachRemovedItem(( /**
             * @param {?} __0
             * @return {?}
             */function (_a) {
                var item = _a.item;
                return _this.destroyDirective(item);
            }));
            /** @type {?} */
            var createdDirs = [];
            changes.forEachAddedItem(( /**
             * @param {?} __0
             * @return {?}
             */function (_a) {
                var item = _a.item;
                return createdDirs.push(_this.initDirective(item));
            }));
            if (createdDirs.length) {
                this.ndcDynamicDirectivesCreated.emit(createdDirs.filter(Boolean));
            }
        };
        /**
         * @private
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.updateDirectives = function () {
            var _this = this;
            this.directives.forEach(( /**
             * @param {?} dir
             * @return {?}
             */function (/**
             * @param {?} dir
             * @return {?}
             */ dir) { return _this.updateDirective(dir); }));
        };
        /**
         * @private
         * @param {?} dirDef
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.updateDirective = function (dirDef) {
            /** @type {?} */
            var io = this.dirIo.get(dirDef.type);
            io.update(dirDef.inputs, dirDef.outputs, false, false);
            io.maybeUpdate();
        };
        /**
         * @private
         * @param {?} dirDef
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.initDirective = function (dirDef) {
            if (this.dirRef.has(dirDef.type)) {
                return;
            }
            /** @type {?} */
            var instance = this.createDirective(dirDef.type);
            /** @type {?} */
            var dir = {
                instance: instance,
                type: dirDef.type,
                injector: this.hostInjector,
                hostComponent: this.componentRef.instance,
                hostView: this.componentRef.hostView,
                location: this.componentRef.location,
                changeDetectorRef: this.componentRef.changeDetectorRef,
                onDestroy: this.componentRef.onDestroy,
            };
            this.initDirIO(dir, dirDef.inputs, dirDef.outputs);
            this.callInitHooks(instance);
            this.dirRef.set(dir.type, dir);
            return dir;
        };
        /**
         * @private
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.destroyAllDirectives = function () {
            var _this = this;
            this.dirRef.forEach(( /**
             * @param {?} dir
             * @return {?}
             */function (/**
             * @param {?} dir
             * @return {?}
             */ dir) { return _this.destroyDirRef(dir); }));
            this.dirRef.clear();
            this.dirIo.clear();
        };
        /**
         * @private
         * @param {?} dirDef
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.destroyDirective = function (dirDef) {
            this.destroyDirRef(this.dirRef.get(dirDef.type));
            this.dirRef.delete(dirDef.type);
            this.dirIo.delete(dirDef.type);
        };
        /**
         * @private
         * @param {?} dir
         * @param {?=} inputs
         * @param {?=} outputs
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.initDirIO = function (dir, inputs, outputs) {
            /** @type {?} */
            var io = this.ioFactoryService.create();
            io.init({ componentRef: this.dirToCompDef(dir) }, { trackOutputChanges: true });
            io.update(inputs, outputs, !!inputs, !!outputs);
            this.dirIo.set(dir.type, io);
        };
        /**
         * @private
         * @param {?} dir
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.dirToCompDef = function (dir) {
            return Object.assign({}, this.componentRef, { destroy: this.componentRef.destroy, onDestroy: this.componentRef.onDestroy, injector: this.componentRef.injector, instance: dir.instance, componentType: dir.type });
        };
        /**
         * @private
         * @param {?} dir
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.destroyDirRef = function (dir) {
            /** @type {?} */
            var io = this.dirIo.get(dir.type);
            io.ngOnDestroy();
            if ('ngOnDestroy' in dir.instance) {
                dir.instance.ngOnDestroy();
            }
        };
        /**
         * @private
         * @template T
         * @param {?} dirType
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.createDirective = function (dirType) {
            var _this = this;
            /** @type {?} */
            var ctorParams = getCtorType(dirType, this.reflect);
            /** @type {?} */
            var resolvedParams = ctorParams.map(( /**
             * @param {?} p
             * @return {?}
             */function (/**
             * @param {?} p
             * @return {?}
             */ p) { return _this.resolveDep(p); }));
            return new (dirType.bind.apply(dirType, [void 0].concat(resolvedParams)))();
        };
        /**
         * @private
         * @param {?} dep
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.resolveDep = function (dep) {
            return this.maybeResolveVCR(dep) || this.hostInjector.get(dep);
        };
        /**
         * @private
         * @param {?} dep
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.maybeResolveVCR = function (dep) {
            if (dep === core.ViewContainerRef) {
                return this.hostVcr;
            }
        };
        /**
         * @private
         * @param {?} obj
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.callInitHooks = function (obj) {
            this.callHook(obj, 'ngOnInit');
            this.callHook(obj, 'ngDoCheck');
            this.callHook(obj, 'ngAfterContentInit');
            this.callHook(obj, 'ngAfterContentChecked');
            this.callHook(obj, 'ngAfterViewInit');
            this.callHook(obj, 'ngAfterViewChecked');
        };
        /**
         * @private
         * @param {?} obj
         * @param {?} hook
         * @param {?=} args
         * @return {?}
         */
        DynamicDirectivesDirective.prototype.callHook = function (obj, hook, args) {
            if (args === void 0) { args = []; }
            if (obj[hook]) {
                obj[hook].apply(obj, args);
            }
        };
        return DynamicDirectivesDirective;
    }());
    DynamicDirectivesDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ndcDynamicDirectives],[ngComponentOutletNdcDynamicDirectives]',
                },] },
    ];
    /** @nocollapse */
    DynamicDirectivesDirective.ctorParameters = function () { return [
        { type: core.Injector },
        { type: core.IterableDiffers },
        { type: IoFactoryService },
        { type: WindowRefService },
        { type: undefined, decorators: [{ type: core.Inject, args: [COMPONENT_INJECTOR,] }] },
        { type: ComponentOutletInjectorDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
    ]; };
    DynamicDirectivesDirective.propDecorators = {
        ndcDynamicDirectives: [{ type: core.Input }],
        ngComponentOutletNdcDynamicDirectives: [{ type: core.Input }],
        ndcDynamicDirectivesCreated: [{ type: core.Output }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicComponent = /** @class */ (function () {
        /**
         * @param {?} _vcr
         * @param {?} _cfr
         */
        function DynamicComponent(_vcr, _cfr) {
            this._vcr = _vcr;
            this._cfr = _cfr;
            this.ndcDynamicCreated = new core.EventEmitter();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        DynamicComponent.prototype.ngOnChanges = function (changes) {
            if (changes['ndcDynamicComponent']) {
                this.createDynamicComponent();
            }
        };
        /**
         * @return {?}
         */
        DynamicComponent.prototype.createDynamicComponent = function () {
            this._vcr.clear();
            this.componentRef = null;
            if (this.ndcDynamicComponent) {
                this.componentRef = this._vcr.createComponent(this._cfr.resolveComponentFactory(this.ndcDynamicComponent), 0, this._resolveInjector(), this.ndcDynamicContent);
                this.ndcDynamicCreated.emit(this.componentRef);
            }
        };
        /**
         * @private
         * @return {?}
         */
        DynamicComponent.prototype._resolveInjector = function () {
            /** @type {?} */
            var injector = this.ndcDynamicInjector || this._vcr.parentInjector;
            if (this.ndcDynamicProviders) {
                injector = core.Injector.create({
                    providers: this.ndcDynamicProviders,
                    parent: injector,
                });
            }
            return injector;
        };
        return DynamicComponent;
    }());
    DynamicComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ndc-dynamic',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    DynamicComponent.ctorParameters = function () { return [
        { type: core.ViewContainerRef },
        { type: core.ComponentFactoryResolver }
    ]; };
    DynamicComponent.propDecorators = {
        ndcDynamicComponent: [{ type: core.Input }],
        ndcDynamicInjector: [{ type: core.Input }],
        ndcDynamicProviders: [{ type: core.Input }],
        ndcDynamicContent: [{ type: core.Input }],
        ndcDynamicCreated: [{ type: core.Output }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicDirective = /** @class */ (function () {
        /**
         * @param {?} _injector
         * @param {?} ioService
         * @param {?} _componentInjectorType
         * @param {?} _componentOutletInjector
         */
        function DynamicDirective(_injector, ioService, _componentInjectorType, _componentOutletInjector) {
            this._injector = _injector;
            this.ioService = ioService;
            this._componentInjectorType = _componentInjectorType;
            this._componentOutletInjector = _componentOutletInjector;
            this._componentInjector = this._injector.get(this._componentInjectorType, null);
            this.ioService.init(this._compInjector);
        }
        Object.defineProperty(DynamicDirective.prototype, "_inputs", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.ndcDynamicInputs || this.ngComponentOutletNdcDynamicInputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirective.prototype, "_outputs", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this.ndcDynamicOutputs || this.ngComponentOutletNdcDynamicOutputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicDirective.prototype, "_compInjector", {
            /**
             * @private
             * @return {?}
             */
            get: function () {
                return this._componentOutletInjector || this._componentInjector;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        DynamicDirective.prototype.ngOnChanges = function (changes) {
            this.ioService.update(this._inputs, this._outputs, this._inputsChanged(changes), this._outputsChanged(changes));
        };
        /**
         * @return {?}
         */
        DynamicDirective.prototype.ngDoCheck = function () {
            this.ioService.maybeUpdate();
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        DynamicDirective.prototype._inputsChanged = function (changes) {
            return ('ngComponentOutletNdcDynamicInputs' in changes ||
                'ndcDynamicInputs' in changes);
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        DynamicDirective.prototype._outputsChanged = function (changes) {
            return ('ngComponentOutletNdcDynamicOutputs' in changes ||
                'ndcDynamicOutputs' in changes);
        };
        return DynamicDirective;
    }());
    DynamicDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ndcDynamicInputs],[ndcDynamicOutputs],[ngComponentOutletNdcDynamicInputs],[ngComponentOutletNdcDynamicOutputs]',
                    providers: [IoService],
                },] },
    ];
    /** @nocollapse */
    DynamicDirective.ctorParameters = function () { return [
        { type: core.Injector },
        { type: IoService },
        { type: undefined, decorators: [{ type: core.Inject, args: [COMPONENT_INJECTOR,] }] },
        { type: ComponentOutletInjectorDirective, decorators: [{ type: core.Host }, { type: core.Optional }] }
    ]; };
    DynamicDirective.propDecorators = {
        ndcDynamicInputs: [{ type: core.Input }],
        ngComponentOutletNdcDynamicInputs: [{ type: core.Input }],
        ndcDynamicOutputs: [{ type: core.Input }],
        ngComponentOutletNdcDynamicOutputs: [{ type: core.Input }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function windowRefFactory() {
        return window;
    }
    var DynamicModule = /** @class */ (function () {
        function DynamicModule() {
        }
        /**
         * @param {?} components
         * @param {?=} componentInjector
         * @return {?}
         */
        DynamicModule.withComponents = function (components, componentInjector) {
            if (componentInjector === void 0) { componentInjector = DynamicComponent; }
            return {
                ngModule: DynamicModule,
                providers: [
                    {
                        provide: core.ANALYZE_FOR_ENTRY_COMPONENTS,
                        useValue: components,
                        multi: true,
                    },
                    { provide: COMPONENT_INJECTOR, useValue: componentInjector },
                    IoFactoryService,
                    { provide: WINDOW_REF, useFactory: windowRefFactory },
                    WindowRefService,
                ],
            };
        };
        return DynamicModule;
    }());
    DynamicModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [
                        DynamicComponent,
                        DynamicDirective,
                        ComponentOutletInjectorDirective,
                        DynamicAttributesDirective,
                        DynamicDirectivesDirective,
                    ],
                    exports: [
                        DynamicComponent,
                        DynamicDirective,
                        ComponentOutletInjectorDirective,
                        DynamicAttributesDirective,
                        DynamicDirectivesDirective,
                    ],
                },] },
    ];

    /**
     * @license Angular v8.0.3
     * (c) 2010-2019 Google LLC. https://angular.io/
     * License: MIT
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
     * `HttpResponse`.
     *
     * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
     * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
     * `HttpBackend`.
     *
     * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
     *
     * @publicApi
     */
    var HttpHandler = /** @class */ (function () {
        function HttpHandler() {
        }
        return HttpHandler;
    }());
    /**
     * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
     *
     * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
     *
     * When injected, `HttpBackend` dispatches requests directly to the backend, without going
     * through the interceptor chain.
     *
     * @publicApi
     */
    var HttpBackend = /** @class */ (function () {
        function HttpBackend() {
        }
        return HttpBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `HttpHeaders` class represents the header configuration options for an HTTP request.
     * Instances should be assumed immutable with lazy parsing.
     *
     * @publicApi
     */
    var HttpHeaders = /** @class */ (function () {
        /**  Constructs a new HTTP header object with the given values.*/
        function HttpHeaders(headers) {
            var _this = this;
            /**
             * Internal map of lowercased header names to the normalized
             * form of the name (the form seen first).
             */
            this.normalizedNames = new Map();
            /**
             * Queued updates to be materialized the next initialization.
             */
            this.lazyUpdate = null;
            if (!headers) {
                this.headers = new Map();
            }
            else if (typeof headers === 'string') {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    headers.split('\n').forEach(function (line) {
                        var index = line.indexOf(':');
                        if (index > 0) {
                            var name_1 = line.slice(0, index);
                            var key = name_1.toLowerCase();
                            var value = line.slice(index + 1).trim();
                            _this.maybeSetNormalizedName(name_1, key);
                            if (_this.headers.has(key)) {
                                _this.headers.get(key).push(value);
                            }
                            else {
                                _this.headers.set(key, [value]);
                            }
                        }
                    });
                };
            }
            else {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    Object.keys(headers).forEach(function (name) {
                        var values = headers[name];
                        var key = name.toLowerCase();
                        if (typeof values === 'string') {
                            values = [values];
                        }
                        if (values.length > 0) {
                            _this.headers.set(key, values);
                            _this.maybeSetNormalizedName(name, key);
                        }
                    });
                };
            }
        }
        /**
         * Checks for existence of a header by a given name.
         *
         * @param name The header name to check for existence.
         *
         * @returns Whether the header exits.
         */
        HttpHeaders.prototype.has = function (name) {
            this.init();
            return this.headers.has(name.toLowerCase());
        };
        /**
         * Returns the first header value that matches a given name.
         *
         * @param name The header name to retrieve.
         *
         * @returns A string if the header exists, null otherwise
         */
        HttpHeaders.prototype.get = function (name) {
            this.init();
            var values = this.headers.get(name.toLowerCase());
            return values && values.length > 0 ? values[0] : null;
        };
        /**
         * Returns the names of the headers.
         *
         * @returns A list of header names.
         */
        HttpHeaders.prototype.keys = function () {
            this.init();
            return Array.from(this.normalizedNames.values());
        };
        /**
         * Returns a list of header values for a given header name.
         *
         * @param name The header name from which to retrieve the values.
         *
         * @returns A string of values if the header exists, null otherwise.
         */
        HttpHeaders.prototype.getAll = function (name) {
            this.init();
            return this.headers.get(name.toLowerCase()) || null;
        };
        /**
         * Appends a new header value to the existing set of
         * header values.
         *
         * @param name The header name for which to append the values.
         *
         * @returns A clone of the HTTP header object with the value appended.
         */
        HttpHeaders.prototype.append = function (name, value) {
            return this.clone({ name: name, value: value, op: 'a' });
        };
        /**
         * Sets a header value for a given name. If the header name already exists,
         * its value is replaced with the given value.
         *
         * @param name The header name.
         * @param value Provides the value to set or overide for a given name.
         *
         * @returns A clone of the HTTP header object with the newly set header value.
         */
        HttpHeaders.prototype.set = function (name, value) {
            return this.clone({ name: name, value: value, op: 's' });
        };
        /**
         * Deletes all header values for a given name.
         *
         * @param name The header name.
         * @param value The header values to delete for a given name.
         *
         * @returns A clone of the HTTP header object.
         */
        HttpHeaders.prototype.delete = function (name, value) {
            return this.clone({ name: name, value: value, op: 'd' });
        };
        HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
            if (!this.normalizedNames.has(lcName)) {
                this.normalizedNames.set(lcName, name);
            }
        };
        HttpHeaders.prototype.init = function () {
            var _this = this;
            if (!!this.lazyInit) {
                if (this.lazyInit instanceof HttpHeaders) {
                    this.copyFrom(this.lazyInit);
                }
                else {
                    this.lazyInit();
                }
                this.lazyInit = null;
                if (!!this.lazyUpdate) {
                    this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                    this.lazyUpdate = null;
                }
            }
        };
        HttpHeaders.prototype.copyFrom = function (other) {
            var _this = this;
            other.init();
            Array.from(other.headers.keys()).forEach(function (key) {
                _this.headers.set(key, other.headers.get(key));
                _this.normalizedNames.set(key, other.normalizedNames.get(key));
            });
        };
        HttpHeaders.prototype.clone = function (update) {
            var clone = new HttpHeaders();
            clone.lazyInit =
                (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
            clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
            return clone;
        };
        HttpHeaders.prototype.applyUpdate = function (update) {
            var key = update.name.toLowerCase();
            switch (update.op) {
                case 'a':
                case 's':
                    var value = update.value;
                    if (typeof value === 'string') {
                        value = [value];
                    }
                    if (value.length === 0) {
                        return;
                    }
                    this.maybeSetNormalizedName(update.name, key);
                    var base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                    base.push.apply(base, __spread(value));
                    this.headers.set(key, base);
                    break;
                case 'd':
                    var toDelete_1 = update.value;
                    if (!toDelete_1) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        var existing = this.headers.get(key);
                        if (!existing) {
                            return;
                        }
                        existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                        if (existing.length === 0) {
                            this.headers.delete(key);
                            this.normalizedNames.delete(key);
                        }
                        else {
                            this.headers.set(key, existing);
                        }
                    }
                    break;
            }
        };
        /**
         * @internal
         */
        HttpHeaders.prototype.forEach = function (fn) {
            var _this = this;
            this.init();
            Array.from(this.normalizedNames.keys())
                .forEach(function (key) { return fn(_this.normalizedNames.get(key), _this.headers.get(key)); });
        };
        return HttpHeaders;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A class that uses `encodeURIComponent` and `decodeURIComponent` to
     * serialize and parse URL parameter keys and values. If you pass URL query parameters
     * without encoding, the query parameters can get misinterpreted at the receiving end.
     * Use the `HttpParameterCodec` class to encode and decode the query-string values.
     *
     * @publicApi
     */
    var HttpUrlEncodingCodec = /** @class */ (function () {
        function HttpUrlEncodingCodec() {
        }
        HttpUrlEncodingCodec.prototype.encodeKey = function (key) { return standardEncoding(key); };
        HttpUrlEncodingCodec.prototype.encodeValue = function (value) { return standardEncoding(value); };
        HttpUrlEncodingCodec.prototype.decodeKey = function (key) { return decodeURIComponent(key); };
        HttpUrlEncodingCodec.prototype.decodeValue = function (value) { return decodeURIComponent(value); };
        return HttpUrlEncodingCodec;
    }());
    function paramParser(rawParams, codec) {
        var map = new Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&');
            params.forEach(function (param) {
                var eqIdx = param.indexOf('=');
                var _a = __read(eqIdx == -1 ?
                    [codec.decodeKey(param), ''] :
                    [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))], 2), key = _a[0], val = _a[1];
                var list = map.get(key) || [];
                list.push(val);
                map.set(key, list);
            });
        }
        return map;
    }
    function standardEncoding(v) {
        return encodeURIComponent(v)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%2B/gi, '+')
            .replace(/%3D/gi, '=')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/');
    }
    /**
     * An HTTP request/response body that represents serialized parameters,
     * per the MIME type `application/x-www-form-urlencoded`.
     *
     * This class is immutable - all mutation operations return a new instance.
     *
     * @publicApi
     */
    var HttpParams = /** @class */ (function () {
        function HttpParams(options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.updates = null;
            this.cloneFrom = null;
            this.encoder = options.encoder || new HttpUrlEncodingCodec();
            if (!!options.fromString) {
                if (!!options.fromObject) {
                    throw new Error("Cannot specify both fromString and fromObject.");
                }
                this.map = paramParser(options.fromString, this.encoder);
            }
            else if (!!options.fromObject) {
                this.map = new Map();
                Object.keys(options.fromObject).forEach(function (key) {
                    var value = options.fromObject[key];
                    _this.map.set(key, Array.isArray(value) ? value : [value]);
                });
            }
            else {
                this.map = null;
            }
        }
        /**
         * Check whether the body has one or more values for the given parameter name.
         */
        HttpParams.prototype.has = function (param) {
            this.init();
            return this.map.has(param);
        };
        /**
         * Get the first value for the given parameter name, or `null` if it's not present.
         */
        HttpParams.prototype.get = function (param) {
            this.init();
            var res = this.map.get(param);
            return !!res ? res[0] : null;
        };
        /**
         * Get all values for the given parameter name, or `null` if it's not present.
         */
        HttpParams.prototype.getAll = function (param) {
            this.init();
            return this.map.get(param) || null;
        };
        /**
         * Get all the parameter names for this body.
         */
        HttpParams.prototype.keys = function () {
            this.init();
            return Array.from(this.map.keys());
        };
        /**
         * Construct a new body with an appended value for the given parameter name.
         */
        HttpParams.prototype.append = function (param, value) { return this.clone({ param: param, value: value, op: 'a' }); };
        /**
         * Construct a new body with a new value for the given parameter name.
         */
        HttpParams.prototype.set = function (param, value) { return this.clone({ param: param, value: value, op: 's' }); };
        /**
         * Construct a new body with either the given value for the given parameter
         * removed, if a value is given, or all values for the given parameter removed
         * if not.
         */
        HttpParams.prototype.delete = function (param, value) { return this.clone({ param: param, value: value, op: 'd' }); };
        /**
         * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
         * separated by `&`s.
         */
        HttpParams.prototype.toString = function () {
            var _this = this;
            this.init();
            return this.keys()
                .map(function (key) {
                var eKey = _this.encoder.encodeKey(key);
                return _this.map.get(key).map(function (value) { return eKey + '=' + _this.encoder.encodeValue(value); })
                    .join('&');
            })
                .join('&');
        };
        HttpParams.prototype.clone = function (update) {
            var clone = new HttpParams({ encoder: this.encoder });
            clone.cloneFrom = this.cloneFrom || this;
            clone.updates = (this.updates || []).concat([update]);
            return clone;
        };
        HttpParams.prototype.init = function () {
            var _this = this;
            if (this.map === null) {
                this.map = new Map();
            }
            if (this.cloneFrom !== null) {
                this.cloneFrom.init();
                this.cloneFrom.keys().forEach(function (key) { return _this.map.set(key, _this.cloneFrom.map.get(key)); });
                this.updates.forEach(function (update) {
                    switch (update.op) {
                        case 'a':
                        case 's':
                            var base = (update.op === 'a' ? _this.map.get(update.param) : undefined) || [];
                            base.push(update.value);
                            _this.map.set(update.param, base);
                            break;
                        case 'd':
                            if (update.value !== undefined) {
                                var base_1 = _this.map.get(update.param) || [];
                                var idx = base_1.indexOf(update.value);
                                if (idx !== -1) {
                                    base_1.splice(idx, 1);
                                }
                                if (base_1.length > 0) {
                                    _this.map.set(update.param, base_1);
                                }
                                else {
                                    _this.map.delete(update.param);
                                }
                            }
                            else {
                                _this.map.delete(update.param);
                                break;
                            }
                    }
                });
                this.cloneFrom = this.updates = null;
            }
        };
        return HttpParams;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Determine whether the given HTTP method may include a body.
     */
    function mightHaveBody(method) {
        switch (method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'OPTIONS':
            case 'JSONP':
                return false;
            default:
                return true;
        }
    }
    /**
     * Safely assert whether the given value is an ArrayBuffer.
     *
     * In some execution environments ArrayBuffer is not defined.
     */
    function isArrayBuffer(value) {
        return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
    }
    /**
     * Safely assert whether the given value is a Blob.
     *
     * In some execution environments Blob is not defined.
     */
    function isBlob(value) {
        return typeof Blob !== 'undefined' && value instanceof Blob;
    }
    /**
     * Safely assert whether the given value is a FormData instance.
     *
     * In some execution environments FormData is not defined.
     */
    function isFormData(value) {
        return typeof FormData !== 'undefined' && value instanceof FormData;
    }
    /**
     * An outgoing HTTP request with an optional typed body.
     *
     * `HttpRequest` represents an outgoing request, including URL, method,
     * headers, body, and other request configuration options. Instances should be
     * assumed to be immutable. To modify a `HttpRequest`, the `clone`
     * method should be used.
     *
     * @publicApi
     */
    var HttpRequest = /** @class */ (function () {
        function HttpRequest(method, url, third, fourth) {
            this.url = url;
            /**
             * The request body, or `null` if one isn't set.
             *
             * Bodies are not enforced to be immutable, as they can include a reference to any
             * user-defined data type. However, interceptors should take care to preserve
             * idempotence by treating them as such.
             */
            this.body = null;
            /**
             * Whether this request should be made in a way that exposes progress events.
             *
             * Progress events are expensive (change detection runs on each event) and so
             * they should only be requested if the consumer intends to monitor them.
             */
            this.reportProgress = false;
            /**
             * Whether this request should be sent with outgoing credentials (cookies).
             */
            this.withCredentials = false;
            /**
             * The expected response type of the server.
             *
             * This is used to parse the response appropriately before returning it to
             * the requestee.
             */
            this.responseType = 'json';
            this.method = method.toUpperCase();
            // Next, need to figure out which argument holds the HttpRequestInit
            // options, if any.
            var options;
            // Check whether a body argument is expected. The only valid way to omit
            // the body argument is to use a known no-body method like GET.
            if (mightHaveBody(this.method) || !!fourth) {
                // Body is the third argument, options are the fourth.
                this.body = (third !== undefined) ? third : null;
                options = fourth;
            }
            else {
                // No body required, options are the third argument. The body stays null.
                options = third;
            }
            // If options have been passed, interpret them.
            if (options) {
                // Normalize reportProgress and withCredentials.
                this.reportProgress = !!options.reportProgress;
                this.withCredentials = !!options.withCredentials;
                // Override default response type of 'json' if one is provided.
                if (!!options.responseType) {
                    this.responseType = options.responseType;
                }
                // Override headers if they're provided.
                if (!!options.headers) {
                    this.headers = options.headers;
                }
                if (!!options.params) {
                    this.params = options.params;
                }
            }
            // If no headers have been passed in, construct a new HttpHeaders instance.
            if (!this.headers) {
                this.headers = new HttpHeaders();
            }
            // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
            if (!this.params) {
                this.params = new HttpParams();
                this.urlWithParams = url;
            }
            else {
                // Encode the parameters to a string in preparation for inclusion in the URL.
                var params = this.params.toString();
                if (params.length === 0) {
                    // No parameters, the visible URL is just the URL given at creation time.
                    this.urlWithParams = url;
                }
                else {
                    // Does the URL already have query parameters? Look for '?'.
                    var qIdx = url.indexOf('?');
                    // There are 3 cases to handle:
                    // 1) No existing parameters -> append '?' followed by params.
                    // 2) '?' exists and is followed by existing query string ->
                    //    append '&' followed by params.
                    // 3) '?' exists at the end of the url -> append params directly.
                    // This basically amounts to determining the character, if any, with
                    // which to join the URL and parameters.
                    var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                    this.urlWithParams = url + sep + params;
                }
            }
        }
        /**
         * Transform the free-form body into a serialized format suitable for
         * transmission to the server.
         */
        HttpRequest.prototype.serializeBody = function () {
            // If no body is present, no need to serialize it.
            if (this.body === null) {
                return null;
            }
            // Check whether the body is already in a serialized form. If so,
            // it can just be returned directly.
            if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
                typeof this.body === 'string') {
                return this.body;
            }
            // Check whether the body is an instance of HttpUrlEncodedParams.
            if (this.body instanceof HttpParams) {
                return this.body.toString();
            }
            // Check whether the body is an object or array, and serialize with JSON if so.
            if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
                Array.isArray(this.body)) {
                return JSON.stringify(this.body);
            }
            // Fall back on toString() for everything else.
            return this.body.toString();
        };
        /**
         * Examine the body and attempt to infer an appropriate MIME type
         * for it.
         *
         * If no such type can be inferred, this method will return `null`.
         */
        HttpRequest.prototype.detectContentTypeHeader = function () {
            // An empty body has no content type.
            if (this.body === null) {
                return null;
            }
            // FormData bodies rely on the browser's content type assignment.
            if (isFormData(this.body)) {
                return null;
            }
            // Blobs usually have their own content type. If it doesn't, then
            // no type can be inferred.
            if (isBlob(this.body)) {
                return this.body.type || null;
            }
            // Array buffers have unknown contents and thus no type can be inferred.
            if (isArrayBuffer(this.body)) {
                return null;
            }
            // Technically, strings could be a form of JSON data, but it's safe enough
            // to assume they're plain strings.
            if (typeof this.body === 'string') {
                return 'text/plain';
            }
            // `HttpUrlEncodedParams` has its own content-type.
            if (this.body instanceof HttpParams) {
                return 'application/x-www-form-urlencoded;charset=UTF-8';
            }
            // Arrays, objects, and numbers will be encoded as JSON.
            if (typeof this.body === 'object' || typeof this.body === 'number' ||
                Array.isArray(this.body)) {
                return 'application/json';
            }
            // No type could be inferred.
            return null;
        };
        HttpRequest.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            // For method, url, and responseType, take the current value unless
            // it is overridden in the update hash.
            var method = update.method || this.method;
            var url = update.url || this.url;
            var responseType = update.responseType || this.responseType;
            // The body is somewhat special - a `null` value in update.body means
            // whatever current body is present is being overridden with an empty
            // body, whereas an `undefined` value in update.body implies no
            // override.
            var body = (update.body !== undefined) ? update.body : this.body;
            // Carefully handle the boolean options to differentiate between
            // `false` and `undefined` in the update args.
            var withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
            var reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
            // Headers and params may be appended to if `setHeaders` or
            // `setParams` are used.
            var headers = update.headers || this.headers;
            var params = update.params || this.params;
            // Check whether the caller has asked to add headers.
            if (update.setHeaders !== undefined) {
                // Set every requested header.
                headers =
                    Object.keys(update.setHeaders)
                        .reduce(function (headers, name) { return headers.set(name, update.setHeaders[name]); }, headers);
            }
            // Check whether the caller has asked to set params.
            if (update.setParams) {
                // Set every requested param.
                params = Object.keys(update.setParams)
                    .reduce(function (params, param) { return params.set(param, update.setParams[param]); }, params);
            }
            // Finally, construct the new HttpRequest using the pieces from above.
            return new HttpRequest(method, url, body, {
                params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
            });
        };
        return HttpRequest;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Type enumeration for the different kinds of `HttpEvent`.
     *
     * @publicApi
     */
    var HttpEventType;
    (function (HttpEventType) {
        /**
         * The request was sent out over the wire.
         */
        HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
        /**
         * An upload progress event was received.
         */
        HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
        /**
         * The response status code and headers were received.
         */
        HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
        /**
         * A download progress event was received.
         */
        HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
        /**
         * The full response including the body was received.
         */
        HttpEventType[HttpEventType["Response"] = 4] = "Response";
        /**
         * A custom event from an interceptor or a backend.
         */
        HttpEventType[HttpEventType["User"] = 5] = "User";
    })(HttpEventType || (HttpEventType = {}));
    /**
     * Base class for both `HttpResponse` and `HttpHeaderResponse`.
     *
     * @publicApi
     */
    var HttpResponseBase = /** @class */ (function () {
        /**
         * Super-constructor for all responses.
         *
         * The single parameter accepted is an initialization hash. Any properties
         * of the response passed there will override the default values.
         */
        function HttpResponseBase(init, defaultStatus, defaultStatusText) {
            if (defaultStatus === void 0) { defaultStatus = 200; }
            if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
            // If the hash has values passed, use them to initialize the response.
            // Otherwise use the default values.
            this.headers = init.headers || new HttpHeaders();
            this.status = init.status !== undefined ? init.status : defaultStatus;
            this.statusText = init.statusText || defaultStatusText;
            this.url = init.url || null;
            // Cache the ok value to avoid defining a getter.
            this.ok = this.status >= 200 && this.status < 300;
        }
        return HttpResponseBase;
    }());
    /**
     * A partial HTTP response which only includes the status and header data,
     * but no response body.
     *
     * `HttpHeaderResponse` is a `HttpEvent` available on the response
     * event stream, only when progress events are requested.
     *
     * @publicApi
     */
    var HttpHeaderResponse = /** @class */ (function (_super) {
        __extends(HttpHeaderResponse, _super);
        /**
         * Create a new `HttpHeaderResponse` with the given parameters.
         */
        function HttpHeaderResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.ResponseHeader;
            return _this;
        }
        /**
         * Copy this `HttpHeaderResponse`, overriding its contents with the
         * given parameter hash.
         */
        HttpHeaderResponse.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            // Perform a straightforward initialization of the new HttpHeaderResponse,
            // overriding the current parameters with new ones if given.
            return new HttpHeaderResponse({
                headers: update.headers || this.headers,
                status: update.status !== undefined ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpHeaderResponse;
    }(HttpResponseBase));
    /**
     * A full HTTP response, including a typed response body (which may be `null`
     * if one was not returned).
     *
     * `HttpResponse` is a `HttpEvent` available on the response event
     * stream.
     *
     * @publicApi
     */
    var HttpResponse = /** @class */ (function (_super) {
        __extends(HttpResponse, _super);
        /**
         * Construct a new `HttpResponse`.
         */
        function HttpResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.Response;
            _this.body = init.body !== undefined ? init.body : null;
            return _this;
        }
        HttpResponse.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            return new HttpResponse({
                body: (update.body !== undefined) ? update.body : this.body,
                headers: update.headers || this.headers,
                status: (update.status !== undefined) ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpResponse;
    }(HttpResponseBase));
    /**
     * A response that represents an error or failure, either from a
     * non-successful HTTP status, an error while executing the request,
     * or some other failure which occurred during the parsing of the response.
     *
     * Any error returned on the `Observable` response stream will be
     * wrapped in an `HttpErrorResponse` to provide additional context about
     * the state of the HTTP layer when the error occurred. The error property
     * will contain either a wrapped Error object or the error response returned
     * from the server.
     *
     * @publicApi
     */
    var HttpErrorResponse = /** @class */ (function (_super) {
        __extends(HttpErrorResponse, _super);
        function HttpErrorResponse(init) {
            var _this = 
            // Initialize with a default status of 0 / Unknown Error.
            _super.call(this, init, 0, 'Unknown Error') || this;
            _this.name = 'HttpErrorResponse';
            /**
             * Errors are never okay, even when the status code is in the 2xx success range.
             */
            _this.ok = false;
            // If the response was successful, then this was a parse error. Otherwise, it was
            // a protocol-level failure of some sort. Either the request failed in transit
            // or the server returned an unsuccessful status code.
            if (_this.status >= 200 && _this.status < 300) {
                _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
            }
            else {
                _this.message =
                    "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
            }
            _this.error = init.error || null;
            return _this;
        }
        return HttpErrorResponse;
    }(HttpResponseBase));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Constructs an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
     * the given `body`. This function clones the object and adds the body.
     */
    function addBody(options, body) {
        return {
            body: body,
            headers: options.headers,
            observe: options.observe,
            params: options.params,
            reportProgress: options.reportProgress,
            responseType: options.responseType,
            withCredentials: options.withCredentials,
        };
    }
    /**
     * Performs HTTP requests.
     *
     * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
     * Each request method has multiple signatures, and the return type varies based on
     * the signature that is called (mainly the values of `observe` and `responseType`).
     *
     *
     * @see [HTTP Guide](guide/http)
     *
     *
     * @usageNotes
     * Sample HTTP requests for the [Tour of Heroes](/tutorial/toh-pt0) application.
     *
     * ### HTTP Request Example
     *
     * ```
     *  // GET heroes whose name contains search term
     * searchHeroes(term: string): observable<Hero[]>{
     *
     *  const params = new HttpParams({fromString: 'name=term'});
     *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
     * }
     * ```
     * ### JSONP Example
     * ```
     * requestJsonp(url, callback = 'callback') {
     *  return this.httpClient.jsonp(this.heroesURL, callback);
     * }
     * ```
     *
     *
     * ### PATCH Example
     * ```
     * // PATCH one of the heroes' name
     * patchHero (id: number, heroName: string): Observable<{}> {
     * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
     *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
     *    .pipe(catchError(this.handleError('patchHero')));
     * }
    * ```
     *
     * @publicApi
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient(handler) {
            this.handler = handler;
        }
        /**
         * Constructs an observable for a generic HTTP request that, when subscribed,
         * fires the request through the chain of registered interceptors and on to the
         * server.
         *
         * You can pass an `HttpRequest` directly as the only parameter. In this case,
         * the call returns an observable of the raw `HttpEvent` stream.
         *
         * Alternatively you can pass an HTTP method as the first parameter,
         * a URL string as the second, and an options hash containing the request body as the third.
         * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
         * type of returned observable.
         *   * The `responseType` value determines how a successful response body is parsed.
         *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
         * object as a type parameter to the call.
         *
         * The `observe` value determines the return type, according to what you are interested in
         * observing.
         *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
         * progress events by default.
         *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
         * where the `T` parameter depends on the `responseType` and any optionally provided type
         * parameter.
         *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
         *
         */
        HttpClient.prototype.request = function (first, url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var req;
            // First, check whether the primary argument is an instance of `HttpRequest`.
            if (first instanceof HttpRequest) {
                // It is. The other arguments must be undefined (per the signatures) and can be
                // ignored.
                req = first;
            }
            else {
                // It's a string, so it represents a URL. Construct a request based on it,
                // and incorporate the remaining arguments (assuming `GET` unless a method is
                // provided.
                // Figure out the headers.
                var headers = undefined;
                if (options.headers instanceof HttpHeaders) {
                    headers = options.headers;
                }
                else {
                    headers = new HttpHeaders(options.headers);
                }
                // Sort out parameters.
                var params = undefined;
                if (!!options.params) {
                    if (options.params instanceof HttpParams) {
                        params = options.params;
                    }
                    else {
                        params = new HttpParams({ fromObject: options.params });
                    }
                }
                // Construct the request.
                req = new HttpRequest(first, url, (options.body !== undefined ? options.body : null), {
                    headers: headers,
                    params: params,
                    reportProgress: options.reportProgress,
                    // By default, JSON is assumed to be returned for all calls.
                    responseType: options.responseType || 'json',
                    withCredentials: options.withCredentials,
                });
            }
            // Start with an Observable.of() the initial request, and run the handler (which
            // includes all interceptors) inside a concatMap(). This way, the handler runs
            // inside an Observable chain, which causes interceptors to be re-run on every
            // subscription (this also makes retries re-run the handler, including interceptors).
            var events$ = of(req).pipe(concatMap(function (req) { return _this.handler.handle(req); }));
            // If coming via the API signature which accepts a previously constructed HttpRequest,
            // the only option is to get the event stream. Otherwise, return the event stream if
            // that is what was requested.
            if (first instanceof HttpRequest || options.observe === 'events') {
                return events$;
            }
            // The requested stream contains either the full response or the body. In either
            // case, the first step is to filter the event stream to extract a stream of
            // responses(s).
            var res$ = events$.pipe(filter(function (event) { return event instanceof HttpResponse; }));
            // Decide which stream to return.
            switch (options.observe || 'body') {
                case 'body':
                    // The requested stream is the body. Map the response stream to the response
                    // body. This could be done more simply, but a misbehaving interceptor might
                    // transform the response body into a different format and ignore the requested
                    // responseType. Guard against this by validating that the response is of the
                    // requested type.
                    switch (req.responseType) {
                        case 'arraybuffer':
                            return res$.pipe(map(function (res) {
                                // Validate that the body is an ArrayBuffer.
                                if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                    throw new Error('Response is not an ArrayBuffer.');
                                }
                                return res.body;
                            }));
                        case 'blob':
                            return res$.pipe(map(function (res) {
                                // Validate that the body is a Blob.
                                if (res.body !== null && !(res.body instanceof Blob)) {
                                    throw new Error('Response is not a Blob.');
                                }
                                return res.body;
                            }));
                        case 'text':
                            return res$.pipe(map(function (res) {
                                // Validate that the body is a string.
                                if (res.body !== null && typeof res.body !== 'string') {
                                    throw new Error('Response is not a string.');
                                }
                                return res.body;
                            }));
                        case 'json':
                        default:
                            // No validation needed for JSON responses, as they can be of any type.
                            return res$.pipe(map(function (res) { return res.body; }));
                    }
                case 'response':
                    // The response stream was requested directly, so return it.
                    return res$;
                default:
                    // Guard against new future observe types being added.
                    throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
            }
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `DELETE` request to execute on the server. See the individual overloads for
         * details on the return type.
         *
         * @param url     The endpoint URL.
         * @param options The HTTP options to send with the request.
         *
         */
        HttpClient.prototype.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('DELETE', url, options);
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `GET` request to execute on the server. See the individual overloads for
         * details on the return type.
         */
        HttpClient.prototype.get = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('GET', url, options);
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `HEAD` request to execute on the server. The `HEAD` method returns
         * meta information about the resource without transferring the
         * resource itself. See the individual overloads for
         * details on the return type.
         */
        HttpClient.prototype.head = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('HEAD', url, options);
        };
        /**
         * Constructs an `Observable` that, when subscribed, causes a request with the special method
         * `JSONP` to be dispatched via the interceptor pipeline.
         * The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
         * API endpoints that don't support newer,
         * and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
         * JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
         * requests even if the API endpoint is not located on the same domain (origin) as the client-side
         * application making the request.
         * The endpoint API must support JSONP callback for JSONP requests to work.
         * The resource API returns the JSON response wrapped in a callback function.
         * You can pass the callback function name as one of the query parameters.
         * Note that JSONP requests can only be used with `GET` requests.
         *
         * @param url The resource URL.
         * @param callbackParam The callback function name.
         *
         */
        HttpClient.prototype.jsonp = function (url, callbackParam) {
            return this.request('JSONP', url, {
                params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
                observe: 'body',
                responseType: 'json',
            });
        };
        /**
         * Constructs an `Observable` that, when subscribed, causes the configured
         * `OPTIONS` request to execute on the server. This method allows the client
         * to determine the supported HTTP methods and other capabilites of an endpoint,
         * without implying a resource action. See the individual overloads for
         * details on the return type.
         */
        HttpClient.prototype.options = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('OPTIONS', url, options);
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `PATCH` request to execute on the server. See the individual overloads for
         * details on the return type.
         */
        HttpClient.prototype.patch = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PATCH', url, addBody(options, body));
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `POST` request to execute on the server. The server responds with the location of
         * the replaced resource. See the individual overloads for
         * details on the return type.
         */
        HttpClient.prototype.post = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('POST', url, addBody(options, body));
        };
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
         * with a new set of values.
         * See the individual overloads for details on the return type.
         */
        HttpClient.prototype.put = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PUT', url, addBody(options, body));
        };
        HttpClient = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [HttpHandler])
        ], HttpClient);
        return HttpClient;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
     *
     *
     */
    var HttpInterceptorHandler = /** @class */ (function () {
        function HttpInterceptorHandler(next, interceptor) {
            this.next = next;
            this.interceptor = interceptor;
        }
        HttpInterceptorHandler.prototype.handle = function (req) {
            return this.interceptor.intercept(req, this.next);
        };
        return HttpInterceptorHandler;
    }());
    /**
     * A multi-provider token which represents the array of `HttpInterceptor`s that
     * are registered.
     *
     * @publicApi
     */
    var HTTP_INTERCEPTORS = new core.InjectionToken('HTTP_INTERCEPTORS');
    var NoopInterceptor = /** @class */ (function () {
        function NoopInterceptor() {
        }
        NoopInterceptor.prototype.intercept = function (req, next) {
            return next.handle(req);
        };
        NoopInterceptor = __decorate([
            core.Injectable()
        ], NoopInterceptor);
        return NoopInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Every request made through JSONP needs a callback name that's unique across the
    // whole page. Each request is assigned an id and the callback name is constructed
    // from that. The next id to be assigned is tracked in a global variable here that
    // is shared among all applications on the page.
    var nextRequestId = 0;
    // Error text given when a JSONP script is injected, but doesn't invoke the callback
    // passed in its URL.
    var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
    // Error text given when a request is passed to the JsonpClientBackend that doesn't
    // have a request method JSONP.
    var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use JSONP request method.';
    var JSONP_ERR_WRONG_RESPONSE_TYPE = 'JSONP requests must use Json response type.';
    /**
     * DI token/abstract type representing a map of JSONP callbacks.
     *
     * In the browser, this should always be the `window` object.
     *
     *
     */
    var JsonpCallbackContext = /** @class */ (function () {
        function JsonpCallbackContext() {
        }
        return JsonpCallbackContext;
    }());
    /**
     * `HttpBackend` that only processes `HttpRequest` with the JSONP method,
     * by performing JSONP style requests.
     *
     * @publicApi
     */
    var JsonpClientBackend = /** @class */ (function () {
        function JsonpClientBackend(callbackMap, document) {
            this.callbackMap = callbackMap;
            this.document = document;
        }
        /**
         * Get the name of the next callback method, by incrementing the global `nextRequestId`.
         */
        JsonpClientBackend.prototype.nextCallback = function () { return "ng_jsonp_callback_" + nextRequestId++; };
        /**
         * Process a JSONP request and return an event stream of the results.
         */
        JsonpClientBackend.prototype.handle = function (req) {
            var _this = this;
            // Firstly, check both the method and response type. If either doesn't match
            // then the request was improperly routed here and cannot be handled.
            if (req.method !== 'JSONP') {
                throw new Error(JSONP_ERR_WRONG_METHOD);
            }
            else if (req.responseType !== 'json') {
                throw new Error(JSONP_ERR_WRONG_RESPONSE_TYPE);
            }
            // Everything else happens inside the Observable boundary.
            return new Observable(function (observer) {
                // The first step to make a request is to generate the callback name, and replace the
                // callback placeholder in the URL with the name. Care has to be taken here to ensure
                // a trailing &, if matched, gets inserted back into the URL in the correct place.
                var callback = _this.nextCallback();
                var url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, "=" + callback + "$1");
                // Construct the <script> tag and point it at the URL.
                var node = _this.document.createElement('script');
                node.src = url;
                // A JSONP request requires waiting for multiple callbacks. These variables
                // are closed over and track state across those callbacks.
                // The response object, if one has been received, or null otherwise.
                var body = null;
                // Whether the response callback has been called.
                var finished = false;
                // Whether the request has been cancelled (and thus any other callbacks)
                // should be ignored.
                var cancelled = false;
                // Set the response callback in this.callbackMap (which will be the window
                // object in the browser. The script being loaded via the <script> tag will
                // eventually call this callback.
                _this.callbackMap[callback] = function (data) {
                    // Data has been received from the JSONP script. Firstly, delete this callback.
                    delete _this.callbackMap[callback];
                    // Next, make sure the request wasn't cancelled in the meantime.
                    if (cancelled) {
                        return;
                    }
                    // Set state to indicate data was received.
                    body = data;
                    finished = true;
                };
                // cleanup() is a utility closure that removes the <script> from the page and
                // the response callback from the window. This logic is used in both the
                // success, error, and cancellation paths, so it's extracted out for convenience.
                var cleanup = function () {
                    // Remove the <script> tag if it's still on the page.
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                    // Remove the response callback from the callbackMap (window object in the
                    // browser).
                    delete _this.callbackMap[callback];
                };
                // onLoad() is the success callback which runs after the response callback
                // if the JSONP script loads successfully. The event itself is unimportant.
                // If something went wrong, onLoad() may run without the response callback
                // having been invoked.
                var onLoad = function (event) {
                    // Do nothing if the request has been cancelled.
                    if (cancelled) {
                        return;
                    }
                    // Cleanup the page.
                    cleanup();
                    // Check whether the response callback has run.
                    if (!finished) {
                        // It hasn't, something went wrong with the request. Return an error via
                        // the Observable error path. All JSONP errors have status 0.
                        observer.error(new HttpErrorResponse({
                            url: url,
                            status: 0,
                            statusText: 'JSONP Error',
                            error: new Error(JSONP_ERR_NO_CALLBACK),
                        }));
                        return;
                    }
                    // Success. body either contains the response body or null if none was
                    // returned.
                    observer.next(new HttpResponse({
                        body: body,
                        status: 200,
                        statusText: 'OK', url: url,
                    }));
                    // Complete the stream, the response is over.
                    observer.complete();
                };
                // onError() is the error callback, which runs if the script returned generates
                // a Javascript error. It emits the error via the Observable error channel as
                // a HttpErrorResponse.
                var onError = function (error) {
                    // If the request was already cancelled, no need to emit anything.
                    if (cancelled) {
                        return;
                    }
                    cleanup();
                    // Wrap the error in a HttpErrorResponse.
                    observer.error(new HttpErrorResponse({
                        error: error,
                        status: 0,
                        statusText: 'JSONP Error', url: url,
                    }));
                };
                // Subscribe to both the success (load) and error events on the <script> tag,
                // and add it to the page.
                node.addEventListener('load', onLoad);
                node.addEventListener('error', onError);
                _this.document.body.appendChild(node);
                // The request has now been successfully sent.
                observer.next({ type: HttpEventType.Sent });
                // Cancellation handler.
                return function () {
                    // Track the cancellation so event listeners won't do anything even if already scheduled.
                    cancelled = true;
                    // Remove the event listeners so they won't run if the events later fire.
                    node.removeEventListener('load', onLoad);
                    node.removeEventListener('error', onError);
                    // And finally, clean up the page.
                    cleanup();
                };
            });
        };
        JsonpClientBackend = __decorate([
            core.Injectable(),
            __param(1, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [JsonpCallbackContext, Object])
        ], JsonpClientBackend);
        return JsonpClientBackend;
    }());
    /**
     * An `HttpInterceptor` which identifies requests with the method JSONP and
     * shifts them to the `JsonpClientBackend`.
     *
     * @publicApi
     */
    var JsonpInterceptor = /** @class */ (function () {
        function JsonpInterceptor(jsonp) {
            this.jsonp = jsonp;
        }
        JsonpInterceptor.prototype.intercept = function (req, next) {
            if (req.method === 'JSONP') {
                return this.jsonp.handle(req);
            }
            // Fall through for normal HTTP requests.
            return next.handle(req);
        };
        JsonpInterceptor = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [JsonpClientBackend])
        ], JsonpInterceptor);
        return JsonpInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSSI_PREFIX = /^\)\]\}',?\n/;
    /**
     * Determine an appropriate URL for the response, by checking either
     * XMLHttpRequest.responseURL or the X-Request-URL header.
     */
    function getResponseUrl(xhr) {
        if ('responseURL' in xhr && xhr.responseURL) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return null;
    }
    /**
     * A wrapper around the `XMLHttpRequest` constructor.
     *
     * @publicApi
     */
    var XhrFactory = /** @class */ (function () {
        function XhrFactory() {
        }
        return XhrFactory;
    }());
    /**
     * A factory for @{link HttpXhrBackend} that uses the `XMLHttpRequest` browser API.
     *
     *
     */
    var BrowserXhr = /** @class */ (function () {
        function BrowserXhr() {
        }
        BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
        BrowserXhr = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], BrowserXhr);
        return BrowserXhr;
    }());
    /**
     * An `HttpBackend` which uses the XMLHttpRequest API to send
     * requests to a backend server.
     *
     * @publicApi
     */
    var HttpXhrBackend = /** @class */ (function () {
        function HttpXhrBackend(xhrFactory) {
            this.xhrFactory = xhrFactory;
        }
        /**
         * Process a request and return a stream of response events.
         */
        HttpXhrBackend.prototype.handle = function (req) {
            var _this = this;
            // Quick check to give a better error message when a user attempts to use
            // HttpClient.jsonp() without installing the JsonpClientModule
            if (req.method === 'JSONP') {
                throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
            }
            // Everything happens on Observable subscription.
            return new Observable(function (observer) {
                // Start by setting up the XHR object with request method, URL, and withCredentials flag.
                var xhr = _this.xhrFactory.build();
                xhr.open(req.method, req.urlWithParams);
                if (!!req.withCredentials) {
                    xhr.withCredentials = true;
                }
                // Add all the requested headers.
                req.headers.forEach(function (name, values) { return xhr.setRequestHeader(name, values.join(',')); });
                // Add an Accept header if one isn't present already.
                if (!req.headers.has('Accept')) {
                    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
                }
                // Auto-detect the Content-Type header if one isn't present already.
                if (!req.headers.has('Content-Type')) {
                    var detectedType = req.detectContentTypeHeader();
                    // Sometimes Content-Type detection fails.
                    if (detectedType !== null) {
                        xhr.setRequestHeader('Content-Type', detectedType);
                    }
                }
                // Set the responseType if one was requested.
                if (req.responseType) {
                    var responseType = req.responseType.toLowerCase();
                    // JSON responses need to be processed as text. This is because if the server
                    // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                    // xhr.response will be null, and xhr.responseText cannot be accessed to
                    // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                    // is parsed by first requesting text and then applying JSON.parse.
                    xhr.responseType = ((responseType !== 'json') ? responseType : 'text');
                }
                // Serialize the request body if one is present. If not, this will be set to null.
                var reqBody = req.serializeBody();
                // If progress events are enabled, response headers will be delivered
                // in two events - the HttpHeaderResponse event and the full HttpResponse
                // event. However, since response headers don't change in between these
                // two events, it doesn't make sense to parse them twice. So headerResponse
                // caches the data extracted from the response whenever it's first parsed,
                // to ensure parsing isn't duplicated.
                var headerResponse = null;
                // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
                // state, and memoizes it into headerResponse.
                var partialFromXhr = function () {
                    if (headerResponse !== null) {
                        return headerResponse;
                    }
                    // Read status and normalize an IE9 bug (http://bugs.jquery.com/ticket/1450).
                    var status = xhr.status === 1223 ? 204 : xhr.status;
                    var statusText = xhr.statusText || 'OK';
                    // Parse headers from XMLHttpRequest - this step is lazy.
                    var headers = new HttpHeaders(xhr.getAllResponseHeaders());
                    // Read the response URL from the XMLHttpResponse instance and fall back on the
                    // request URL.
                    var url = getResponseUrl(xhr) || req.url;
                    // Construct the HttpHeaderResponse and memoize it.
                    headerResponse = new HttpHeaderResponse({ headers: headers, status: status, statusText: statusText, url: url });
                    return headerResponse;
                };
                // Next, a few closures are defined for the various events which XMLHttpRequest can
                // emit. This allows them to be unregistered as event listeners later.
                // First up is the load event, which represents a response being fully available.
                var onLoad = function () {
                    // Read response state from the memoized partial data.
                    var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url;
                    // The body will be read out if present.
                    var body = null;
                    if (status !== 204) {
                        // Use XMLHttpRequest.response if set, responseText otherwise.
                        body = (typeof xhr.response === 'undefined') ? xhr.responseText : xhr.response;
                    }
                    // Normalize another potential bug (this one comes from CORS).
                    if (status === 0) {
                        status = !!body ? 200 : 0;
                    }
                    // ok determines whether the response will be transmitted on the event or
                    // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                    // but a successful status code can still result in an error if the user
                    // asked for JSON data and the body cannot be parsed as such.
                    var ok = status >= 200 && status < 300;
                    // Check whether the body needs to be parsed as JSON (in many cases the browser
                    // will have done that already).
                    if (req.responseType === 'json' && typeof body === 'string') {
                        // Save the original body, before attempting XSSI prefix stripping.
                        var originalBody = body;
                        body = body.replace(XSSI_PREFIX, '');
                        try {
                            // Attempt the parse. If it fails, a parse error should be delivered to the user.
                            body = body !== '' ? JSON.parse(body) : null;
                        }
                        catch (error) {
                            // Since the JSON.parse failed, it's reasonable to assume this might not have been a
                            // JSON response. Restore the original body (including any XSSI prefix) to deliver
                            // a better error response.
                            body = originalBody;
                            // If this was an error request to begin with, leave it as a string, it probably
                            // just isn't JSON. Otherwise, deliver the parsing error to the user.
                            if (ok) {
                                // Even though the response status was 2xx, this is still an error.
                                ok = false;
                                // The parse error contains the text of the body that failed to parse.
                                body = { error: error, text: body };
                            }
                        }
                    }
                    if (ok) {
                        // A successful response is delivered on the event stream.
                        observer.next(new HttpResponse({
                            body: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                        // The full body has been received and delivered, no further events
                        // are possible. This request is complete.
                        observer.complete();
                    }
                    else {
                        // An unsuccessful request is delivered on the error channel.
                        observer.error(new HttpErrorResponse({
                            // The error in this case is the response body (error from the server).
                            error: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                    }
                };
                // The onError callback is called when something goes wrong at the network level.
                // Connection timeout, DNS error, offline, etc. These are actual errors, and are
                // transmitted on the error channel.
                var onError = function (error) {
                    var url = partialFromXhr().url;
                    var res = new HttpErrorResponse({
                        error: error,
                        status: xhr.status || 0,
                        statusText: xhr.statusText || 'Unknown Error',
                        url: url || undefined,
                    });
                    observer.error(res);
                };
                // The sentHeaders flag tracks whether the HttpResponseHeaders event
                // has been sent on the stream. This is necessary to track if progress
                // is enabled since the event will be sent on only the first download
                // progerss event.
                var sentHeaders = false;
                // The download progress event handler, which is only registered if
                // progress events are enabled.
                var onDownProgress = function (event) {
                    // Send the HttpResponseHeaders event if it hasn't been sent already.
                    if (!sentHeaders) {
                        observer.next(partialFromXhr());
                        sentHeaders = true;
                    }
                    // Start building the download progress event to deliver on the response
                    // event stream.
                    var progressEvent = {
                        type: HttpEventType.DownloadProgress,
                        loaded: event.loaded,
                    };
                    // Set the total number of bytes in the event if it's available.
                    if (event.lengthComputable) {
                        progressEvent.total = event.total;
                    }
                    // If the request was for text content and a partial response is
                    // available on XMLHttpRequest, include it in the progress event
                    // to allow for streaming reads.
                    if (req.responseType === 'text' && !!xhr.responseText) {
                        progressEvent.partialText = xhr.responseText;
                    }
                    // Finally, fire the event.
                    observer.next(progressEvent);
                };
                // The upload progress event handler, which is only registered if
                // progress events are enabled.
                var onUpProgress = function (event) {
                    // Upload progress events are simpler. Begin building the progress
                    // event.
                    var progress = {
                        type: HttpEventType.UploadProgress,
                        loaded: event.loaded,
                    };
                    // If the total number of bytes being uploaded is available, include
                    // it.
                    if (event.lengthComputable) {
                        progress.total = event.total;
                    }
                    // Send the event.
                    observer.next(progress);
                };
                // By default, register for load and error events.
                xhr.addEventListener('load', onLoad);
                xhr.addEventListener('error', onError);
                // Progress events are only enabled if requested.
                if (req.reportProgress) {
                    // Download progress is always enabled if requested.
                    xhr.addEventListener('progress', onDownProgress);
                    // Upload progress depends on whether there is a body to upload.
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.addEventListener('progress', onUpProgress);
                    }
                }
                // Fire the request, and notify the event stream that it was fired.
                xhr.send(reqBody);
                observer.next({ type: HttpEventType.Sent });
                // This is the return from the Observable function, which is the
                // request cancellation handler.
                return function () {
                    // On a cancellation, remove all registered event listeners.
                    xhr.removeEventListener('error', onError);
                    xhr.removeEventListener('load', onLoad);
                    if (req.reportProgress) {
                        xhr.removeEventListener('progress', onDownProgress);
                        if (reqBody !== null && xhr.upload) {
                            xhr.upload.removeEventListener('progress', onUpProgress);
                        }
                    }
                    // Finally, abort the in-flight request.
                    xhr.abort();
                };
            });
        };
        HttpXhrBackend = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [XhrFactory])
        ], HttpXhrBackend);
        return HttpXhrBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSRF_COOKIE_NAME = new core.InjectionToken('XSRF_COOKIE_NAME');
    var XSRF_HEADER_NAME = new core.InjectionToken('XSRF_HEADER_NAME');
    /**
     * Retrieves the current XSRF token to use with the next outgoing request.
     *
     * @publicApi
     */
    var HttpXsrfTokenExtractor = /** @class */ (function () {
        function HttpXsrfTokenExtractor() {
        }
        return HttpXsrfTokenExtractor;
    }());
    /**
     * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
     */
    var HttpXsrfCookieExtractor = /** @class */ (function () {
        function HttpXsrfCookieExtractor(doc, platform, cookieName) {
            this.doc = doc;
            this.platform = platform;
            this.cookieName = cookieName;
            this.lastCookieString = '';
            this.lastToken = null;
            /**
             * @internal for testing
             */
            this.parseCount = 0;
        }
        HttpXsrfCookieExtractor.prototype.getToken = function () {
            if (this.platform === 'server') {
                return null;
            }
            var cookieString = this.doc.cookie || '';
            if (cookieString !== this.lastCookieString) {
                this.parseCount++;
                this.lastToken = common["ɵparseCookieValue"](cookieString, this.cookieName);
                this.lastCookieString = cookieString;
            }
            return this.lastToken;
        };
        HttpXsrfCookieExtractor = __decorate([
            core.Injectable(),
            __param(0, core.Inject(common.DOCUMENT)), __param(1, core.Inject(core.PLATFORM_ID)),
            __param(2, core.Inject(XSRF_COOKIE_NAME)),
            __metadata("design:paramtypes", [Object, String, String])
        ], HttpXsrfCookieExtractor);
        return HttpXsrfCookieExtractor;
    }());
    /**
     * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
     */
    var HttpXsrfInterceptor = /** @class */ (function () {
        function HttpXsrfInterceptor(tokenService, headerName) {
            this.tokenService = tokenService;
            this.headerName = headerName;
        }
        HttpXsrfInterceptor.prototype.intercept = function (req, next) {
            var lcUrl = req.url.toLowerCase();
            // Skip both non-mutating requests and absolute URLs.
            // Non-mutating requests don't require a token, and absolute URLs require special handling
            // anyway as the cookie set
            // on our origin is not the same as the token expected by another origin.
            if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
                lcUrl.startsWith('https://')) {
                return next.handle(req);
            }
            var token = this.tokenService.getToken();
            // Be careful not to overwrite an existing header of the same name.
            if (token !== null && !req.headers.has(this.headerName)) {
                req = req.clone({ headers: req.headers.set(this.headerName, token) });
            }
            return next.handle(req);
        };
        HttpXsrfInterceptor = __decorate([
            core.Injectable(),
            __param(1, core.Inject(XSRF_HEADER_NAME)),
            __metadata("design:paramtypes", [HttpXsrfTokenExtractor, String])
        ], HttpXsrfInterceptor);
        return HttpXsrfInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An injectable `HttpHandler` that applies multiple interceptors
     * to a request before passing it to the given `HttpBackend`.
     *
     * The interceptors are loaded lazily from the injector, to allow
     * interceptors to themselves inject classes depending indirectly
     * on `HttpInterceptingHandler` itself.
     * @see `HttpInterceptor`
     */
    var HttpInterceptingHandler = /** @class */ (function () {
        function HttpInterceptingHandler(backend, injector) {
            this.backend = backend;
            this.injector = injector;
            this.chain = null;
        }
        HttpInterceptingHandler.prototype.handle = function (req) {
            if (this.chain === null) {
                var interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
                this.chain = interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, this.backend);
            }
            return this.chain.handle(req);
        };
        HttpInterceptingHandler = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [HttpBackend, core.Injector])
        ], HttpInterceptingHandler);
        return HttpInterceptingHandler;
    }());
    /**
     * Factory function that determines where to store JSONP callbacks.
     *
     * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
     * in test environments. In that case, callbacks are stored on an anonymous object instead.
     *
     *
     */
    function jsonpCallbackContext() {
        if (typeof window === 'object') {
            return window;
        }
        return {};
    }
    /**
     * Configures XSRF protection support for outgoing requests.
     *
     * For a server that supports a cookie-based XSRF protection system,
     * use directly to configure XSRF protection with the correct
     * cookie and header names.
     *
     * If no names are supplied, the default cookie name is `XSRF-TOKEN`
     * and the default header name is `X-XSRF-TOKEN`.
     *
     * @publicApi
     */
    var HttpClientXsrfModule = /** @class */ (function () {
        function HttpClientXsrfModule() {
        }
        HttpClientXsrfModule_1 = HttpClientXsrfModule;
        /**
         * Disable the default XSRF protection.
         */
        HttpClientXsrfModule.disable = function () {
            return {
                ngModule: HttpClientXsrfModule_1,
                providers: [
                    { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
                ],
            };
        };
        /**
         * Configure XSRF protection.
         * @param options An object that can specify either or both
         * cookie name or header name.
         * - Cookie name default is `XSRF-TOKEN`.
         * - Header name default is `X-XSRF-TOKEN`.
         *
         */
        HttpClientXsrfModule.withOptions = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: HttpClientXsrfModule_1,
                providers: [
                    options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                    options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
                ],
            };
        };
        var HttpClientXsrfModule_1;
        HttpClientXsrfModule = HttpClientXsrfModule_1 = __decorate([
            core.NgModule({
                providers: [
                    HttpXsrfInterceptor,
                    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                ],
            })
        ], HttpClientXsrfModule);
        return HttpClientXsrfModule;
    }());
    /**
     * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
     * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
     *
     * You can add interceptors to the chain behind `HttpClient` by binding them to the
     * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
     *
     * @publicApi
     */
    var HttpClientModule = /** @class */ (function () {
        function HttpClientModule() {
        }
        HttpClientModule = __decorate([
            core.NgModule({
                /**
                 * Optional configuration for XSRF protection.
                 */
                imports: [
                    HttpClientXsrfModule.withOptions({
                        cookieName: 'XSRF-TOKEN',
                        headerName: 'X-XSRF-TOKEN',
                    }),
                ],
                /**
                 * Configures the [dependency injector](guide/glossary#injector) where it is imported
                 * with supporting services for HTTP communications.
                 */
                providers: [
                    HttpClient,
                    { provide: HttpHandler, useClass: HttpInterceptingHandler },
                    HttpXhrBackend,
                    { provide: HttpBackend, useExisting: HttpXhrBackend },
                    BrowserXhr,
                    { provide: XhrFactory, useExisting: BrowserXhr },
                ],
            })
        ], HttpClientModule);
        return HttpClientModule;
    }());
    /**
     * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
     * with supporting services for JSONP.
     * Without this module, Jsonp requests reach the backend
     * with method JSONP, where they are rejected.
     *
     * You can add interceptors to the chain behind `HttpClient` by binding them to the
     * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
     *
     * @publicApi
     */
    var HttpClientJsonpModule = /** @class */ (function () {
        function HttpClientJsonpModule() {
        }
        HttpClientJsonpModule = __decorate([
            core.NgModule({
                providers: [
                    JsonpClientBackend,
                    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
                    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
                ],
            })
        ], HttpClientJsonpModule);
        return HttpClientJsonpModule;
    }());

    /**
     * The code was extracted from:
     * https://github.com/davidchambers/Base64.js
     */

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    function InvalidCharacterError(message) {
      this.message = message;
    }

    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    function polyfill (input) {
      var str = String(input).replace(/=+$/, '');
      if (str.length % 4 == 1) {
        throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = '';
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          // and if not first of each 4 characters,
          // convert the first 8 bits to one ascii character
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
      }
      return output;
    }


    var atob = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

    function b64DecodeUnicode(str) {
      return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = '0' + code;
        }
        return '%' + code;
      }));
    }

    var base64_url_decode = function(str) {
      var output = str.replace(/-/g, "+").replace(/_/g, "/");
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += "==";
          break;
        case 3:
          output += "=";
          break;
        default:
          throw "Illegal base64url string!";
      }

      try{
        return b64DecodeUnicode(output);
      } catch (err) {
        return atob(output);
      }
    };

    function InvalidTokenError(message) {
      this.message = message;
    }

    InvalidTokenError.prototype = new Error();
    InvalidTokenError.prototype.name = 'InvalidTokenError';

    var lib = function (token,options) {
      if (typeof token !== 'string') {
        throw new InvalidTokenError('Invalid token specified');
      }

      options = options || {};
      var pos = options.header === true ? 0 : 1;
      try {
        return JSON.parse(base64_url_decode(token.split('.')[pos]));
      } catch (e) {
        throw new InvalidTokenError('Invalid token specified: ' + e.message);
      }
    };

    var InvalidTokenError_1 = InvalidTokenError;
    lib.InvalidTokenError = InvalidTokenError_1;

    var _a;
    let AddonApiService = class AddonApiService {
        constructor(route, router, userService, httpClient) {
            this.route = route;
            this.router = router;
            this.userService = userService;
            this.httpClient = httpClient;
            this.isInDevMode = false;
            this.addonUUID = '';
            this.addonVersion = 'v1.0';
            this.accessToken = '';
            this.papiBaseURL = '';
            this.cdnBaseURL = 'cdn.staging.pepperi.com';
            this.localhostBaseURL = "http://localhost:4300";
            this.route.params.subscribe(params => {
                this.addonUUID = params.pluginID;
            });
            this.route.queryParams.subscribe(params => {
                this.isInDevMode = params['dev'] || false;
            });
            this.accessToken = this.userService.getUserToken();
            this.parsedToken = lib(this.accessToken);
            this.papiBaseURL = this.parsedToken['pepperi.baseUrl'];
        }
        getAddonApiBaseURL() {
            return this.isInDevMode ? this.localhostBaseURL : `${this.papiBaseURL}/addons/api/${this.addonUUID}`;
        }
        getAddonStaticFolderURL() {
            var baseURL = this.isInDevMode ? this.localhostBaseURL : this.cdnBaseURL;
            return `${baseURL}/Addon/Public/${this.addonUUID}/${this.addonVersion}/`;
        }
        get(url) {
            const options = {
                'headers': {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            };
            return this.httpClient.get(this.getAddonApiBaseURL() + url, options);
        }
    };
    AddonApiService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [router.ActivatedRoute,
            router.Router, typeof (_a = typeof pepperiUserService.UserService !== "undefined" && pepperiUserService.UserService) === "function" ? _a : Object, HttpClient])
    ], AddonApiService);

    var _a$1;
    let ApiTesterComponent = class ApiTesterComponent {
        constructor(translate, backendApiService, userService) {
            this.translate = translate;
            this.backendApiService = backendApiService;
            this.userService = userService;
        }
        ngOnInit() {
        }
        testEndpoint(endpoint) {
            const self = this;
            this.backendApiService.get(endpoint).subscribe((res) => {
                self.data = res;
                self.userService.setShowLoading(false);
            }, (error) => { }, () => self.userService.setShowLoading(false));
        }
    };
    ApiTesterComponent = __decorate([
        core.Component({
            selector: 'app-api-tester',
            template: `<div class="content"><mat-card><label class="lblTitle">{{ 'Test_Prompt_Title' | translate }}</label> <input class="pepperi-input spacing-bottom" mat-input type="text" [(ngModel)]="apiEndpoint"> <button type="button" class="btn pepperi-button mat-button strong color-main sm pull-right flip" (click)="testEndpoint(apiEndpoint)">{{ 'Submit_Btn_Title' | translate }}</button></mat-card><mat-card *ngIf="data"><pre>{{ data | json }}</pre></mat-card></div>`,
            styles: [`.content .mat-card{max-width:50%;display:grid;margin-bottom:.5rem}.content button{margin:1rem 0 0 0}.content button.back-button{margin-left:.5rem;margin-right:.5rem}.content button .mat-icon{vertical-align:middle}`]
        }),
        __metadata("design:paramtypes", [TranslateService,
            AddonApiService, typeof (_a$1 = typeof pepperiUserService.UserService !== "undefined" && pepperiUserService.UserService) === "function" ? _a$1 : Object])
    ], ApiTesterComponent);

    exports.PluginModule = class PluginModule {
    };
    exports.PluginModule = __decorate([
        core.NgModule({
            declarations: [
                PluginComponent,
                ApiTesterComponent
            ],
            imports: [
                common.CommonModule,
                HttpClientModule,
                material.MatTabsModule,
                material.MatIconModule,
                material.MatInputModule,
                material.MatCheckboxModule,
                material.MatFormFieldModule,
                material.MatDialogModule,
                material.MatCardModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [HttpClient, AddonApiService]
                    }
                }),
                forms.FormsModule,
                forms.ReactiveFormsModule,
                DynamicModule.withComponents([])
            ],
            exports: [],
            providers: [{
                    provide: 'plugins',
                    useValue: [{
                            name: 'plugin-component',
                            component: PluginComponent
                        }],
                    multi: true
                },
                AddonApiService
            ],
            entryComponents: [
                PluginComponent,
                DynamicComponent
            ]
        })
    ], exports.PluginModule);
    function createTranslateLoader(http, apiService, url = '') {
        if (!url) {
            url = apiService.getAddonStaticFolderURL();
        }
        return new TranslateHttpLoader(http, url, '.json');
    }

    Object.defineProperty(exports, '__esModule', { value: true });

})));
