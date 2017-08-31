// import "reflect-metadata";

import * as riot from "riot";

function registerTag(name: string, tmpl: string, css: string, attrs: string, target: Function) {
  riot.tag(name, tmpl, css, attrs, function (opts) {
    let obj = Object.create(target.prototype);
    let assign = (key, val?: any) => {
      let value = val || obj[key];
      this[key] = typeof value === 'function' ? value.bind(this) : value;
    };
    let init = obj.init;
    if(typeof init !== 'undefined'){
      obj.init = () => assign('init', init);// recovery original init function when mixin
    }
    for (let key in obj) {
      if (key !== 'init' && key !== 'constructor') {
        assign(key);
      }
    }
    this.mixin(obj);
    target.call(this, opts);//call constructor

    this.on('unmount', () => this.dispose());
  });
}

/**
* decorator on class that extends Tag.
* that defines a riot tag with template and the class.
* see riot.tag()
*/
export function tag(name: string, template: string | { template: string, css?: string, attrs?: string }): (target: Function)=>void {
  return function (target: Function) {
    // target is the constructor function
    if (typeof template === 'object') {
      registerTag(name, template.template, template.css, template.attrs, target)
    } else {
      registerTag(name, template, null, null, target)
    }
  }
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

    isMounted: boolean;

    /**
    * options passed in for Tag
    */
    opts: TOpts;

    /**
    * the root element that the Tag is mounted on
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
     * refs to HTML Element or riot tags
     */
    refs: {
      [refNameOnTheElementOrTag: string]: (HTMLElement | RiotTag | Array<HTMLElement | RiotTag>)
    };

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
