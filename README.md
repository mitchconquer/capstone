# FresherNote

[Heroku link][heroku]

[heroku]: https://radiant-hamlet-56535.herokuapp.com/

## Minimum Viable Product

NewsFocus (working title...) is an RSS aggregretor that allows users to store feeds, organize them into groups and view and save content easily.

Handy reference for RSS XML documents: [W3.org Feed Validator][w3_validator]

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] User Accounts
  - [ ] Login / Logout
- [ ] Feed Sources
  - [ ] Select feeds from pre-existing recommendations and add to folders
  - [ ] Add own RSS feeds and add to folders
  - [ ] Browse feeds and keep track of viewed items
  - [ ] Delete Feed Sources
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Folders
  - [ ] Move feed source to different folder
  - [ ] Organize feeds in folders
  - [ ] Create and delete feed folders
  - [ ] Display unread count in each feed
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Mark feed_items as read/unread per user
- [ ] Save feed_items to profile
- [ ] Search feed_items
- [ ] Add recommended and own custom feed sources
  - [ ] Select a FeedSource from recommended FeedSources
  - [ ] Add own custom feed source

Bonus Items

- [ ] Load animations for feed items and feed item content
- [ ] FeedIndex shows the feed item that's curretnly in the view as active
- [ ] Modal transition for new feed source forms
- [ ] Content is infinitely scrolling
- [ ] Drag and drop to rearrange feed items between folders
- [ ] Add refresh FeedSource button to FeedIndex
- [ ] Update profile information
- [ ] Save searches as tags to folder pane
- [ ] Get full content of article if possible
- [ ] Sign up via 3rd party website
- [ ] Browse other users' profile feeds

[w3_validator]: https://validator.w3.org/feed/docs/rss2.html

## Design Docs
* [Index Wireframes][index_view]
* [Feed Edit Wireframes][edit_view]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[index_view]: docs/wireframes/index.png
[edit_view]: docs/wireframes/edit-feeds.png
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Feed Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `feed` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`FeedsController`)
- [ ] jBuilder views for feeds
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** Feeds can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `FeedsIndex`
  - [ ] `FeedIndexItem`
  - [ ] `FeedForm`
- [ ] save Feeds to the DB

### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Folders (1 day, W2 Tu 12pm)

**Objective:** Feeds belong to Folders, and can be viewed by folder.

- [ ] create `Folder` model
- build out API, Flux loop, and components for:
  - [ ] Folder CRUD
  - [ ] adding feeds requires a folder
  - [ ] moving feeds to a different folder
  - [ ] viewing feeds by folder
- Use CSS to style new views

Phase 3 adds organization to the Feeds. Feeds belong to a Folder,
which has its own `Index` view.

### Phase 6: Save Articles (1 days, W2 Th 12pm)

**Objective:** Articles can be saved.

- [ ] create `SavedArticle` model 
- build out API, Flux loop, and components for:
  - [ ] fetching tags for notebook
  - [ ] adding tags to notebook
  - [ ] creating tags while adding to notebooks
  - [ ] searching notebooks by tag
- [ ] Style new elements

### Phase 7: Animations for loading FeedItems (0.5 days, W2 Th 6pm)

**objective:** Load animations for feed items

- [ ] Add load animations for feed items

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Load animations for feed items and feed item content
- [ ] Save searches as tags to folder pane
- [ ] Browse other users' profile feeds
- [ ] Get full content of article if possible
- [ ] Drag and drop to rearrange feed items between folders
- [ ] Sign up via 3rd party website

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md

## Initital Loading

* If not logged in, show homepage
* if logged in, show AllFeedSources
  * UpdateAllFeeds
    * Initialize updatedFeedSourcesForServer object
    * Initialize udpatedFeedSources
    * Request user's feed_sources plus saved feed items from api
      (Could order feed_sources by number of user_read entries so you are
      getting the feeds the user reads the most first)
    * For each feed_source: Refresh Feed Source

## Refresh Feed Source

The gist is that when updating a feed source, the React app will create two Feed Source objects, a simplified one for the server and a complete one for the app.  The server will update its records for that feed source and return an object that has for that feed source that includes an array listing which feed_items have bene read already by that user.

React will send the complete Feed Source object to the update the store immediately.  The server will then update the store with the read_information only when it has it.

