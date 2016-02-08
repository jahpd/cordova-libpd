#import "Pd.h"
#import "PdAudioController.h"

#import <Cordova/CDVPluginResult.h>

@interface Pd()

@property (nonatomic, retain) PdAudioController *audioController;

@end

@implementation Pd {}

@synthesize audioController = audioController_;

- (void) init:(CDVInvokedUrlCommand*) command;
{
    self.audioController = [[PdAudioController alloc] init];
    
    PdAudioStatus status = [self.audioController configurePlaybackWithSampleRate:(int)[[command.arguments objectAtIndex:0] integerValue] numberChannels:(int)[[command.arguments objectAtIndex:1] integerValue] inputEnabled:YES mixingEnabled:YES];
    
    if (status == PdAudioError)
    {
        NSLog(@"Error configuring controller");
    }
    else
    {
        NSLog(@"Configuration ok");
    }
    
    [PdBase setDelegate:self];
    
    NSLog(@"pd init");
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) processAudio:(CDVInvokedUrlCommand *)command
{
    self.audioController.active = [[command.arguments objectAtIndex:0] boolValue];
    [PdBase computeAudio:[[command.arguments objectAtIndex:0] boolValue]];
    
    NSLog(@"pd process audio");
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) subscribe:(CDVInvokedUrlCommand*) command;
{
    NSLog(@"Subscribe: %@", [command.arguments objectAtIndex:0]);
    [PdBase subscribe:[command.arguments objectAtIndex:0]];
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) open:(CDVInvokedUrlCommand*) command;
{
    NSLog(@"Open file: %@", [command.arguments objectAtIndex:0]);
    [PdBase openFile:[command.arguments objectAtIndex:0] path:[NSString stringWithFormat:@"%@/www/", [[NSBundle mainBundle] bundlePath]]];
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) sendBang:(CDVInvokedUrlCommand*) command;
{
    [PdBase sendBangToReceiver:[command.arguments objectAtIndex:0]];
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) sendSymbol:(CDVInvokedUrlCommand *)command
{
    [PdBase sendSymbol:[command.arguments objectAtIndex:0] toReceiver:[command.arguments objectAtIndex:1]];
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) sendFloat:(CDVInvokedUrlCommand *)command
{
    [PdBase sendFloat:[[command.arguments objectAtIndex:0] floatValue] toReceiver:[command.arguments objectAtIndex:1]];
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) receiveBangFromSource:(NSString *)source
{
    NSString *js = [NSString stringWithFormat:@"window.Pd.receiveBang(\"%@\");", source];
    
    [self.webView stringByEvaluatingJavaScriptFromString:js];
}

- (void) receiveSymbol:(NSString *)symbol fromSource:(NSString *)source
{
    NSLog(@"Symbol received: %@", symbol);
    NSString *js = [NSString stringWithFormat:@"window.Pd.receiveSymbol(\"%@\", \"%@\");", source, symbol];
    
    [self.webView stringByEvaluatingJavaScriptFromString:js];
}

- (void) receiveFloat:(float)received fromSource:(NSString *)source
{
    NSLog(@"Float received: %f", received);
    NSString *js = [NSString stringWithFormat:@"window.Pd.receiveFloat(\"%@\", %f);", source, received];
    
    [self.webView stringByEvaluatingJavaScriptFromString:js];
}

@end
