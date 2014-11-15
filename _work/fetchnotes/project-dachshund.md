---
title: Designing the new Fetchnotes iOS App
layout: work-item
image: fetchnotes-dachshund@2x.png
published: true
date: '2013-05-15T12:00:00-00:00'
when: May 2013 - November 2013
for: Fetchnotes
excerpt: ! Iterating, prototyping, and building to create a great mobile experience.
---

Designing a comprehensive visual style, designing new features, and adapting old features for a new context was the first challenge I undertook while at Fetchnotes, and helped shape my understanding on designing for a mobile experience. Throughout the process, I used Sketch and prototypes (in the form of in progress production code or entirely separate codebases) to guide and iterate on designs.

## Early concepts

I took my past experience with mobile design work and learned as much as possible about that state of iOS design at the time. Navigation patterns, interface guidelines, standard and experimental gestures, correct sizing and spacing of interface elements, and animation standards were all things I gobbled up and digested. In the process of that learning, I produced some early (and admittedly lacking) concepts on a visual style and design:

![](/images/DachshundOld1.png)
![](/images/DachshundOld2.png)
![](/images/DachshundOld3.png)

It was all too dark, too literal, with too much space devoted to unnecessary visual treatments (like the card style UITableView rows). I learned a lot about what was bad as well as what was good in these early days. I even got proficient in Sketch through this work, so there was a lot I gained in those first couple of weeks. Even in these concepts, I had some kernels of ideas and principles that I wanted to see grow later on: search as the major interface challenge and a sidebar to hold a notification activity feed.

## iOS 6 style initial design

All the work presented here was designed in the hallowed days of May 2013, about a month before WWDC2013 blew up the expectations and design language of old and replaced it with the philosophy we all now know so well with iOS 7.

I made a very conscious effort to understand the visual style of that iOS 6 world, and produced concepts that tried to expand that style with a (still in-progress) Fetchnotes identity. As something to be used by others, I made sure to take note and explain all the details thoroughly: layout, spacing, and all the states necessary to represent particular UI elements were communicated through these Sketch files and through design reviews I presented.

![](/images/DachshundComponents.png)

I worked to expand the concept of profiles in Fetchnotes; at the time, users were just represented by emails and usernames, and we wanted to expand the concept of sharing by making people have more fleshed out public identities. We also planned on tapping into the networks people used most to communicate personal productivity tasks.

![](/images/DachshundAuthFlow.png)

I designed the creation screen to make it easy to tag notes with categories, and to add people (in the form of users on Fetchnotes with usernames, and for people not on Fetchnotes through emails and phone numbers). It all had to feel as familiar as composing a tweet, while keeping in mind the different goals that producing a personal note vs a public tweet have.

![](/images/DachshundCreateScreen.png)

I produced and drew all the iconography in these concepts and in the final production application. As I was doing the front-end and asset work, I kept my workspace loose.

![](/images/DachshundIconography.png)

I set up on boarding flows on a canvas that I could show to others.

![](/images/DachshundOnboarding.png)

I designed the view note screen with the ideas of our smart recommendation system in the back of my mind. We needed to make sure that there was enough framing in place with out current recommendation capabilities (Amazon previews, link previews, etc) that we could easily expand that concept and functionality.

![](/images/DachshundViewScreen.png)

## Search

One of the things I worked hardest on was designing the experience for search in the mobile app. We knew from user testing and our own usage of the old application that search was painful in the past, and led to usability issues. For instance, with tag filtering, a user could select a tag (in what was a hidden sidebar menu) leave the app, and return with head filled with confusion about where there notes were. We simply weren't doing enough to have signposting and visual feedback about the filtered state of the app, and needed to radically rethink how we could make that experience better.

I was given the leeway to experiment and try all sorts of different iterations. Some stayed in Sketch, and some made it to an actual prototyping phase. I took these iterations daily to another designer and our CEO, and we kept chipping away at the problem with different approaches.

