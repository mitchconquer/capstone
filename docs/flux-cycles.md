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


## Note Cycles

### Notes API Request Actions

* `fetchAllFeeds`
  0. invoked from `FolderIndex` `didMount`/`willReceiveProps`
  0. `GET /api/folders` is called.
  0. `receiveAllFolders` is set as the callback.

* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback.

* `fetchSingleNote`
  0. invoked from `NoteDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateNote`
  0. invoked from `FolderItem` `` (when receives new feed)
  0. `POST /api/notes` is called
  0. `receiveSingleNote` is set as the callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the callback.

### Notes API Response Actions

* `receiveAllNotes`
  0. invoked from an API callback.
  0. `Note` store updates `_notes` and emits change.

* `receiveSingleNote`
  0. invoked from an API callback.
  0. `Note` store updates `_notes[id]` and emits change.

* `removeNote`
  0. invoked from an API callback.
  0. `Note` store removes `_notes[id]` and emits change.

### Store Listeners

* `NotesIndex` component listens to `Note` store.
* `NoteDetail` component listens to `Note` store.


## Feedgroup Cycles

### Folders API Request Actions

* `fetchAllFolders`
  0. invoked from `FoldersIndex` `didMount`/`willReceiveProps`
  0. `GET /api/folders` is called.
  0. `receiveAllFolders` is set as the callback.

* `createFolder`
  0. invoked from new feed group button `onClick`
  0. `POST /api/folders` is called.
  0. `receiveSingleFolder` is set as the callback.

* `fetchSingleFolder`
  0. invoked from `FolderDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleFolder` is set as the callback.

* `updateFolder`
  0. invoked from `FolderForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleFolder` is set as the callback.

* `destroyFolder`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeFolder` is set as the callback.

### Folders API Response Actions

* `receiveAllFolders`
  0. invoked from an API callback.
  0. `Feedgroup` store updates `_feedgroups` and emits change.

* `receiveSingleFolders`
  0. invoked from an API callback.
  0. `Folders` store updates `_feedgroups[id]` and emits change.

* `removeFolders`
  0. invoked from an API callback.
  0. `Folders` store removes `_feedgroups[id]` and emits change.

### Store Listeners

* `NotebooksIndex` component listens to `Notebook` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
