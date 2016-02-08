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
     * @param {string} receiver Name of the subscribed receiver
     * @param {string} value Value received
     */
    receiveSymbol: function (receiver, value) { console.log('symbol:', receiver, value); },
    
    /**
     * Template function to be called from native side when receiving bang
     * 
     * @param {string} receiver Name of the subscribed receiver
     */
    receiveBang: function (receiver, value) { console.log('bang:', receiver); },
    
    /**
     * Template function to be called from native side when receiving number
     * 
     * @param {string} receiver Name of the subscribed receiver
     * @param {number} value Value received
     */
    receiveNumber: function (receiver, value) { console.log('nuber:', receiver, value); }
};