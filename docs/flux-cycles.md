# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Feed Cycles

### Feeds API Request Actions

* `fetchAllFeeds`
  0. invoked from `FolderIndex` `didMount`/`willReceiveProps`
  0. `GET /api/feeds` is called.
  0. `receiveAllFolders` is set as the callback.

* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/feeds` is called.
  0. `receiveSingleNote` is set as the callback.

* `fetchSingleNote`
  0. invoked from `NoteDetail` `didMount`/`willReceiveProps`
  0. `GET /api/feeds/:id` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateNote`
  0. invoked from `FeedItemForm` `` (when receives new feed)
  0. `POST /api/feeds` is called
  0. `receiveSingleNote` is set as the callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/feeds/:id` is called.
  0. `removeNote` is set as the callback.

### Feeds API Response Actions

* `receiveAllFeeds`
  0. invoked from an API callback.
  0. `Feed` store updates `_feeds` and emits change.

* `receiveSingleFeed`
  0. invoked from an API callback.
  0. `Feed` store updates `_feeds[id]` and emits change.

* `removeFeed`
  0. invoked from an API callback.
  0. `Feed` store removes `_feeds[id]` and emits change.

### Store Listeners

* `FeedArticleIndex` component listens to `_feed` store.

## Folders Cycles

### Folders API Request Actions

* `fetchAllFolders`
  0. invoked from `FoldersIndex` `didMount`/`willReceiveProps`
  0. `GET /api/folders` is called.
  0. `receiveAllFolders` is set as the callback.

* `createFolder`
  0. invoked from new folder button `onClick`
  0. `POST /api/folders` is called.
  0. `receiveSingleFolder` is set as the callback.

* `updateFolder`
  0. invoked from `FolderForm` `onSubmit`
  0. `POST /api/folders` is called.
  0. `receiveSingleFolder` is set as the callback.

* `destroyFolder`
  0. invoked from delete folder button `onClick`
  0. `DELETE /api/folders/:id` is called.
  0. `removeFolder` is set as the callback.

### Folders API Response Actions

* `receiveAllFolders`
  0. invoked from an API callback.
  0. `Folders` store updates `_folders` and emits change.

* `receiveSingleFolders`
  0. invoked from an API callback.
  0. `Folders` store updates `_folders[id]` and emits change.

* `removeFolder`
  0. invoked from an API callback.
  0. `Folders` store removes `_folders[id]` and emits change.

### Store Listeners

* `FoldersIndex` component listens to `Folders` store.
