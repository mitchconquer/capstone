const React = require('react'),
      FeedStore = require('../stores/feed_store'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions'),
      FeedItemDetailsItem = require('./feed_item_details_item');

const FeedItemDetails = React.createClass({
  getInitialState() {
      return {
          feedItems: [],
          savedArticles: [],
          filtering: false
      };
  },

  componentDidMount() {
      this.feedStoreListener = FeedStore.addListener(this._feedStoreChange); 
      SavedArticleActions.fetchAll();
      this.savedArticleStoreListener = SavedArticleStore.addListener(this._savedArticleStoreChange); 
  },

  componentWillUnmount() {
      this.feedStoreListener.remove();  
      this.savedArticleStoreListener.remove();  
  },

  _feedStoreChange() {
    if (this.props.feedSourceIds) {
      this.setState({
        feedItems: FeedStore.getFeedItems(this.props.feedSourceIds),
        filtering: FeedStore.filtering()
      });
    }
  },

  _savedArticleStoreChange() {
    this.setState({ savedArticles: SavedArticleStore.allIds() });
  },

  toggleSave(feedItemId) {
    if (this.state.savedArticles.includes(feedItemId)) {
      // unsave
      this.findIndex(feedItemId);
      SavedArticleActions.deleteByOriginalId(feedItemId)
    } else {
      // save
      const index = this.findIndex(feedItemId);
      const feedItem = this.state.feedItems[index];
      
      SavedArticleActions.create({
        feed_source_title: this.props.feedSourceTitle,
        original_id: feedItem.id,
        title: feedItem.title,
        url: feedItem.link,
        body: feedItem.description,
        author: feedItem.author,
        pub_date: feedItem.pubDate
      });
    }
  },

  findIndex(feedItemId) {
    let foundIndex;
    const feedItems = this.state.feedItems;
    this.state.feedItems.forEach((feedItem, index) => {
      if (feedItems[index].id === feedItemId) {
        foundIndex = index;
      }
    });
    return foundIndex;
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        feedItems: FeedStore.getFeedItems(nextProps.feedSourceIds)
      }) ;
      if (nextProps.feedSourceTitle !== this.props.feedSourceTitle) {
        document.getElementById('full-articles').scrollTop = 0;
      }
  },

  parseHTML(inputHtml) {
    return {__html: inputHtml};
  },

  render() {
    if (this.state.feedItems && this.state.feedItems.length > 0) {

      const feedItems = this.state.feedItems.map(feedItem => {
        return <FeedItemDetailsItem setActiveFeedItem={this.props.setActiveFeedItem} activeFeedItem={this.props.activeFeedItem} key={feedItem.id} feedItem={feedItem} />
      });
      
      return (
        <section className="col-sm-8 app-column full-articles" id="full-articles">
            {feedItems}
        </section>
      );
    }
    
    return (
      <section className="col-sm-8 app-column full-articles" id="full-articles">
        <div className="no-content">
          {this.state.filtering ? <h3 className="no-results">Sorry. No results found.  <br /><br /> <img className="ui-gif" src="https://s3-us-west-1.amazonaws.com/aggregreater/table_flip.gif" /></h3> : <div className="loader">Loading...</div>}
        </div>
      </section>
    );
  }
});

module.exports = FeedItemDetails;