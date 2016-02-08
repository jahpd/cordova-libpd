# cordova-libpd

Cordova plugin for interacting with [Pure Data](https://puredata.info/) patches. Allows for two way communication, sending and receiveing symbols, bangs and floats from and two the patches. 

### Instalation
First, install the plugin using cordova's CLI:
```sh
$ cordova plugin add https://github.com/velenoise/cordova-libpd
```

Then, link the [libpd](https://github.com/libpd/libpd) classes into the ios code of your project. Feel free to do it via source code or precompiled library. 

#### iOS specifics 
- If linking from source code, be sure not to add any of the ARM-related Pure Data source files. 
- Link the AudioToolbox and FoundationAV frameworks. 
- If you're using ARC, add the -fno-objc-arc flag to the libpd objective-c files in Project -> Build phases settings, like explained [here](https://github.com/libpd/libpd/issues/32)
- In your app Build Settings, under Other C Flags, add: 
    ```sh
    -DHAVE_UNISTD_H -DHAVE_ALLOCA_H -DUSEAPI_DUMMY -DPD -DLIBPD_EXTRA
    ````
    
### Usage
Use the `init` method to set the configuration of the PD patches. 
```javascript
/**
* @param {number} audiorate Sample rate of audio in Hz, eg. 44100
* @param {number} inChannels Number of audio input channels
* @param {number} outChannels Number of audio output channels
*/
Pd.init(44100, 2, 2, function () { console.log('Pd initialized'); }, function () { console.log('Error initializing'); });
```
To open a patch, call the `open` method. The path of the patch is relative to the www directory of your app. 
```javascript
/**
* @param {string} patch The path of the patch
*/
Pd.open('patches/example.pd', function () { console.log('Success'); }, function () { console.log('Error'); });
```
To start or stop processing the patch, call `processAudio` method
```javascript
/**
* @param {boolean} value Status of sound processing
*/
Pd.processAudio(true, function () { console.log('Success'); }, function () { console.log('Error'); });
```
To send information to the patch, use the `sendBang`, `sendFloat` and `sendSymbol` methods. 
```javascript
Pd.sendBang('bang-receiver');
Pd.sendFloat(10, 'float-receiver');
Pd.sendSymbol('test', 'symbol-receiver');
```
To start receiving information from the patch, first subscribe to the send objects you want to receive
```javascript
Pd.subscribe('from-pd', function () { console.log('Subscribed'); }, function () { console.log('Error subscribing'); });
```
Then override the Pd receive methods
```javascript
Pd.receiveBang = function (sender) { console.log('Received bang from ', sender); };
Pd.receiveFloat = function (sender, value) { console.log('Received float', value, 'from ', sender); };
Pd.receiveSymbol = function (sender, value) { console.log('Received symbol', value, 'from ', sender); };
```

### To-do
- Implement other command methods (close patch, send message...)
- Implement MIDI commands support 
- Develop Android binding
