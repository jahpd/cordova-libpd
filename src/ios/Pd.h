#import <Cordova/CDVPlugin.h>
#import "PdAudioController.h"
#import "PdBase.h"

@class PdAudioController;

@interface Pd : CDVPlugin <PdReceiverDelegate> {
    PdAudioController *audioController;
}

- (void) init:(CDVInvokedUrlCommand*) command;

- (void) processAudio:(CDVInvokedUrlCommand*) command;

- (void) subscribe:(CDVInvokedUrlCommand*) command;

- (void) open:(CDVInvokedUrlCommand*) command;

- (void) sendBang:(CDVInvokedUrlCommand*) command;

- (void) sendSymbol:(CDVInvokedUrlCommand*) command;

- (void) sendFloat:(CDVInvokedUrlCommand*) command;

- (void) receiveBangFromSource:(NSString *)source;

- (void) receiveSymbol:(NSString *)symbol fromSource:(NSString *)source;

- (void) receiveFloat:(float)received fromSource:(NSString *)source;

@end
