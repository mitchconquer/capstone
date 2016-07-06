const React = require('react'),
      AddFeedSourceButton = require('./add_feed_source_button'),
      FeedStore = require('../stores/feed_store'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions');

const FeedItemDetails = React.createClass({
  getInitialState() {
      return {
          feedItems: [],
          savedArticles: []
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
        feedItems: FeedStore.getFeedItems(this.props.feedSourceIds)
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
      document.getElementById('add-feed-source').scrollIntoView(true);
  },

  parseHTML(inputHtml) {
    return {__html: inputHtml};
  },

  render() {
    if (this.state.feedItems && this.state.feedItems.length > 0) {
      // const description = $.parseHTML(feedItem.description);
      const feedItems = this.state.feedItems.map(feedItem => {
        const id = `item-${feedItem.id}`;
        let saveActive = ""
        let saveText = "save"
        if (this.state.savedArticles.includes(feedItem.id)) {
          saveText = "saved"
          saveActive = " active"
        }
        const toolbar = (
          <ul className="feed-item-details-toolbar">
            <li className={"save" + saveActive} onClick={this.toggleSave.bind(this, feedItem.id)}>
              <span className="glyphicon glyphicon-pushpin"></span><div className="toolbar-helper-text">{saveText}</div>
            </li>
          </ul>
        );

        return (
          <article id={id} key={feedItem.id} ><h2>{feedItem.title}</h2>
            
            {toolbar}

            <div dangerouslySetInnerHTML={this.parseHTML(feedItem.description)}></div>
            <div className="clearfix continue-reading-link">
              <a href={feedItem.link} target="_blank" className="btn btn-hollow pull-right"><div className="btn-hollow-inner">Continue Reading ></div></a>
            </div>
          </article>
        );
      });
      
      return (
        <section className="col-sm-8 app-column full-articles" id="full-articles">
          <AddFeedSourceButton />
            {feedItems}
        </section>
      );
    }
    
    return (
      <section className="col-sm-8 app-column full-articles" id="full-articles">
        <AddFeedSourceButton />
        <p>This view isn't super working yet so an RSS feed from the left-most menu or add one with the button above, plz.
        </p>
      </section>
    );
  }
});

module.exports = FeedItemDetails;