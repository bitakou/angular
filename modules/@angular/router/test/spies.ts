import {Location} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {SpyObject, proxy} from '@angular/testing/testing_internal';

export class SpyRouter extends SpyObject {
  constructor() { super(Router); }
}

export class SpyRouterOutlet extends SpyObject {
  constructor() { super(RouterOutlet); }
}

export class SpyLocation extends SpyObject {
  constructor() { super(Location); }
}

export class SpyPlatformLocation extends SpyObject {
  pathname: string = null;
  search: string = null;
  hash: string = null;
  constructor() { super(SpyPlatformLocation); }
}