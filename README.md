# FresherNote

[Heroku link][heroku]

[heroku]: https://radiant-hamlet-56535.herokuapp.com/

## Minimum Viable Product

NewsFocus (working title...) is an RSS aggregretor that allows users to store feeds, organize them into groups and view and save content easily.

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] User Accounts
  - [ ] Login / Logout
  - [ ] Update profile information
- [ ] Feeds
  - [ ] Organize feeds in groups
  - [ ] Select feeds from pre-existing recommendations and add to groups
  - [ ] Add own RSS feeds and add to groups
  - [ ] Browse feeds and keep track of viewed items
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Feed Groups
  - [ ] Create and delete feed groups
  - [ ] Move feeds between groups
  - [ ] Display unread count in each feed
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

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
- [ ] Save searches as tags to folder pane
- [ ] Drag and drop to rearrange feed items between folders

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