* Update FeedSource(feedSourceLink)
  * Instantiate storeUpdatedFeedSource object
  * Instantiate serverUpdatedFeedSource object
  * Get updated XML
  * Parse XML into POJO
    * Add XML channel.link to storeUpdatedFeedSource and serverUpdatedFeedSource
    * Add each XML item.guid to serverUpdatedFeedSource
    * Add title, link, description, author, guid, pubDate (set as blank if don't exist) to storeUpdatedFeedSource, nested under guid.  If guid doesn't exist, use link.
  * serverUpdatedFeedSource now looks like:
    { "http://www.lemonde.fr/rss/une.xml":
      {
        link: "http://www.lemonde.fr/rss/une.xml", 
        feed_items: 
          [
           "http://www.lemonde.fr/tiny/4959221/",
           "http://www.lemonde.fr/tiny/4959075/",
           "http://www.lemonde.fr/tiny/4959257/"
          ]
      }
    }
    * All data is nested under the unique identitifier for that feedSource (the <channel><link></channel><link>)
      * Feed items is an array that's stored under the feed_items key
  * storeUpdatedFeedSource now looks like:
   { "http://www.lemonde.fr/rss/une.xml": 
    {
     title: "Le Monde.fr - Actualité à la Une",
     link: "http://www.lemonde.fr/rss/une.xml",
     feed_items: 
       [
        {guid: "http://www.lemonde.fr/tiny/4959221/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
        {guid: "http://www.lemonde.fr/tiny/4959075/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
        {guid: "http://www.lemonde.fr/tiny/4959257/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."}
       ],
      read: []
    }
   }
    * All data is nested under the unique identitifier for that feedSource (the <channel><link></channel><link>)
    * Channel information is top level in the nested object
    * Feed items is an array that's stored under the feed_items key.
      * Feed items includes title, link, guid, description, pubDate, author
  * Server: FeedActions.updateServerFeedSource(serverUpdatedFeedSource) is called with callback ServerActions.receiveReadFeedItems
    * WebApiUtils.updateServerFeedSource(serverUpdatedFeedSource, ServerActions.receiveReadFeedItems)
    * Server returns object that includes sources that have been read with source guid as key
      { "http://www.lemonde.fr/rss/une.xml": {
          read: [
            "http://www.lemonde.fr/tiny/4959075/",
            "http://www.lemonde.fr/tiny/4959257/" ],
          folder_id: 39
        }
      }
      * At this time, server should update feed_items, deleting entries that are no longer included
    * ServerActions.receiveReadFeedItems(readFeedItems) will send actionType "RECEIVE_READ_FEED_ITEMS"
    * Store will update the "read" properties of each affected feedSource and __emitChange()
  * Client: FeedActions.updateStoreFeedSource(storeUpdatedFeedSource) is invoked to create actionType "RECEIVE_FEED_SOURCES"
    * Store will update the _feeds with the new info or add the feed if it's not yet in the store
    * Store will __emitChange()

## Mark FeedItem as read per user

* Triggered by feedItem onClick
* FeedActions.markRead({ feedSourceIdentifier: feedItemIdentitier }) 
* WebApiUtils.markRead({ feedSourceIdentifier: feedItemIdentitier }, ServerActions.markRead)
  * Creates action with actionType "RECEIVE_READ_FEED_ITEM" with { feedSourceIdentifier: { read: [ feedItemIdentifier ]}}
* FeedStore pushes new read feedItemIdentifier to read array of feedSourceIdentifier in _feeds and emits change

## Save FeedItem to profile

* Triggered by FeedItemDetails "save" button onClick
* FeedActions.saveItem(feedItem)
  * feedItem is object with all data about feedItem
  * {feedSourceIdentifier:
        {guid: "http://www.lemonde.fr/tiny/4959221/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
    }
* WebApiUtils.saveItem({ feedSourceIdentifier: feedItemIdentitier }, ServerActions.saveItem)
* ServerActions.saveItem will create actionType "RECEIVE_SAVED_ITEM" with savedItem
* FeedStore will push the savedItem to the savedItems

## Update Feed Source (Including delete or change folder)

* Triggered by FeedSourceForm onSubmit
* FeedActions.updateFeedSource(feedSource)
* WebApiUtils.updateFeedSource(feedSource, ServerActions.updateFeedSource)
* ServerActions.updateFeedSource(feedSource)
  * actionType: UPDATE_FEED_SOURCE
  * feedSource: feedSource
* FeedStore's UPDATE_FEED_SOURCE will update just that item and emit change

## Search feed items ???
* Triggered by onChange in Search component

Server has:

feed_sources
  * id
  * title
  * url
  * image link?
feed_items
  * id
  * feed_source_id
  * guid
folders
  * id
  * user_id
  * title
subscriptions
  * id
  * user_id
  * folder_id
  * feed_source_id
user_read
  * id
  * user_id
  * feed_item_id
saved_items
  * id
  * user_id
  * feed_item_id