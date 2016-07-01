
## Initital Loading

* If not logged in, show homepage
* if logged in, load `<FolderIndex />`
* `<FolderIndex />` will ask rails for Folders and Feed Sources †
  * Default child component: `<AllFeeds sources={[feedSourceId, feedSourceId, ...]} />`
    * Get all feed source IDs from Util method that grabs keys from FeedSourcesStore
  * `<SavedFeedItems />`
  * `<Folder sources={[feedSourceId, feedSourceId, ...]} />`
  * `<FeedSource sources={[feedSourceId]} />`
* `<FeedItemIndex sources={[feedSourceId, feedSourceId, ...]} />` is rendered with feed source ID's as a prop in an array from `<AllFeeds />`, `<Folder />` or `<FeedSource />`
  * Has feed items as a state property
  * When rendered, calls method `refreshFeedSources([feedSourceId, feedSourceId, ...])`
    * Will loop through feed sources and for each one, ask rails to update and send response to store
  * Will listen to `FeedSourceStore`, when there's a change, calls method `updateFeedItems()` to cycle through own feed source ID's and push feed items into its feed item state property
* `<FeedItemDetails />` is pane to show the actual of the `<FeedItem />`

### † Server response to initial data request

* Returns two nested objects, folders (with their feed sources) and a list of feed sources
* Feed sources can be given in any order (so can optimize or change order later, ie: order by feeds with the most read items first)
* Once we load all of the feed sources for the initial load, can reuse them to render individual feed views
* Two stores: `FeedSourceStore` and `FolderStore`

```javascript
{
  folders: {
    folderId: {
      folderName: folderName,
      feedSources: [feedSourceId, feedSourceId, ...]
    },
    folderId: {
      folderName: folderName,
      feedSources: [feedSourceId, feedSourceId, ...]
    }
  },

  feedSources: {
    feedSourceId: {
      feedSourceTitle: title,
      feedSourceUrl: url,
      feedSourceFeedUrl: url,
      feedSourceImageUrl: imageUrl,
      feedItems: { 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          pubDateAgo: String,
          enclosure: url:Text,
          identifier: text }, 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          enclosure: url:Text,
          identifier: text }
      }
    },

    feedSourceId: {
      feedSourceTitle: title,
      feedSourceUrl: url,
      feedSourceFeedUrl: url,
      feedSourceImageUrl: imageUrl,
      feedItems: { 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          pubDateAgo: String,
          enclosure: url:Text,
          identifier: text }
      }
    }
  }
}
```
### †† refreshFeedSources([feedSourceId, feedSourceId, ...])

* Requests to `/api/feeds/:id`
* Return format:

```javascript
feedSourceId: {
  feedSourceTitle: String,
  feedSourceUrl: Text,
  feedSourceFeedUrl: Text,
  feedSourceImageUrl: Text,
  feedItems: { 
    feedItemId: { 
      title: String,
      link: Text,
      description: Text,
      read: Boolean,
      author: String,
      pubDate: dateTime,
      pubDateAgo: String,
      enclosure: url:Text,
      identifier: text }, 
    feedItemId: { 
      title: String,
      link: Text,
      description: Text,
      read: Boolean,
      author: String,
      pubDate: dateTime,
      pubDateAgo: String,  
      enclosure: url:Text,
      identifier: text }, 
  }
}
```
## Add New Feed

* FeedActions#CreateFeedSource
* FeedApiUtil#CreateFeedSource
* FeedActions#ReceiveFeedSource
* FeedStore#ReceiveFeedSource

## Mark FeedItem as read per user

* Triggered by `<FeedItem />` `onClick`
* `FeedActions.markRead(feedItemId)`
* `WebApiUtils.markRead(feedItemId, ServerActions.markRead)`
  * Creates action with actionType `RECEIVE_READ_FEED_ITEM` with `{ feedSourceId: #, feedItemId: # }`
* `FeedSourceStore` pushes marks `read: true` in the feed item object and emits change

## Save FeedItem to profile

* Triggered by `<FeedItemDetails />` "save" button `onClick`
* `FeedActions.saveItem(feedItem)`
  * `feedItem` is object with all data about feedItem
  * 
  ```javascript
  {feedItemId:
        {...all other content from props/state...},
    }
  ```
* `WebApiUtils.saveItem(feedItem, ServerActions.saveItem)`
* ServerActions.saveItem will create actionType "RECEIVE_SAVED_ITEM" with savedItem
* FeedStore will push the savedItem to the savedItems

## Update Feed Source (Including delete or change folder)

* Triggered by `FeedSourceForm` `onSubmit`
* `FeedActions.updateFeedSource(feedSource)`
* `WebApiUtils.updateFeedSource(feedSource, ServerActions.updateFeedSource)`
* `ServerActions.updateFeedSource(feedSource)`
  * `actionType: UPDATE_FEED_SOURCE`
  * `feedSource: feedSource`
* `FeedStore`'s `UPDATE_FEED_SOURCE` will update just that item and emit change

## Search feed items ???
* Triggered by onChange in Search component