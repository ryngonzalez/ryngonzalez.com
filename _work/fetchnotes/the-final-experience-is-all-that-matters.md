---
title: Building Web Interfaces with Native-like Performance
layout: work-item
image: fetchnotes-performance@2x.png
published: true
date: '2013-10-01T12:00:00-00:00'
when: September 2013 - November 2013
excerpt: ! The struggles of building a fast, responsive interface for iOS with web technologies, and using tooling and analysis to find a solution.
---

You can check out the app on the App Store [here](https://itunes.apple.com/us/app/fetchnotes-shared-notes-reminders/id515765678?mt=8).

---

We built our mobile applications on the [Trigger.io](http://trigger.io) platform, which is a service that allows us to build UIWebView based applications that can tap into the Objective-C runtime with messaging and event hooks. A majority of the app was built with Angular, SASS, CoffeeScript, and native Objective-C plugins. I touched all parts of that stack: a majority of the time I spent writing controller logic and component code, while also diving into Objective-C when the standard API for the platform wasn't enough for our needs.

## Animations that don't break the illusion

As an application built on web technologies, we put a premium on replicating the level of experience someone gets with a native app. We wanted the fluidity, the iconographic language, the layout, and the gestures to all be present and executed to a T, with the same standards that all-native Cocoa applications strive to achieve.
