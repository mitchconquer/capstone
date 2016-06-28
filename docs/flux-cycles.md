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


## FeedSources Cycles

### FeedSources API Request Actions

* `fetchAllFeedSources`
  0. invoked from `FolderIndex` (?) `didMount`/`willReceiveProps`
  0. `GET /api/feeds` is called.
  0. `receiveAllFeedSources` is set as the callback.

* `createFeedSource`
  0. invoked from new note button `onClick`
  0. `POST /api/feeds` is called.
  0. `receiveSingleFeedSource` is set as the callback.

* `updateFeedSource`
  0. invoked from `FeedItemForm` `onSubmit` (when receives new feed)
  0. invoked from `FeedItemDetails` when it enters the scree  (to mark as read when viewd)
  0. `PATCH /api/feeds/:id` is called
  0. `receiveSingleFeedSource` is set as the callback.

* `destroyFeedSource`
  0. invoked from delete feedSource button `onClick`
  0. `DELETE /api/feeds/:id` is called.
  0. `removeFeedSource` is set as the callback.

### FeedSources API Response Actions

* `receiveAllFeedSources`
  0. invoked from an API callback.
  0. `FeedSources` store updates `_feedSources` and emits change.
  0. `Folders` store updates unread counts of each feed and emits change.

* `receiveSingleFeedSource`
  0. invoked from an API callback.
  0. `FeedSources` store updates `_feedSources[id]` and emits change.
  0. `Folders` store updates unread counts of that feed and emits change.

* `removeFeedSource`
  0. invoked from an API callback.
  0. `FeedSources` store removes `_feedSources[id]` and emits change.
  0. `Folders` store updates unread counts of that feed and emits change.

### Store Listeners

* `FeedItemIndex` component listens to `FeedSources` store.
* `FolderIndex` component listens to `Folders` store. (for unread count)

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
  0. `fetchAllFeedSources` action is called to update feeds (?? Is this an ok pattern to update the feeds after some may have been deleted?)

* `updateFolder`
  0. invoked from `FolderForm` `onSubmit`
  0. `POST /api/folders/:id` is called.
  0. `receiveSingleFolder` is set as the callback.
  0. `fetchAllFeedSources` action is called to update feeds (?? Is this an ok pattern to update the feeds after some may have been deleted?)

* `destroyFolder`
  0. invoked from delete folder button `onClick`
  0. `DELETE /api/folders/:id` is called.
  0. `removeFolder` is set as the callback.
  0. `fetchAllFeedSources` action is called to update feeds (?? Is this an ok pattern to update the feeds after some may have been deleted?)

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
