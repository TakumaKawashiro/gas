/*
 *  ggtk_gas-execution.js
 *  Update: 2018-05-08
 *  Version: 1.0.2
 *
 *  Copyright (c) 2018 Takuma Kawashiro
 *  This software is released under the MIT License.
 *  http://opensource.org/licenses/mit-license.php
 *
 *  -CONTACT-
 *    Twitter: @TakumaNitori
 *    Email: takuma.kawashiro.nitori@gmail.com
*/

_ggtkGasExecution = {};
_ggtkGasExecutionOnLoad = null;

class Gas {
  constructor(properties) {
    this.apiId = properties.apiId;
    this.clientId = properties.clientId;
    if(!properties.scopes) this.scopes = ["profile"];
    else this.scopes = properties.scopes;
  }

  static activate() {
    // CASE already called "gas.activate()" START
    if(_ggtkGasExecution.loading || _ggtkGasExecution.loaded) {
      return new Promise((resolve,reject)=>{
        reject(new Error("You can activete only a time: Google Client Script is already loaded or being loaded now."));
      });
    }
    // CASE already called "gas.activate()" END

    return new Promise(resolve=>{
      _ggtkGasExecution.loading = true;

      var script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js?onload=_ggtkGasExecutionOnLoad";
      _ggtkGasExecutionOnLoad = ()=>{
        _ggtkGasExecution.loading = false;
        _ggtkGasExecution.loaded = true;
        resolve();
      };

      document.addEventListener("DOMContentLoaded", ()=>{
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    });
  }

  activate () {
    return Gas.activate();
  }

  auth(isAuto) {
    // CASE have not called "gas.activate()" START
    if(!_ggtkGasExecution.loaded) {
      return new Promise((resolve,reject)=>{
        reject(new Error("You have not activated yet: Google Client Script is not loaded."));
      });
    }
    // CASE have not called "gas.activate()" END

    if(isAuto === undefined) isAuto = true; // DEFAULT: Auto Auth Mode
    return new Promise((resolve,reject)=>{
      gapi.auth.authorize({
        client_id: this.clientId,
        scope: this.scopes,
        immediate: isAuto
      }, (result)=>{
        if(result && !result.error) {
          _ggtkGasExecution.auth = true;
          resolve(result);
        }
        else reject(result);
      });
      if(!isAuto) return false;
    });
  }

  run(function_name, parameters) {
    // CASE have not called "gas.activate()" START
    if(!_ggtkGasExecution.loaded) {
      return new Promise((resolve,reject)=>{
        reject(new Error("You have not activated yet: Google Client Script is not loaded."));
      });
    }
    // CASE have not called "gas.activate()" END
    // CASE have not called "gas.auth()" START
    if(!_ggtkGasExecution.auth) {
      return new Promise((resolve,reject)=>{
        reject(new Error("You have not authorized yet: API authorization has not done."));
      });
    }
    // CASE have not called "gas.auth()" END
    // CASE [function_name] dose not exist START
    if(!function_name) {
      return new Promise((resolve, reject)=>{
        reject(new Error("Function name dose not exist."));
      });
    }
    // CASE [function_name] dose not exist END

    // CASE [parameters] dose not exist START
    if(!parameters) parameters = []; // DEFAULT: (No Parameters);
    // CASE [parameters] dose not exist END

    return new Promise((resolve,reject)=>{
      let request = gapi.client.request({
        root: 'https://script.googleapis.com',
        path: 'v1/scripts/' + this.apiId + ':run',
        method: 'POST',
        body: {
          function: function_name,
          parameters: parameters
        }
      });

      request.execute(resp=>{
        if(!resp.error) resolve(resp);
        else reject(resp);
      });
    });
  }
}
