# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

### Users

- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Feed Sources

- `GET /api/feeds` - all of current user's feed sources
- `GET /api/feeds/recommended` - only recommended feeds by category
- `POST /api/feeds` - new feed source
- `GET /api/feeds/:id` - Feed Source and all feed items (called by refreshFeedSource))
- `PATCH /api/feeds/:id`
- `DELETE /api/feeds/:id`

### Subscriptions
- `POST /api/folders/:folder_id/feeds/:feed_id` - Create subscription
- `DELETE /api/folders/:folder_id/feeds/:feed_id` - Delete subscription

### Feed Items
- `POST /api/items/read` mark feed item read by current user
- `POST /api/items/unread` mark feed item unread by current user

### Feeds by Folder
- `GET /api/folders/:id` - get feeds by folder

### Saved Feed Items
- `GET /api/saved_articles` - all saved items
- `GET /api/saved_articles/:id`
- `POST /api/saved_articles` - save new item (should be passed all info bec item may have been deleted from DB)
- `PATCH /api/saved_articles/:id`
- `DELETE /api/saved_articles/:id`

### Read Items
- `GET /api/read_items` - all read items
- `POST /api/read_items` - save new item (should be passed all info bec item may have been deleted from DB)
- `DELETE /api/read_items/:id`

### Folders

- `GET /api/folders`
- `POST /api/folders`
- `GET /api/folders/:id`
- `PATCH /api/folders/:id`
- `DELETE /api/folders/:id`
- `GET /api/folders/:id/feeds`
  - index of all feeds for a feed group