![](/images/DachshundSearch1.png)
![](/images/DachshundSearch2.png)
![](/images/DachshundSearch3.png)
![](/images/DachshundSearch4.png)
![](/images/DachshundSearch5.png)

And out of all this, we found a system of feedback (in the form of tag tokens above our note feed) and search paradigm of filtering and search in one place that satisfied our goals.

<div class="flex-2">
  <iframe src="//player.vimeo.com/video/111774678" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <iframe src="//player.vimeo.com/video/111774414" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

## Quickly changing course with iOS 7

iOS 7 was a large, rapid change, and I had to lead our design in a different direction after it's our announcement. I took a large design system, built with the assumptions and visual style of iOS 6 and examined how it all needed to change. Over the course of a week, I had rethought the visual language, reconsidered some iOS 7 incongruent animations and gestures, and got the ship back on course.

## Final production

To me, design isn't something that ends when you leave Sketch; it grows and changes as you're building and architecting a system, and adapts to shifting changes along the way. Throughout building Fetchnotes for iOS, I made sure the design was adapting as it needed to knew constraints, new challenges, and was in a position to be real and shippable.

Below are some videos of the final app in use.

### Tutorial

I really wanted to make sure that people who hit the tutorial felt compelled to complete it, while also learning as much as possible from each segment. I tried to achieve that by building a beautiful tutorial that used animation, transitions, and illustrations in a wonderful combination.

<iframe src="//player.vimeo.com/video/111774684" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Archiving and unarchiving

We wanted to provide the tools people needed to organize their notes, while also being able to dismiss and retrieve notes as they needed them. With the increased emphasis of sharing in this design, this was of utmost importance. We found taking a singular swipe to act on a note in a list felt simple and elegant and [we designed a system that made it simple to add those actions](/work/fetchnotes/the-final-experience-is-all-that-matters/).

<div class="flex-2">
  <iframe src="//player.vimeo.com/video/111805230" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <iframe src="//player.vimeo.com/video/111801715" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

### Sidebar and notifications

In this design, we wanted to make it simple to see and access newly shared notes you had received, while also trying to prevent a feeling of being overwhelmed. So, we made notifications accessible in the sidebar, easy to access but not always in your face with pings. 

<iframe src="//player.vimeo.com/video/111774682" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Sharing

Sharing was a major emphasis of this version of the app. We wanted to extend the ease and simplicity of simply typing someone's username prefaced with an `@` symbol to people not even signed up for Fetchnotes. We went through a long process of trying to determine a syntax for sharing with these non-users, and about how we would get the contact information for these users. Eventually, we came up with a system that tapped into your phone's address book to present suggestions as you type, and to allow you to share a note with someone via email or phone.

<iframe src="//player.vimeo.com/video/111774681" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

To be fair, this was an area of the app we found lacking, and the disappointment we had in this system helped fuel our next [take on sharing and collaborating with others](/work/fetchnotes/the-space-between-us/).

### Delight in simple actions

One of the things we strived to do was to make productivity an activity associated with positive emotions; you shouldn't feel stressed using our software. So, we made sure to add little touches that helped make the experience more fun and engaging.

I art directed our graphic design intern to design a film strip that I could animate using CSS animations (through `step` easings) and use as our loading animations. We implemented it in many places, including our pull-to-refresh and our initial note synchronization step:

<div class="flex-2">
  <iframe src="//player.vimeo.com/video/111774558" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  <iframe src="//player.vimeo.com/video/111774425" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

### Simple, compelling on boarding

We wanted to make on boarding an area where we could teach more of the benefits of our system, while also making it easy to login as an existing user, or create an account as a new one:

<iframe src="//player.vimeo.com/video/111774419" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Purposeful inviting

Inviting should have utility, and should be a fun interaction. As a business goal, we needed it to attract more users, and I made it my goal to be fun and non-spammy. I spent a few days creating illustrations for specific kinds of people in your life, people that you would find value having on Fetchnotes to collaborate with.

<iframe src="//player.vimeo.com/video/111774421" height="532" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
