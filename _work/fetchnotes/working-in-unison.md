---
title: Designing and Building the New Fetchnotes Web App
layout: work-item
image: fetchnotes-apps@2x.png
published: true
date: '2013-12-01T12:00:00-00:00'
when: December 2013
site: http://fetchnotes.com
excerpt: How to build a web app from scratch with code reuse, all in 21 days.
---

After spending the majority of mid-to-late 2013 on the Angular powered Trigger.io mobile app, I and another engineer took what we had learned and built to the web app. In 21 days in early December, we rebuilt the web app from the ground up to utilize code re-use between the two codebases, while also unifying the design language. 

I rapidly iterated over the course of a few days, working fast to adapting core ideas of our design language to this new context. 

![](/images/webapp-concept-1.png)
↑ I took the concept of notes as a feed of items to it's simplest implementation, a time-ordered list with new items flowing from the top.

![](/images/webapp-concept-2.png)
↑ I brought the clean lines, simple colors, and the levels of depth from the design style of the mobile app.

![](/images/webapp-concept-3.png)
↑ I took a forward looking step to incorporate new in-progress features into the conceptualization of the web app, to make sure the choices being made then could be flexible enough for the new work to come, like reminders and saved lists.

After doing rapid iterations to find the core of what we needed to build, I rendezvouz'd with my engineering partner, and we sat down to ship this out. He had been adapting mobile WebSQL code for use in the browser, and after that core model code was written, we collaborated on building out the page controllers and components. 

![](/images/web-app-1.png)

One of the core value propositions we worked around was building in smart analysis of note content to provide actionable content, services, and related information that was relevant to the content of the notes. One of the early parts of this smart content that we provided was Amazon previews for book notes. I took it upon myself to figure out how to make this content more attractive, and I took a page from Oyster books: they used an gradient overlay over a flat cover image to imitate the depth and look of a physical book.

After doing this, click rates on these smart recommendations jumped upwards of 50%: more engagement through good design.

![](/images/web-app-2.png)

Organization in Fetchnotes is completely dictated through hashtags; one of the things I wanted to add to the web app was a easier way to type out hashtags you've already used, just as we did in the existing mobile app. So, we took that code, adapted it and solved new problems brought on by the new context (like suggestion placement based on cursor position) and built it out for the web app.

![](/images/web-app-3.png)
