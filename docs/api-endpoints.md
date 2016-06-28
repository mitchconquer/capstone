# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Feeds

- `GET /api/feeds`
  - accepts `recommended` query param to list only recommended feeds by category
- `POST /api/feeds`
- `GET /api/feeds/:id`
- `PATCH /api/feeds/:id`
- `DELETE /api/feeds/:id`

### Feeds by Folder
- `GET /api/folders/:id/feeds` - get feeds by folder

### Saved Articles
- `GET /api/users/:id/articles`

### Folders

- `GET /api/folders`
- `POST /api/folders`
- `GET /api/folders/:id`
- `PATCH /api/folders/:id`
- `DELETE /api/folders/:id`
- `GET /api/folders/:id/feeds`
  - index of all feeds for a feed group