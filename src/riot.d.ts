//Type definitions for riot 3.0+
//Project: riot
//Definitions by: joylei <https://github.com/Joylei>

declare interface RiotEvent extends Event {
  preventUpdate: boolean;
}

/**
* observable object;
*/
declare interface RiotObservable {
  /**
  * add event listeners.
  * - listen all events
  * el.on('*', callback)
  */
  on(events: string, handler: Function): this;

  /**
  * add event listeners that will be triggered only once
  */
  one(events: string, handler: Function): this;

  /**
  * remove event listeners.
  * - Removes the specific callback function called on all the events
  * el.off('*', callback)
  * - Removes all listeners from all event types.
  * el.off('*')
  */
  off(events: string, handler?: Function): this;

  /**
  * trigger a event by event names
  */
  trigger(events: string, ...data: any[]): this;
}

/**
* HTMLElement that riot tag mounted on
*/
declare interface RiotHtmlElement extends HTMLElement {
  /**
  * riot tag instance attached on current html element
  */
  _tag?: RiotTag;
}

declare interface RiotMixin{
  init?: (opts: any) => void
}

/**
* riot tag instance
*/
declare interface RiotTag extends RiotObservable {
  isMounted: boolean;
  /**
  * passed in options
  */
  opts: any;

  /**
  * the html element current tag instance attached on
  */
  root: RiotHtmlElement;

  /**
  * parent tag
  */
  parent?: RiotTag;

  /**
  * child tags
  */
  tags: { [tagNameOrNameOnTheTag: string]: (RiotTag | Array<RiotTag>) };

  /**
   * refs to HTML Element or riot tags
   */
  refs: {
    [refNameOnTheElementOrTag: string]: (HTMLElement | RiotTag | Array<HTMLElement | RiotTag>)
  }

  /**
  * apply update to trigger ui changes
  */
  update(data?: any): void;

  /**
  * unmount the tag
  */
  unmount(): void;

  /**
  * unmount the tag but keep the root element
  */
  unmount(keepTheParent: boolean): void;

  /**
  * mixin registered mixin object or given mixin object
  */
  mixin(...mixins: Array<string | RiotMixin>): void;
}

declare namespace riot {
  export const version: string;
  export const settings: {
    /**
     * A global Riot setting to customize the start and end tokens of the expressions.
     * default: { }
     * @type {string}
     */
    brackets: string;
    /**
     * default true
     * >= v3.2
     * @type {boolean}
     */
    skipAnonymousTags: boolean;
    /**
     * default true
     * >= v3.6
     * @type {boolean}
     */
    autoUpdate: boolean;
  };

  export const util: {
    tmpl: {
      (template: string, data?: any): void;
      errorHandler?: Function
    },

    misc: {
      extend(target: any, ...source: Array<any>): any;

      each(list: Array<any>, fn: Function): Array<any>;

      toCamel(str: string): string;

      startsWith(str: string, value: string): Boolean
    },

    tags: Array<RiotTag>
  }

  /**
  * make object observable or create a new observable object
  */
  export function observable(obj?: any): RiotObservable;

  /**
  * mount tags by selector, if element has data-is attribute or tagName of element is registered
  */
  export function mount(selector: string, opts?: any): RiotTag[];

  /**
  * mount specified tags by selector
  */
  export function mount(selector: string, tagName: string, opts?: any): RiotTag[];

  export function mount(element: HTMLElement, tagName: string, opts?: any): RiotTag[];

  export function tag(tagName: string, html: string, init?: (opts: any) => void): string;

  export function tag(tagName: string, html: string, css?: string, init?: (opts: any) => void): string;

  export function tag(tagName: string, html: string, css?: string, attrs?: string, init?: (opts: any) => void): string;

  /**
  * register named mixin object
  * usage:
  *   riot.mixin('namedMixin', mixinObj);
  *   ...
  *   <myTag>
  *       this.mixin('namedMixin');
  *   </myTag>
  */
  export function mixin(name: string, mixinObj: RiotMixin): void;

  /**
  * register global mixin object, so that all tags will mixin this object automatically
  * note: this function added since 2.3.16
  */
  export function mixin(mixinObj: RiotMixin): void;

  /**
  * force update all mounted riot tags
  */
  export function update(): RiotTag[];

  /**
   * unregister a tag definition
   *
   * @export
   * @param {String} tagName
   */
  export function unregister(tagName: String): void;

  /**
  * only work on nodejs
  * usage:
  *   timer = require('timer.tag');
  *   html = riot.render(timer, data);
  */
  export function render(tagText: string, data?: any): string;

  /**
  * Note: since riot@3.0.0, the exposed Tag class is actually not the base class for riot tags
  */
  export class Tag{
    constructor(el: HTMLElement, opts?: any)

    /**
     * tag name
     */
    name: string;

    tmpl: string;

    attrs: string;

    css: string;

    onCreate(opts: any): void;

    mount(): void;
  }
}

declare module "riot" {
  export = riot;
}
