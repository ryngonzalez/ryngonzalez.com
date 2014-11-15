---
title: Natural Language Reminders for Fetchnotes
layout: work-item
image: fetchnotes-reminders@2x.png
published: true
date: '2014-01-01T12:00:00-00:00'
when: January 2014 - May 2014
for: Fetchnotes
excerpt: ! On building a cross-platform reminders service using natural language input, with a micro-service architecture.
---

I worked closely with another engineer over the first six months of 2014 to build a cross-platform reminders service that utilizes natural language parsing of time and dates to suggest reminders on notes, and allowed easy setting of reminders from scratch. I designed and built an interface to allow easy input of these natural language strings using many iterations of prototypes, OmniGraffle flows, and Sketch mockups. Helped build the Flask backend that powered the scheduled email reminders, helped design the syncing algorithms that allowed us to take micro-service approach (separate backend for our reminders system vs. building on top of our notes infrastructure) to expand our capabilities.

## Exploring all options

Early in January, I spent time trying to understand the space for reminders services, looking at all the competitors to understand how they were tackling the problem, what approaches caught my attention, and how Fetchnotes could take a novel approach to the area.

While doing this research, I took to Sketch and rapidly explored a whole suite of possibilities:

![](/images/RemindersOptions1.png)
![](/images/RemindersOptions2.png)
![](/images/RemindersOptions3.png)

We wanted to build something flexible and powerful, but a tool that could also scale down to less familar users. One idea that stuck to me was the idea of using natural language parsing to determine dates on a note.

## Making the content useful

Fetchnotes' big premise was that with the power of a machine learning backbone, we could easily provide targeted interfaces and services based on the understanding of the content that a user would put into the system. During the month I had started work on the reminders service, the company had started growing our machine learning capabilities (hiring two bright minds in the field who are now running their own [startup to tackle those ML problems](http://indico.io/)) and I became interested in the ways we could use that technology to make reminders powerful and easy to use.

Unfortunately, the timeline to have a working machine learning backbone was too far off into the future, and I needed to make sure the product development for reminders could continue without that wait. So, I explored alternatives, eventually taking the idea of doing the parsing on each client (web, iOS) rather than having to send it through our ML pipeline.

As our codebases were both built with web technologies, I tried to search for a solution that could be utilized on both the web app and iOS app, eventually finding the basis of our date parser in [`wanasit/chrono`](https://github.com/wanasit/chrono). It was hacky, based mostly on expression parsing rather than standard tokenization, classification and stemmers (like [`NaturalNode`](https://github.com/NaturalNode/natural) and the date parsing library I'm planning to write for it), but it was accurate and extensible enough for our needs, so we ran with it.

With the technology in place to move forward on the design, I took some time to refine and communicate our plans.

## Understanding Reminders

One of the things I did best while at Fetchnotes was to make sure design was used as tool to clarify communication, and using OmniGraffle to spatially layout and explain the processes of things was one of the ways I did that.

![](/images/RemindersFlow.png)

↑ Here, I explain the flow of the interface, providing notes and considerations at each step.

## Helping guide the architecture of the backend

I helped consult and understand the impact of attempting a micro-service architecture that decoupled the sync and reminder email task queue from the rest of our backend (notes, users, etc.) through the use of an RPC layer that allowed our reminders Flask server to ping for user authorization, note verification, and other miscellaneous tasks. We decided to do this to help loosen the transition costs we were anticipating (as we were planning to move our main notes infratructure to a different system in the near future) and to allow the main backend engineer and myself to build reminders independently and with speed.

We built our reminders service with Flask, Python, Celery + RabbitMQ (for scheduling emails), and MongoDB as our main datastore. 

## The power of natural language input

The easiest way to demonstrate how natural language date parsing helped enable different forms of interaction is through some videos demonstrating dictation and reminder recommendations based on the content of the note being saved, respectively:

<div class="flex-2">
  <iframe src="//player.vimeo.com/video/111774562" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <iframe src="//player.vimeo.com/video/111774563" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

During the construction process of the interface, I made a lot of refinements that helped bolster the visible interface for typing a natural language date. Using a side-scrolling list of dates and specific times, I made it simple for someone to easily communicate the time they wanted to set by combining options from each list.

Using natural language also allowed us to expand the range of input we could take in one interface. For example, we were able to parse out relative dates and times in the same space absolute times.

<iframe src="//player.vimeo.com/video/111774564" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Making it easy to reset a reminder

We added a way to defer and reset a reminder (to get another notification) later in the development process, and made sure it was super easy to set.

<iframe src="//player.vimeo.com/video/111774568" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Being transparent and clear about how to use reminders

We wanted to showcase and frame this big new feature to all our existing users in simple, interactive way, so I designed a small optional tutorial about reminders that they could use to play with a version of the interface, to understand how to use it in their day to day use of the product:

<iframe src="//player.vimeo.com/video/111774676" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Conclusion

Building reminders for Fetchnotes was exciting because of the opportunity I had to conceptualize, design, and build out a relatively novel interface for the problem we had at hand. It allowed me to stretch my mind considering possibilities and to help organize those possibilities into ideas that were easily communicable with my team and through the product itself.
