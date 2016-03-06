// import "reflect-metadata";

import * as riot from "riot";


/**
* decorator on class that extends Tag.
* that defines a riot tag with template and the class
*/
export function tag(name: string, template: string) {
  return function(target: Function) {
    // target is the constructor function

    riot.tag(name, template, function(opts) {
      let obj = Object.create(target.prototype);
      let assign = (key, val?: any) =>{
        let value = val || obj[key];
        this[key] = typeof value === 'function' ? value.bind(this) : value;
      };
      let init = obj.init;
      obj.init = () => assign('init', init);// recovery original init function when mixin
      for (let key in obj) {
        if (key !== 'init' && key !== 'constructor') {
          assign(key);
        }
      }
      this.mixin(obj);
      target.call(this, opts);//call constructor

      this.on('unmount', () => this.dispose());
    });
  };
}

export namespace tag {
  /**
   riot tag
  */
  export class Tag<TOpts> implements RiotTag {

    /**
    * called when unmount
    */
    dispose() {

    }

    /**
    * options passed in for Tag
    */
    opts: TOpts;

    /**
    * the root element that the Tag is mounted
    */
    root: RiotHtmlElement;

    /**
    * parent Tag
    */
    parent: RiotTag;

    /**
    * child Tags
    */
    tags: { [tagNameOrNameOnTheTag: string]: (RiotTag | Array<RiotTag>) };

    /**
    * access html elements by name or id
    */
    [key: string]: RiotHtmlElement | RiotHtmlElement[]| any;

    /**
    * apply update on elements
    */
    update: (data?: any) => void;

    /**
    * umount Tag
    */
    unmount: {
      (): void;
      (keepTheParent: boolean): void;
    };

    mixin: (...mixins: Array<string | Object>) => void;

    /**
    * hook Tag life events:
    *   before-mount, mount, before-unmount, unmount, update, updated
    */
    on: (events: string, handler: Function) => this;

    /**
    * hook Tag life events but only will be triggered only once
    */
    one: (events: string, handler: Function) => this;

    /**
    * unhook Tag life events
    */
    off: (events: string, handler?: Function) => this;

    /**
    * trigger some events
    */
    trigger: (events: string, ...data: any[]) => this;
  }
}

export const Tag = tag.Tag;

export default tag;
