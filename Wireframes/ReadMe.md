## Site Concept and Features

This is a single page RSS reader app.  I want to keep features simple so I can focus on the frontend.

## Pages / Views

* Edit Feeds
* Feed View
* Acount Settings

## Features for each Page

### Edit Feeds

A page with feed list on left some default feeds that you can click to choose to add to your feeds.  When you click, you can choose to add them to one or more feed groups.  There's also an option to add a custom feed.

#### Feed Group Pane (Far Left)

* Filter search at top
* All feeds option
* Feed groups
  * Able to add feed groups
  * Extra: Ideally able to drag feeds from one group to another
  * Extra: Able to rearrange feed groups

#### Feed Selection Pane (Rest of the screen)

* Grid of pre-added feeds
  * When click feed, can add to multiple feed groups
* Add custom feed button
  * Extra: Material Design style + button in lower right corner that when clicked expands to fill whole page with background color and have the form to add appear on it (something like this https://codyhouse.co/demo/rounded-animated-navigation/index.html#0)

### Feed View

The standard view for using the site.  Feed lists on the left, feed article index in the middle column and individual stories displayed in full on the right.

#### Feed Group Pane

(See above) 

#### Feed Pane

* Feed name displayed at top with logo
* Display all current items in the feed
* Connected with the main content view so that as user scrolls through infite scroll content window, current article is highlighted on left
* Items have indication on whether they've been read or not

#### Content Pane

* Top bar has next/last buttons
* Infinite scrolling to load up articles from Feed Pane
* Link to original source
* Extra: Will try to get full content if possible
* Extra: Able to share
* Extra: Able to comment

### Account Settings

A place to update account information

* Udpate account info
  * Profile pic
  * Email address
  * Password

## Goldplating Ideas

* Reading progress indicator filling up the corresponding feed link like a progress bar


