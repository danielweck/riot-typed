# Why riot-typed

Write [riotjs](http://riotjs.com)  tags in a more oo-way with benefits of typescript

## How to use

### install

```sh
npm install -g typings
```

```sh
npm install --save-dev riot-typed
```

install riot typed definitions (save as riot)

```sh
typings install --save riot=https://github.com/Joylei/riot-typed/tree/master/src/riot.d.ts
```

install riot-typed typed definitions (save as riot-typed)

```sh
typings install --save riot-typed=https://github.com/Joylei/riot-typed/tree/master/src/riot-typed.d.ts
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
