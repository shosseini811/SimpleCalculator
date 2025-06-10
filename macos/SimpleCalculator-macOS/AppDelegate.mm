#import "AppDelegate.h"

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  // Create the main window
  NSRect screenSize = [[NSScreen mainScreen] frame];
  NSRect initialFrame = NSMakeRect(0, 0, 600, 600);
  initialFrame.origin.x = (screenSize.size.width - initialFrame.size.width) / 2;
  initialFrame.origin.y = (screenSize.size.height - initialFrame.size.height) / 2;
  
  NSWindow *window = [[NSWindow alloc] initWithContentRect:initialFrame
                                                styleMask:NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskMiniaturizable | NSWindowStyleMaskResizable
                                                  backing:NSBackingStoreBuffered
                                                    defer:NO];
  
  [window setTitle:@"SimpleCalculator"];
  [window makeKeyAndOrderFront:nil];
  
  // Keep a reference to the window
  self.window = window;
}

@end
