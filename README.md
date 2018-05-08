Google Apps Script Execution Plugin
---
Software Version: 1.0.2 Update: 2018/05/08  
Document Version: 1.0.0 Update: 2018/05/08

## Description
---

When you run some function son Google Apps Script, you have to load Google API Script, set API key and Client key, authorize and... It makes you (and me) tired!!

This script enable you to execute and run functions on Google Apps Script easily form your Web Application.

## Browser
---

You can use this script only on specific browser, because this script using `Promise` and `Arrow Functions`.  
Please check [here](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [here](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/arrow_functions) before you use.


## How to Use
---

### 1. Load this script and activate.  
*You can also activate after created an instance by using `(GasInstance).activate();`*

~~~
<script src="https://takumakawashiro.github.io/gas/ggtk_gas-execution.js"></script>
or
<script src="YOUR_CUSTOM_DIRECTORY"></script>

and (optional)

<script>
  Gas.activate(); // Returns Promise
</script>
~~~

### 2. Create an instance.
I recommend you to create this as a global variable, because you use this instance to run some functions after you authorized.

~~~
gas = new Gas({
  apiId: "API ID",
  clientId: "CLIENT ID",
  scopes: ["scopes","scopes",...] // If your project does not require any scopes, you can ignore this.
});
~~~

If you have not done `Gas.activate();` in **1. Load this script and activate**, you have to activate.

~~~
gas.activate(); // Returns Promise
~~~

### 3. Authorize with this instance.

Authorize with the instance. If you activated with the instance, use `then()`.  
`auth()` returns `Promise`, so you can use `then()` and `catch()` to set callback.

~~~
gas.auth().then(function() {
  // on success
}).catch(function() {
  // on fail
});

// If you activated with the instance
gas.activate().then(function() {
  gas.auth()..then(function() {
    // on success
  }).catch(function() {
    // on fail
  });
});
~~~

There are 2 ways to authorize.  
One is authorize automatically. Any popup window doesn't displayed.  
Another way is authorize by users' action. Users have to allow your application to access their datas. When users use your application for the first time, your application have to use this way.

In order to switch the way of authorization, set argument when you call `auth()`.

~~~
// Authorize automatically (DEFAULT)
gas.auth(true);
or
gas.auth();

// Authorize by users' action
gas.auth(false);
~~~

### 4. Run a function

Now you can run your functions on your project. Use `run()` with the instance. `run()` returns `Promise`.
*You can run only after succeeded authorization.*

~~~
gas.run("function_name", [parameters]).then(function() {
  // on success
}).catch(function() {
  // on fail
});
~~~

## License
---
Copyright (c) 2018 Takuma Kawashiro

This software is released under the MIT License.  
[http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)

## Contact
---
Takuma Kawashiro  
Twitter: [@TakumaNitori](https://twitter.com/TakumaNitori)  
Email: [takuma.kawashiro.nitori@gmail.com](mailto:takuma.kawashiro.nitori@gmail.com)  
Language: Japanese, English
