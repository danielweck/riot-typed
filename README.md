# Why riot-typed

Write [riotjs](http://riotjs.com)  tags in a more oo-way with benefits of typescript

## How to use

### install

support typescript@2.4.2.

```sh
npm install -g typescript
npm install -g typings
```

```sh
npm install --save-dev riot-typed
```

install riot typed definitions

```sh
typings install -DG github:Joylei/riot-typed/src/riot.d.ts#8a4908142288357c6a24dc04233f9c8094025654
```

install riot-typed typed definitions

```sh
typings install -DG github:Joylei/riot-typed/src/riot-typed.d.ts#8a4908142288357c6a24dc04233f9c8094025654
```

### usage

let's define a tag

```js
//file: tags/app.ts
import {tag, Tag} from 'riot-typed';
@tag('app', '<h1>{title}</h1>')
class App extends Tag<any>{
  title:string;
  constructor(){
    this.title = 'Hello riot-typed!'
  }
}
```

let's mount the tag

```js
//file: main.ts
import * as riot from 'riot';
import 'tags/app';
riot.mount('app');
```

please see examples in the source code for more information.

## tag() decorator

tag(tagName: string, template: string | { template: string, css?: string, attrs?: string })

## restrictions

please see [riot.tag()](http://riotjs.com/api/#manual-construction) for restrictions.

## License

MIT
