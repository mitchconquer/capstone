# Aggregreater

[Aggregreater live][heroku]

[heroku]: http://aggregreater.heroku.com

Aggregreater (like "feed aggregrator", but "greater") is a full-stack web application inspired by NewsBlur.  It is served by a Ruby on Rails API backend with PostgreSQL database and a React.js/Flux frontend.

## Features & Implementation

### Single-Page App

Aggregreater is single page app.  Authentication is handled both by React and Ruby on Rails to ensure users can see their content and that it is kept private.

### Feed Sources

RSS feeds (feed sources) can be added by users either from the button in the main menu or by exploring and added Aggregreater's recommended feed sources.

### Folders

Feeds are organized by folders.  Folders can be freely created and deleted by users and feeds can be easily moved between them by clicking the 'edit' pencil icon that appears when users mouse-over the feed source name.

Users can also view a version of all the feeds in a folder combined together in one feed stream by clicking the folder name.  This makes browsing by topic more convenient and is aided by the ability to filter.

### Feed Filtering

Users can filter articles by using the feed filter in the upper left hand corner of Aggregreater.  With each keypress, the app instantly starts filtering the feed stream to only show articles in which the title or body contain the filter query.

### Saved Articles

Users can save articles for future reference by clicking the 'save' pin icon that appears under the title of each article.  Saving the article will persist it in the database until the users unsaves it by clicking the 'save' pin again.

Aggregreater routinely deletes old articles that are no longer referenced by a feed source, however if a user left their screen hopened and saved the article even after the original feed item has been removed from the database, they will still be able to save the article as long as it's visible on their screen.

## Features to add

### Supplementing RSS-Provided Content

Use curl to grab more content from feed source websites where possible including more article content, pictures and icons to represent the feeds.

### UI Improvements

The content changes quite a bit as new feed items are loaded and it would be better to make these changes more obvious to the user when they are happening

### Drag-and-Drop Reordering

Users may have many feeds and keeping them organized would be more convenient if it were possible to drag and drop feed sources inside and between folders