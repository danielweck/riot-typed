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
typings install -DG github:Joylei/riot-typed/src/riot.d.ts#2ca54b484694b133cbe6f58347242f6a1e273e17
```

install riot-typed typed definitions

```sh
typings install -DG github:Joylei/riot-typed/src/riot-typed.d.ts#2ca54b484694b133cbe6f58347242f6a1e273e17
```

### usage

let's define a tag

```ts
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

```ts
//file: main.ts
import 'tags/app';
riot.mount('app');
```

### override

It's possible to override definition properties: tmpl|attrs|css.

```ts
//file: logger.ts
import {tag, Tag} from 'riot-typed';

@tag('logger',{ tmpl: '<p class="color" each="{ item in logs }">{ item }</p>', css: '.color{color:gray;}' })
export default class Logger extends Tag<any>{
    logs: string[];

    constructor(){
        super();

        this.logs = ['line 1', 'line 2'];
    }
}
```

override css definition only:

```ts
//file: error-logger.ts
@tag('error-logger',{ css: 'error-logger .color{color:red;}' })
export default class ErrorLogger extends Logger{
    constructor(){
        super();

        this.logs.push('!!!Error!!!');
    }
}
```

### examples

please see [examples](https://github.com/Joylei/riot-typed-example) for more information.

## tag() decorator

tag(tagName: string, tmpl?: string | { tmpl?: string, css?: string, attrs?: string })

## restrictions

please see [riot.tag()](http://riotjs.com/api/#manual-construction) for restrictions.

## License

MIT
