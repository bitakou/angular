import {ApplicationRef, Provider} from '@angular/core';
import {LocationStrategy, PathLocationStrategy, Location} from '@angular/common';
import {Router, RootRouter} from './router';
import {RouteRegistry, ROUTER_PRIMARY_COMPONENT} from './route_registry';
import {Type} from '@angular/facade';
import {BaseException} from '@angular/facade';

/**
 * The Platform agnostic ROUTER PROVIDERS
 */
export const ROUTER_PROVIDERS_COMMON: any[] = /*@ts2dart_const*/ ([
  RouteRegistry,
  /*@ts2dart_const*/ (new Provider(LocationStrategy, {useClass: PathLocationStrategy})),
  Location,
  /*@ts2dart_const*/ (
      new Provider(Router,
                   {
                     useFactory: routerFactory,
                     deps: /*@ts2dart_const*/ (
                         [RouteRegistry, Location, ROUTER_PRIMARY_COMPONENT, ApplicationRef])
                   })),
  /*@ts2dart_const*/ (new Provider(
      ROUTER_PRIMARY_COMPONENT,
      {useFactory: routerPrimaryComponentFactory, deps: /*@ts2dart_const*/ ([ApplicationRef])}))
]);

function routerFactory(registry: RouteRegistry, location: Location, primaryComponent: Type,
                       appRef: ApplicationRef): RootRouter {
  var rootRouter = new RootRouter(registry, location, primaryComponent);
  appRef.registerDisposeListener(() => rootRouter.dispose());
  return rootRouter;
}

function routerPrimaryComponentFactory(app: ApplicationRef): Type {
  if (app.componentTypes.length == 0) {
    throw new BaseException("Bootstrap at least one component before injecting Router.");
  }
  return app.componentTypes[0];
}
