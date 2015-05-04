'use strict';

/*globals Marionette, Jskeleton, _, Backbone */

/* jshint unused: false */

//## BaseApplication
//  BaseApplication Class that other `Jskeleton.Applications` can extend from.
//  It contains common application behavior as router/events initialization, application channels set up, common get methods...
Jskeleton.BaseApplication = Marionette.Application.extend({
    //Default global webapp channel for communicate with other apps
    globalChannel: 'global',
    constructor: function(options) {
        options = options || {};

        //generate application id
        this.aid = this.getAppId();

        this.router = Jskeleton.Router.getSingleton();

        Marionette.Application.prototype.constructor.apply(this, arguments);
    },
    //Call to the specified view-controller method for render a app state
    invokeViewControllerRender: function(routeObject, args, handlerName) {
        // var hook = this.getHook(),
        //Get the view controller instance
        var viewController = routeObject._viewController = this._getViewControllerInstance(routeObject);

        this.triggerMethod('onNavigate', viewController);
        // hook.processBefore();

        if (typeof viewController[handlerName] !== 'function') {
            throw new Error('El metodo ' + handlerName + ' del view controller no existe');
        }

        viewController[handlerName].call(viewController, args, this.service);
        this._showControllerView(viewController);
        // hook.processAfter();
    },
    //Show the controller view instance in the application region
    _showControllerView: function(controllerView) {
        if (this.mainRegion && this.mainRegion.currentView !== controllerView) {
            this.mainRegion.show(controllerView);
        } else {
            controllerView.render();
        }
    },
    //Factory method to instance objects from Class references
    factory: function(Class, options) {
        options = options || {};
        options.parentApp = this;
        return new Class(options);
    },
    //Internal method to create an application private channel and set the global channel
    _initChannel: function() {
        //backbone.radio
        this.globalChannel = this.globalChannel ? Backbone.Radio.channel(this.globalChannel) : Backbone.Radio.channel('global');
        this.privateChannel = this.privateChannel ? Backbone.Radio.channel(this.privateChannel) : Backbone.Radio.channel(this.aid);
    },
    //Add application routes  to the router and event handlers to the global channel
    _initRoutes: function() {
        var self = this;
        this._viewControllers = [];
        if (this.routes) {
            _.each(this.routes, function(routeObject, routeName) {
                routeObject = routeObject || {};
                //get view controller class object (it could be a view controller class asigned to the route or a default view controller if no class is specified)
                routeObject._ViewController = self._extendViewControllerClass(routeObject);

                //extend view controller class with d.i
                routeObject._viewControllerOptions = _.extend({
                    app: self,
                    channel: self.privateChannel,
                    service: self.service,
                    region: self.region
                }, routeObject.viewControllerOptions);

                //add the route handler to Jskeleton.Router
                self._addAppRoute(routeName, routeObject);
                //add the event handler to the app globalChannel
                self._addAppEventListener(routeName, routeObject);
            });
        }
    },
    //
    _addAppRoute: function(routeString, routeObject) {
        var self = this;

        this.router.route(routeString, {
            viewControllerHandler: true,
            triggerEvent: routeObject.triggerEvent,
            handlerName: routeObject.handlerName || this._getViewControllerHandlerName(routeString)
        }, function(args, handlerName) {
            self.invokeViewControllerRender(routeObject, args, handlerName);
        });
    },
    //Add listen to a global event changing the url with the event parameters and calling to the view-controller
    _addAppEventListener: function(routeString, routeObject) {
        if (routeObject.eventListener) {
            var self = this,
                handlerName = routeObject.handlerName || this._getViewControllerHandlerName(routeString);

            this.listenTo(this.globalChannel, routeObject.eventListener, function(args) {
                if (!routeObject.navigate) {
                    //update the url
                    self._navigateTo.call(self, routeString, routeObject, args);
                }

                self.invokeViewControllerRender(routeObject, args, handlerName);
            });
        }
    },
    //Update the url with the specified parameters
    _navigateTo: function(routeString, routeOptions, params) {
        var triggerValue = routeOptions.triggerNavigate === true ? true : false,
            processedRoute = this.router._replaceRouteString(routeString, params);

        this.router.navigate(processedRoute, {
            trigger: triggerValue
        });
    },
    //Internal method to retrieve the name of the view-controller method to call before render the view
    _getViewControllerHandlerName: function(routeString) {
        var handlerName = this.routes[routeString].handlerName || this.router._getHandlerNameFromRoute(routeString);

        if (!this.routes[routeString].handlerName) {
            //set the route handler name to the app route object
            this.routes[routeString].handlerName = handlerName;
        }

        return handlerName;
    },
    //Extend view controller class for inyect template dependency
    _extendViewControllerClass: function(options) {

        var template = options.template,
            ViewControllerClass = options.viewControllerClass || this.getDefaultviewController();

        if (!template) {
            throw new Error('Tienes que definir un template');
        }

        return ViewControllerClass.extend({
            template: template
        });

    },
    _removeViewController: function(routeObject, viewController) {
        if (routeObject._viewController === viewController) {
            routeObject._viewController = undefined;
        }
    },
    //Get a view controller instance (if no view controller is specified, a default view controller class is instantiated).
    //Ensure that don't extist a view-controller and if exist that it's not destroyed
    _getViewControllerInstance: function(routeObject) {
        var self = this,
            viewController = routeObject._viewController,
            ViewControllerClass = routeObject._ViewController,
            viewControllerOptions = routeObject._viewControllerOptions || {};

        if (!viewController || viewController.isDestroyed === true) {
            viewController = this.factory(ViewControllerClass, viewControllerOptions);
            this.listenTo(viewController, 'destroy', this._removeViewController.bind(this, routeObject, viewController));
        }

        return viewController;
    },
    //Attach application events to the global channel (triggers and listeners)
    _proxyEvents: function(options) {
        var events = options.events || this.events || {};

        this._proxyTriggerEvents(events.triggers);
        this._proxyListenEvents(events.listen);
    },
    //Attach trigger events:
    //Propagate internal events (application channel) into the global channel
    _proxyTriggerEvents: function(triggerArray) {
        var self = this;
        //Check if triggers are defined
        if (triggerArray && typeof triggerArray === 'object') {
            _.each(triggerArray, function(eventName) {
                //Listen to the event in the private channel
                self.listenTo(self.privateChannel, eventName, function() {
                    var args;
                    //if the event type is 'all', the first argument is the name of the event
                    if (eventName === 'all') {
                        eventName = arguments[0];
                        //casting arguments array-like object to array with excluding the eventName argument
                        args = [eventName].concat(Array.prototype.slice.call(arguments, 1));
                    } else {
                        //casting arguments array-like object to array
                        args = Array.prototype.slice.call(arguments);
                    }

                    //trigger the event throw the globalChannel
                    self.globalChannel.trigger.apply(self.globalChannel, [eventName].concat(args));
                });
            });

        }
    },
    //Attach Global events to the private channel:
    //Propagate external events (global channel) into the private channel
    _proxyListenEvents: function(listenObject) {
        var self = this;
        if (listenObject && typeof listenObject === 'object') {
            _.each(listenObject, function(eventName) {
                //Listen to that event in the global channel
                self.listenTo(self.globalChannel, eventName, function() {
                    var args;

                    //if the event is 'all' the first argument is the name of the event
                    if (eventName === 'all') {
                        eventName = arguments[0];
                        //casting arguments array-like object to array with excluding the eventName argument
                        args = [eventName].concat(Array.prototype.slice.call(arguments, 1));
                    } else {
                        //casting arguments array-like object to array
                        args = Array.prototype.slice.call(arguments);
                    }

                    //trigger the event throw the globalChannel
                    self.privateChannel.trigger.apply(self.privateChannel, [eventName].concat(args));
                });
            });
        }
    },
    start: function(options) {
        options = options || {};

        this._initCallbacks.run(options, this);

        //Add routes listeners to the Jskeleton.router
        this._initRoutes(options);

        //Add app proxy events
        this._proxyEvents(options);
    },
    //Get default application view-controller class if no controller is specified
    getDefaultviewController: function() {
        return Jskeleton.ViewController;
    },
    //Get default application layout class if no layoutClass is specified
    getDefaultLayoutClass: function() {
        return Marionette.LayoutView;
    },
    //Factory hook method
    getHook: function() {
        return new Jskeleton.Hook();
    },
    //Generate unique app id using underscore uniqueId method
    getAppId: function() {
        return _.uniqueId('a');
    }
});