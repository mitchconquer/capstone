# NewsFocus

> Aggregreater (working title...) is an RSS aggregretor that allows users to store feeds, organize them into groups and view and save content easily.

[Heroku link][heroku]

[heroku]: https://evening-inlet-45993.herokuapp.com/


## Minimum Viable Product

NewsFocus (working title...) is an RSS aggregretor that allows users to store feeds, organize them into groups and view and save content easily.

Handy reference for RSS XML documents: [W3.org Feed Validator][w3_validator]

- [X] Hosting on Heroku
- [X] New account creation, login, and guest/demo login
- [X] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [X] User Accounts
  - [X] Login / Logout
- [X] Feed Sources
  - [X] Select feeds from pre-existing recommendations and add to folders
  - [X] Add own RSS feeds and add to folders
  - [X] Browse feeds and keep track of viewed items
  - [X] Delete Feed Sources
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Folders
  - [X] Move feed source to different folder
  - [X] Organize feeds in folders
  - [X] Create and delete feed folders
  - [ ] Display unread count in each feed -- Not sure I want to do this.  I don't love the idea of making unreads seem like a task you have to copmlete.
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Mark feed_items as read/unread per user
- [X] Save feed_items to profile
- [X] Search feed_items
- [X] Add recommended and own custom feed sources
  - [X] Select a FeedSource from recommended FeedSources
  - [X] Add own custom feed source
- [X] Search codebase for TODO's for more
- [ ] Fix the bugs from Scott's review (notes in Gdox)
- [X] BUG: Disable Demo Login button on first click so users can't doubleclick
- [X] BUG: Some feed items still appearing out of order in feed feed item store

Bonus Items

- [ ] Make more obvious when feed sources are added to folders (especially from Explore)
- [ ] Load animations for feed items and feed item content
- [ ] Add image to feed source name
- [ ] FeedIndex shows the feed item that's curretnly in the view as active
- [ ] Animate dropdown menu
- [ ] Modal transition for new feed source forms
- [ ] Content is infinitely scrolling
- [ ] Drag and drop to rearrange feed items between folders
- [ ] Add refresh FeedSource button to FeedIndex
- [ ] Update profile information
- [ ] Save searches as tags to folder pane
- [ ] Get full content of article if possible
- [ ] Sign up via 3rd party website
- [ ] Browse other users' profile feeds
- [ ] Keyboard shortcuts
- [ ] Loading progress indicator

[w3_validator]: https://validator.w3.org/feed/docs/rss2.html

## Design Docs
* [Index Wireframes][index_view]
* [Feed Edit Wireframes][edit_view]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [--> Implementation Plans][implementation]

[index_view]: docs/wireframes/index.png
[edit_view]: docs/wireframes/edit-feeds.png
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md
[implementation]: docs/implementation_plans.md

## Used Libraries

* [Feedjira][feedjira_docs]

[feedjira_docs][http://www.rubydoc.info/github/feedjira/feedjira/Feedjira/Parser]

## Implementation Timeline

### Phase 1: Finish Capstone Planning and Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [X] Update and get approval of capstone project plans
- [X] create new project
- [X] create `User` model
- [X] authentication
- [X] user signup/signin pages
- [X] blank landing page after signin

### Phase 2: FeedSource Model, FeedItem Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

**Objective:** FeedSources can be created, read, edited and destroyed through
the API.

- [X] create `feed_source` model
- [X] create `feed_item` model
- [X] seed the database with a small amount of test data including demo/guest accounts
- [X] CRUD API for feed sources (`FeedSourcesController`)
- [X] API for marking feed_items read
- [X] jBuilder views for feed sources
- [X] setup Webpack & Flux scaffold
- [X] setup `APIUtil` to interact with the API
- [X] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** FeedSources can be created, read, edited and destroyed with the
user interface.

- [X] setup the flux loop with skeleton files
- [X] setup React Router
- [X] implement each feed component, building out the flux loop as needed.
  - [X] `FeedsIndex`
  - [X] `FeedIndexItem`
  - [X] `FeedForm`
- [X] save Feeds to the DB

### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [X] create a basic style guide
- [X] position elements on the page
- [X] setup structure of site frontend, just listing feeds where folders will go
- [X] add basic colors & styles

### Phase 5: Folders (1 day, W2 Tu 12pm)

**Objective:** FeedSources belong to Folders, and can be viewed by folder.

- [X] create `Folder` model
- build out API, Flux loop, and components for:
  - [X] Folder CRUD
  - [X] adding feeds requires a folder
  - [X] moving feeds to a different folder
  - [X] viewing feeds by folder
- Use CSS to style new views

### Phase 6: Save Articles (1 days, W2 Th 12pm)

**Objective:** Articles can be saved.

- [X] create `SavedArticle` model 
- build out API, Flux loop, and components for:
  - [X] fetching saved articles 
- [X] Style new elements UI

### Phase 7:  Search through FeedItems (0.5 days, W2 Th 6pm)

**objective:** Able to search (ie: filter) feed items

- [X] Add Search to filter through feed_items

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [X] Get feedback on my UI from others
- [X] Refactor HTML classes & CSS rules
- [X] Add modals, transitions, and other styling flourishes.
