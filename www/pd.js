module.exports = {
    /**
     * Initialize pd with given audiorate and channels
     *
     * @param {number} audiorate Sample rate of audio in Hz, eg. 44100
     * @param {number} inChannels Number of audio input channels
     * @param {number} outChannels Number of audio output channels
     */
    init: function (audiorate, inChannels, outChannels, success, failure)
    {
        cordova.exec(success, failure, "Pd", "init", [audiorate, inChannels, outChannels]);
    },
    
    /**
     * Opens a patch
     *
     * @param {string} patch The patch path
     */
    open: function (patch, success, failure)
    {
        cordova.exec(success, failure, "Pd", "open", [patch]);
    },
    
    /**
     * Subscribes to a send object
     *
     * @param {string} sender The name of the send object to subscribe to
     */
    subscribe: function (sender, success, failure)
    {
        cordova.exec(success, failure, "Pd", "subscribe", [sender]);
    },
    
    /**
     * Turns audio processing on / off
     *
     * @param {boolean} value Status of sound processing
     */
    processAudio: function (value, success, failure)
    {
        cordova.exec(success, failure, "Pd", "processAudio", [value]);
    },
    
    /**
     * Sends bang to pd receiver
     * 
     * @param {string} receiver Receiver name
     */
    sendBang: function (receiver, success, failure)
    {
        cordova.exec(success, failure, "Pd", "sendBang", [receiver]);
    },
    
    /**
     * Sends symbol to pd receiver
     * 
     * @param {string} symbol Symbol to be sent
     * @param {string} receiver Receiver name
     */
    sendSymbol: function (symbol, receiver, success, failure)
    {
        cordova.exec(success, failure, "Pd", "sendSymbol", [symbol, receiver]);
    },
    
    /**
     * Template function to be called from native side when receiving symbol
     * 
     * @param {string} sender Name of the subscribed receiver
     * @param {string} value Value received
     */
    receiveSymbol: function (sender, value) { console.log('symbol:', sender, value); },
    
    /**
     * Template function to be called from native side when receiving bang
     * 
     * @param {string} sender Name of the subscribed receiver
     */
    receiveBang: function (sender, value) { console.log('bang:', sender); },
    
    /**
     * Template function to be called from native side when receiving number
     * 
     * @param {string} sender Name of the subscribed receiver
     * @param {number} value Value received
     */
    receiveNumber: function (sender, value) { console.log('nuber:', sender, value); }
};