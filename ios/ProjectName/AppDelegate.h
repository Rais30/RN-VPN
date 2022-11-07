#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNSimpleOpenvpn.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

 - (void)applicationWillTerminate:(UIApplication *)application
 {
   [RNSimpleOpenvpn dispose];
 }

@end
