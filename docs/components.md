## Component Hierarchy

### Feed Groups

* **Homepage**
* **FeedGroupIndex**
  * AddFeedGroup
  * SavedArticles
  * FeedGroupItems
    * FeedGroupItem
      *FeedItems
  * **FeedArticleIndex**
    * FeedArticleItem
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
  * **Component:** `Homepage`, **Path:** `home` (if user is not logged in)
  * **Component:** `FeedArticleIndex`, **Path:** `feed/:feedId`
    * **Component:** `FullArticle`, **Path:** ``
  * **Component:** `AddFeedsIndex`, **Path:** `edit`