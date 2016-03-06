Why riot-typed
==============
Write [riotjs](http://riotjs.com)  tags in a more oo-way with benefits of typescript

How to use
==========
install
-------
```
npm install -g typings
```

```
npm install --save-dev https://github.com/Joylei/riot-typed.git
```

```
typings install https://github.com/Joylei/riot-typed/src/riot.d.ts
```

```
typings install https://github.com/Joylei/riot-typed/src/riot-typed.d.ts
```
usage
------

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

Contact
=======
Feel free to contact me: leingliu#gmail.com
