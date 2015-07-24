---
layout: post
title: Optimizing OmniFocus
subtitle: GTD with OmniFocus
tags: [productivity, tech]
---

I recently switched from [Wunderlist][1] to [OmniFocus][2] as my task manager. Wunderlist was too simplistic for my needs; it was unable to do something simple like _repeat a task every Thursday_ which I thought was ridiculous. OmniFocus, on the other hand, is much more powerful, flexible, and customizable, but still maintains a clean design. I love continuously improving my tools and methods, so I quickly switched over.

# GTD + OmniFocus = <span class="pulse">&#9829;</span>
GTD, or Getting Things Done, is a time management methodology first coined by [David Allen][3]. GTD is a method for organizing your actions in a way that helps you achieve your long term goals. He thought about what gets us motivated to do the work we have to do. He realized that there were two key elements that made a task list motivating: it needs to be **short** and **relevant**. Short as in the task list must be _between 4 to 10 tasks_, and relevant as in the tasks must be _context and time specific_.

How I use the GTD methodology:

### 1. What are all the things I need to do?

Make it a habit to put in _everything_ on your mind into OmniFocus. Stuff that you need to get done now, stuff part of small projects, stuff part of big projects, and even long-term goals. Get it out of your head, and into your computer. They’re better at remembering things, and it will help you clear your mind.

### 2. Is it actionable?

Once or twice a day, go through each task in your inbox and ask yourself if it is actionable.  

- **NO:** *Eliminate* it if it is unnecessary, *file* it away if you need to archive it for future reference, or *incubate* it for some undefined time in the future.  

- **YES:** If the task is complex and needs to be split up into smaller actionable tasks, create a separate project list for it with the smaller tasks. Otherwise, assign the task to a Project or a Single Action List of similar actions.

### 3. What’s the next action?

Look at your task list, and determine what is the next action.  

- **If it takes less than 2 minutes**: Do it **now** and get it over with.
- **If it takes more than 2 minutes**: Give the task a Context (more below). If it is time-specific, add it to your calendar. If it cannot be done now, _Defer_ it to sometime in the future. There should only be up to 3 critically important tasks per day.

### 4. Weekly Review

Once a week, check how things are going. OmniFocus makes this much easier with the Review section. Do another brain dump during this time as well.

# OmniFocus Tips

Here are some tips for using OmniFocus more effectively for GTD:

1. **Use the keyboard shortcuts:** OmniFocus has keyboard shortcuts which can help you save time. Become familiar with them. Use `^⌥Space` for Quick Entry, and set up a Clippings shortcut (mine is `⌘⌥Space`). These keyboard shortcuts will help you more quickly get things out of your head and into your computer.

2. **Use Contexts effectively:** Contexts allow you to categorize actions by person, tool, or place necessary to carry out that action. I use `@!`(least important), `@!!`(semi-important), and `@!!!`(very important) Contexts to prioritize tasks. If you use OmniFocus for iPhone, you can also create location-based contexts which are extremely helpful. Don’t create too many Contexts that you will never use, though.  

3. **Use Perspectives effectively:** Perspectives allow you to filter and group your tasks in different ways. This is an extremely powerful.

4. **Use OmniFocus with Fantastical:** If you use Fantastical as your calendar application, you’re in luck.  You can use Fantastical to schedule tasks from OmniFocus simply by dragging them out of OmniFocus and into Fantastical. Fantastical links back to the OmniFocus application, and even adjusts the length of the event based on the estimated time set in OmniFocus. Try it out!

5. **Use IFTTT or Zapier to automate things:** [Zapier][4] and [IFTTT][5] can be used to automate many things in OmniFocus leveraging OmniFocus Mail Drop. They can connect with Evernote, GitHub, Slack, Trello, Basecamp, Gmail, Twitter, and hundreds more. For example: I use Pocket to bring webpages tagged “read” into OmniFocus.

6. **Use Siri to add items to your Inbox:** To enable reminder capture for OmniFocus on iOS:  
	- Open OmniFocus.  
	- Tap `Settings` from the bar on top.  
	- Tap `Reminders` in the Capture section.  
	- Tap `Allow Access` to Reminders on prompt.  
	- Toggle `Reminders Capture` on, and pick a list if you have multiple Reminders lists.  

	Now, all you need to say is _“Siri, Remember to …”_ and it will automatically be captured in your OmniFocus Inbox.

7. **Use AppleScript for scripting with OmniFocus:** AppleScript is a programming language that can be used to manipulate data and interface elements of supported applications on OS X. You can do so much with AppleScript. Here’s an example of launching a view (Today is a custom Perspective I made):

<br/>

{% highlight vim %}
tell application "OmniFocus"
  tell default document
    make new document window with properties {perspective name:”Today”}
    activate "OmniFocus"
  end tell
end tell
{% endhighlight %}


----

## Sources and further reading:
- [OmniFocus 2 Masterclass][6]
- [OmniFocus, GTD, and You][7]

[1]:	https://www.wunderlist.com/
[2]:	https://www.omnigroup.com/omnifocus
[3]:	https://en.wikipedia.org/wiki/David_Allen_(author)
[4]:	https://zapier.com/zapbook/omnifocus/
[5]:	https://ifttt.com/recipes/search?q=omnifocus&ac=false
[6]:	https://www.youtube.com/watch?v=wAPB-hBvcrY&list=PL_QDAYColR6MjM9zV8z_7UlZRZWt0jW3W
[7]:	http://downloads2.omnigroup.com/software/MacOSX/Extras/OmniFocus/GTDandOmniFocus.pdf
