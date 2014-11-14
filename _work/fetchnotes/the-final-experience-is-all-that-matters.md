---
title: Building Web Interfaces with Native-like Performance
layout: work-item
image: fetchnotes-performance@2x.png
published: true
date: '2013-10-01T12:00:00-00:00'
when: September 2013 - November 2013
for: Fetchnotes
excerpt: ! The struggles of building a fast, responsive interface for iOS with web technologies, and using tooling and analysis to find a solution.
---

You can check out the app on the App Store [here](https://itunes.apple.com/us/app/fetchnotes-shared-notes-reminders/id515765678?mt=8).

---

We built our mobile applications on the [Trigger.io](http://trigger.io) platform, which is a service that allows us to build UIWebView based applications that can tap into the Objective-C runtime with messaging and event hooks. A majority of the app was built with Angular, SASS, CoffeeScript, and native Objective-C plugins. I touched all parts of that stack: a majority of the time I spent writing controller logic and component code, while also diving into Objective-C when the standard API for the platform wasn't enough for our needs.

## Don't break the illusion

As an application built on web technologies, we put a premium on replicating the level of experience someone gets with a native app. We wanted the fluidity, the iconographic language, the layout, the attention to detail, and the gestures to all be present and executed to a T, with the same standards that all-native Cocoa applications strive to achieve. We wanted to build an app that accurately tracked your touches, responded seemlessly, and did the work necessary to maintain the illusion of a fully native iOS app.

This was certainly the hardest challenge we faced, but we managed it, learned a lot in the process, and produced what I think it still the best web-stack iOS app around.

## The Sidebar

Building the hamburger-menu/sidebar for the app was something definitely aided by the work of [@jakiestfu](http://github.com/jakiestfu) on GitHub with his [Snap.js library](https://github.com/jakiestfu/Snap.js/). But, to really achieve a smooth, iOS quality experience, I had to do some performance testing with some tools at hand (like the Chrome web inspector, while running our app in a browser) to figure out where frames where dropping, whether in JavaScript execution, JS VM garbage collector dumps, or an unnecessary DOM reflow. Some work even got [added back to the open source projects we relied on](https://github.com/jakiestfu/Snap.js/pull/124).

<iframe src="//player.vimeo.com/video/111774682" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

In the end, we were able to build a sidebar menu that tracked touches reponsively, used springy animations (hand-rolled CSS easing functions), and never dropped frames. 

## Swiping

One of the design choices we made was to make taking action on a note a simple as a non-stop swipe. All the actions on our list view are taken with this gesture, so we wanted to make sure we built a framework for these actions that would be extensible, performant, and customizable. Swiping needed to feel responsive to the touch that was guiding the action, and that was a core challenge we needed to solve.

I built out a loose framework with Angular, CSS animations, and HTML components to easily construct new actions on the screen. I made it simple to configure a destructive action (one that removes the note from the screen), a modal action (that return the note back in place, and opens up a modal), and a prompt, that allows you to make a potentially important action take an extra tap to confirm.

To make this animation as smooth and reliable as possible, we used CSS 3D transforms to do positioning changes (and avoid DOM reflows, keeping the changes strictly on the compositor and off the CPU). Then we used the [tween.js](https://github.com/sole/tween.js/) tweening library to interpolate and animate the notes after they had met a particular slide distance threshold. Finally, we used CSS 3D transform transitions on the subsequent siblings (the notes below the note being removed) to smoothly collapse the space being vacated.

<div class="flex-2">
  <iframe src="//player.vimeo.com/video/111805230" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <iframe src="//player.vimeo.com/video/111801715" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

## Lessons learned

Overall, the process we went through here shaped a lot of my knowledge on the state of web application interfaces, and helped us produce something we're proud of at Fetchnotes. Lessons include:

* avoid the reflows like the devil. If you need to modify positioning dynamically, always use CSS transforms.
* use your repaint loop iterations wisely: you want to be doing as little work as possible whenever the note is repainted. Basically, stick to transforms and other non-reflowing CSS changes like `background-color`, `opacity`, and others.
  * you want your loop iterations to be computed in at least `16ms`. Ideally an interface runs at 60 frames per second all the time, and to achieve that, you need to make sure each frame can be computed, rasterized, and displayed in that duration.
* use your tools wisely! Chrome web development tools have been improving at a rapid clip, and are worth learning inside and out. For interface work, the reflow and repaint charts are very helpful. Safari's tools are lagging behind, so if you really need to do some investigative work on Phonegap or Trigger applications, try setting up your project to be runnable via a server.
