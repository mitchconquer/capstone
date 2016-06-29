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
  - accepts `recommended` query param to list only recommended feeds by category
- `POST /api/feeds` - new feed source
- `GET /api/feeds/:id` 
- `PATCH /api/feeds/:id`
- `DELETE /api/feeds/:id`

### Feed Items
- `GET /api/feeds/:id/items` 
- `POST /api/items/markread` mark feed item read by current user
- `POST /api/items/markunread` mark feed item unread by current user

### Feeds by Folder
- `GET /api/folders/:id/feeds` - get feeds by folder

### Saved Feed Items
- `GET /api/users/:id/items` - all saved items
- `GET /api/users/:id/items/:id`
- `PATCH /api/users/:id/items/:id`
- `DELETE /api/users/:id/items/:id`

### Folders

- `GET /api/folders`
- `POST /api/folders`
- `GET /api/folders/:id`
- `PATCH /api/folders/:id`
- `DELETE /api/folders/:id`
- `GET /api/folders/:id/feeds`
  - index of all feeds for a feed group