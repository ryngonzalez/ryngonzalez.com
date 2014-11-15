---
title: Designing and Building the New Fetchnotes Web App
layout: work-item
image: fetchnotes-apps@2x.png
published: true
date: '2013-12-01T12:00:00-00:00'
when: December 2013
site: http://fetchnotes.com
for: Fetchnotes
excerpt: Building a web app from scratch with code reuse, all in 21 days.
---

After spending the majority of mid-to-late 2013 on the Angular powered Trigger.io mobile app, I and another engineer took what we had learned and built to the web app. In 21 days in early December, we rebuilt the web app from the ground up to utilize code re-use between the two codebases, while also unifying the design language. 

---

## Designing with a tight feedback loop
I rapidly iterated on the design over the course of a few days, working fast to adapt core ideas of our design language to this new context. I sent over designs to our other designer/engineer many times each day, looking for eyes on the work as early as possible. 

After getting versions out on a fast-clip, I took those designs to CSS and HTML, prototyping interactions and animations to make sure the work was as effective in practice as it had been in the Sketch mockups.

![](/images/webapp-concept-1.png)
↑ I took the concept of notes as a feed of items to it's simplest implementation, a time-ordered list with new items flowing from the top.

![](/images/webapp-concept-2.png)
↑ I brought the clean lines, simple colors, and the levels of depth from the design language of the mobile app.

![](/images/webapp-concept-3.png)
↑ I took a forward looking step to incorporate new in-progress features into the conceptualization of the web app, to make sure the choices being made then could be flexible enough for the new work to come, like reminders and saved lists.

After doing a quick succession of iterations to find the core of what we needed to build, I rendezvoused with my engineering partner, and we sat down to build and ship this. While I had been designing, he had been adapting mobile WebSQL code for use in the browser, and after that core model code was written, we collaborated on building out the page controllers and components. 

---

![](/images/web-app-1.png)


## Using design details to drive engagement

One of the core value propositions we worked around was building in smart analysis of note content to provide actionable content, services, and related information that was relevant to the content of the notes. One of the early parts of this smart content that we provided was Amazon previews for book notes. I took it upon myself to figure out how to make this content more attractive, and I took a page from Oyster books: they used an gradient overlay over a flat cover image to imitate the depth and look of a physical book.

After doing this, click rates on these smart recommendations jumped upwards of 50%: more engagement through good design.

![](/images/web-app-2.png)

## Adapting iOS features to the web

Organization in Fetchnotes is completely dictated through hashtags; one of the things I wanted to add to the web app was a easier way to type out hashtags you've already used, just as we did in the existing mobile app. So, we took that code, adapted it and solved new problems brought on by the new context (like suggestion placement based on cursor position) and built it out for the web app.

![](/images/web-app-3.png)
