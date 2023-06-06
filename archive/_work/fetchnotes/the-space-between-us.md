---
title: Designing and Engineering Thready
layout: work-item
image: thready@2x.png
published: true
date: '2014-03-01T12:00:00-00:00'
when: March 2014 - November 2014
site: http://alpha.thready.com
for: Fetchnotes
excerpt: ! Learning from Fetchnotes, and building Thready to make collaboration as simple as sharing a notebook.
---

I worked on an overhaul of the sharing paradigm in Fetchnotes. Worked heavily in OmniGraffle, Quartz Composer and Sketch to identify approaches and design the mobile application experience of shared notebooks, and the implications of having shared a space where people can collaborate together on notes. 

## Concepts

We'd been having discussions for a while about changing the sharing paradigm of Fetchnotes, and I'd done a little bit of concept work to flesh out what that could look like.

![](/images/Thready/SpacesConcept1.png)

Immediately, I had honed in on the concept of these shared spaces as cards, and having the navigation (cards sliding up from the bottom of the screen) reflect that.

## Prototypes

I wanted to extend the design language present in Fetchnotes to a new paradigm of _places_ where you could put something and have it available for others in real time, where you could keep _notes_ (of text, checklists, images, files) and have them viewable and editable for others in that shared space. So, I spent a lot of time in Sketch and Quartz Composer trying to design novel interactions, while also making it simple to jump between spaces and work together with a small group. I wanted to see if my card metaphor could work as a real interaction.

<iframe src="//player.vimeo.com/video/111909802" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Digging in

In May, once my work on reminders was wrapping up, I started digging down and producing a comprehensive take on the shared spaces design. I considered all that existing states in Fetchnotes, all the new bits of interface and transitions, and brought it all together

![](/images/Thready/Spaces1.png)
![](/images/Thready/Spaces2.png)
![](/images/Thready/Spaces3.png)


## Understanding how it all fits together

Once I had a drawn all these screens and had a general direction and a clear design on how Fetchnotes could be rebuilt with this new sharing and organizational paradigm, I built a comprehensive map of how the app would be structured. I made it clear enough if you were a third party to jump in and understand how everything flows together. You can see the image below, or check out the OmniGraffle file [itself](https://www.dropbox.com/sh/l0sy0jd1e9h340d/AAB7aduYNEFXSNU1FWNPamXxa?dl=0).

![](/images/SpacesMap.png)

I even created a clickable InVision prototype to get a sense of how it would feel on device (open on your iOS device to get the full experience!). 

<iframe width="396" height="834" src="//invis.io/NV1P62B73" frameborder="0" allowfullscreen></iframe>

## Moving towards a separate app

The more we worked on the problem, the more we realized that splitting it to a separate app would make more sense: the use cases we imagined using did not overlap as it would need to for a singular app that handled both collaborative uses and personal ones.

So, I took to the drawing board and started producing more concepts, without the constraints that hewing closely to old Fetchnotes imposed:

![](/images/Thready/SpacesConcept2.png)
![](/images/Thready/SpacesList.png)
![](/images/Thready/ThreadyCards1.png)
![](/images/Thready/ThreadyCards2.png)
![](/images/Thready/ThreadyCards3.png)

## Moving towards the web

One thing we decided as business was to focus on more use cases that dictated usage on the desktop: work, small business, group organizing. We need to rethink our approach, and I was moved toward designing the service web-first.

![](/images/Thready/SpacesWebConcept1.png)
![](/images/Thready/SpacesWebConcept2.png)
![](/images/Thready/SpacesWebConcept3.png)

## Building it

We started work on taking these web concepts and producing a real app in late August. I built the interface using Angular components, SASS components ([and this handy style guidelines document I wrote](https://gist.github.com/ryngonzalez/c2a8aba799d9aa51b645)), with Node and Express on the server.

I built an activity stream and a notifications system using Redis lists to make sure fan-out could handle the throughput we'd be facing with a real time system like this. For these two features, I did it all from design, to interface implementation, and back-end API architecture.

![](/images/Thready/ThreadyActivity.png)
![](/images/Thready/ThreadyNotifications.png)

## Final product

The final product ended up looking like this.

![](/images/Thready/ThreadyList.png)
![](/images/Thready/ThreadyPost.png)
![](/images/Thready/ThreadySearch.png)

## Thready Instant

One thing that we tried working on at the tail-end of things was building a service for easily creating a thread and sharing it out to other without having to create an account.

![](/images/Thready/ThreadyInstant.png)

You can checkout my InVision prototype [here](http://invis.io/RN1LRVD9X).
