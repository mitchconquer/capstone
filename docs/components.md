## Component Hierarchy

### Feed Groups

* **Homepage**
* **FeedGroupIndex**
  * AddFeedGroup
  * FeedGroupItems
    * FeedGroupItem
      *FeedItems
  * **FeedIndex**
    * FeedItem
    * **FullArticle**
      * Articles
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

* **Component:** `FeedGroupIndex`, **Path:** `/`
  * **Component:** `FeedIndex`, **Path:** `feed/:feedId`
    * **Component:** `FullArticle`, **Path:** ``
  * **Component:** `AddFeedsIndex`, **Path:** `edit`