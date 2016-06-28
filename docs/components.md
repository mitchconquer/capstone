## Component Hierarchy

### Feed Groups

* **Homepage**
* **FolderIndex**
  * SearchForm
  * AddFolder
  * SavedArticles
  * AllFeedSources
  * FolderItems
    * FolderItem
      * FolderForm
      * FeedSources
        * FeedSourceForm
  * **FeedItemIndex**
    * FeedItemIndex
    * **FeedItemDetails**
  * **AddFeedsIndex**
    * SuggestedFeedItem
    * CreateFeed
      * CreateFeedForm

### Menu

* Main Menu
  * Menu Logo
  * Menu Item
  * Acccount Menu Item

## Routes

## Routes

* **Component:** `FolderIndex`, **Path:** `/`
  * **Component:** `Homepage`, **Path:** `home` (if user is not logged in)
  * **Component:** `FeedItemIndex`, **Path:** `feed/all` (Index Route)
  * **Component:** `FeedItemIndex`, **Path:** `feed/:feedId`
    * **Component:** `FeedItemDetails`, **Path:** ``
  * **Component:** `AddFeedsIndex`, **Path:** `new`