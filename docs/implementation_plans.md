
## Initital Loading

* If not logged in, show homepage
* if logged in, show AllFeedSources
  * UpdateAllFeeds
    * Initialize updatedFeedSourcesForServer object
    * Initialize udpatedFeedSources
    * Request user's feed_sources plus saved feed items from api
      (Could order feed_sources by number of user_read entries so you are
      getting the feeds the user reads the most first)
    * For each feed_source: Refresh Feed Source

## Refresh Feed Source

The gist is that when updating a feed source, the React app will create two Feed Source objects, a simplified one for the server and a complete one for the app.  The server will update its records for that feed source and return an object that has for that feed source that includes an array listing which feed_items have bene read already by that user.

React will send the complete Feed Source object to the update the store immediately.  The server will then update the store with the read_information only when it has it.

* Update FeedSource(feedSourceLink)
  * Instantiate storeUpdatedFeedSource object
  * Instantiate serverUpdatedFeedSource object
  * Get updated XML
  * Parse XML into POJO
    * Add XML channel.link to storeUpdatedFeedSource and serverUpdatedFeedSource
    * Add each XML item.guid to serverUpdatedFeedSource
    * Add title, link, description, author, guid, pubDate (set as blank if don't exist) to storeUpdatedFeedSource, nested under guid.  If guid doesn't exist, use link.
  * serverUpdatedFeedSource now looks like:
    { "http://www.lemonde.fr/rss/une.xml":
      {
        link: "http://www.lemonde.fr/rss/une.xml", 
        feed_items: 
          [
           "http://www.lemonde.fr/tiny/4959221/",
           "http://www.lemonde.fr/tiny/4959075/",
           "http://www.lemonde.fr/tiny/4959257/"
          ]
      }
    }
    * All data is nested under the unique identitifier for that feedSource (the <channel><link></channel><link>)
      * Feed items is an array that's stored under the feed_items key
  * storeUpdatedFeedSource now looks like:
   { "http://www.lemonde.fr/rss/une.xml": 
    {
     title: "Le Monde.fr - Actualité à la Une",
     link: "http://www.lemonde.fr/rss/une.xml",
     feed_items: 
       [
        {guid: "http://www.lemonde.fr/tiny/4959221/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
        {guid: "http://www.lemonde.fr/tiny/4959075/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
        {guid: "http://www.lemonde.fr/tiny/4959257/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."}
       ],
      read: []
    }
   }
    * All data is nested under the unique identitifier for that feedSource (the <channel><link></channel><link>)
    * Channel information is top level in the nested object
    * Feed items is an array that's stored under the feed_items key.
      * Feed items includes title, link, guid, description, pubDate, author
  * Server: FeedActions.updateServerFeedSource(serverUpdatedFeedSource) is called with callback ServerActions.receiveReadFeedItems
    * WebApiUtils.updateServerFeedSource(serverUpdatedFeedSource, ServerActions.receiveReadFeedItems)
    * Server returns object that includes sources that have been read with source guid as key
      { "http://www.lemonde.fr/rss/une.xml": {
          read: [
            "http://www.lemonde.fr/tiny/4959075/",
            "http://www.lemonde.fr/tiny/4959257/" ],
          folder_id: 39
        }
      }
      * At this time, server should update feed_items, deleting entries that are no longer included
    * ServerActions.receiveReadFeedItems(readFeedItems) will send actionType "RECEIVE_READ_FEED_ITEMS"
    * Store will update the "read" properties of each affected feedSource and __emitChange()
  * Client: FeedActions.updateStoreFeedSource(storeUpdatedFeedSource) is invoked to create actionType "RECEIVE_FEED_SOURCES"
    * Store will update the _feeds with the new info or add the feed if it's not yet in the store
    * Store will __emitChange()

## Mark FeedItem as read per user

* Triggered by feedItem onClick
* FeedActions.markRead({ feedSourceIdentifier: feedItemIdentitier }) 
* WebApiUtils.markRead({ feedSourceIdentifier: feedItemIdentitier }, ServerActions.markRead)
  * Creates action with actionType "RECEIVE_READ_FEED_ITEM" with { feedSourceIdentifier: { read: [ feedItemIdentifier ]}}
* FeedStore pushes new read feedItemIdentifier to read array of feedSourceIdentifier in _feeds and emits change

## Save FeedItem to profile

* Triggered by FeedItemDetails "save" button onClick
* FeedActions.saveItem(feedItem)
  * feedItem is object with all data about feedItem
  * {feedSourceIdentifier:
        {guid: "http://www.lemonde.fr/tiny/4959221/", title: "Title...", description: "Descr...", author: "Author...", link: "http://www...", pubDate: "date..."},
    }
* WebApiUtils.saveItem({ feedSourceIdentifier: feedItemIdentitier }, ServerActions.saveItem)
* ServerActions.saveItem will create actionType "RECEIVE_SAVED_ITEM" with savedItem
* FeedStore will push the savedItem to the savedItems

## Update Feed Source (Including delete or change folder)

* Triggered by FeedSourceForm onSubmit
* FeedActions.updateFeedSource(feedSource)
* WebApiUtils.updateFeedSource(feedSource, ServerActions.updateFeedSource)
* ServerActions.updateFeedSource(feedSource)
  * actionType: UPDATE_FEED_SOURCE
  * feedSource: feedSource
* FeedStore's UPDATE_FEED_SOURCE will update just that item and emit change

## Search feed items ???
* Triggered by onChange in Search component