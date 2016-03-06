declare module 'riot-typed'{
  import * as riot from 'riot';

  /**
  * abstract Tag definition,
  * usage:
  *   import {tag, Tag} from 'riot-typed';
  *   @tag('app', '<h1>{title}</h1>')
  *   class App extends Tag<any>{
  *      title:string;
  *      constructor(){
  *          this.title = 'Hello riot-typed!'
  *      }
  *   }
  */
  export class Tag<TOpts> implements RiotTag {

      dispose();

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

  /**
  * decorator function on Tag class that help to register riot tags
  * usage:
  *   import {tag, Tag} from 'riot-typed';
  *   @tag('app', '<h1>{title}</h1>')
  *   class App extends Tag<any>{
  *      title:string;
  *      constructor(){
  *          this.title = 'Hello riot-typed!'
  *      }
  *   }
  */
  export var tag:{
    (tagName: string, template: string);
    Tag: {
      new<TOpts>():Tag<TOpts>
    }
  };

  export default tag;
}
