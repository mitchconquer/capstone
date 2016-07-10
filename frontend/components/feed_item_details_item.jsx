const React = require('react'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions');

const FeedItemDetailsItem = React.createClass({
  getInitialState() {
    return {
      savedArticles: []
    };
  },

  componentDidMount() {
    this.savedArticleStoreListener = SavedArticleStore.addListener(this._savedArticleStoreChange); 
  },

  componentWillUnmount() {
    this.savedArticleStoreListener.remove(); 
  },

  _savedArticleStoreChange() {
    this.setState({ savedArticles: SavedArticleStore.allIds() });
  },

  toggleSave(feedItemId) {
    if (this.state.savedArticles.includes(this.props.feedItem.id)) {
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

  parseHTML(inputHtml) {
    return {__html: inputHtml};
  },

  render() {
    // const description = $.parseHTML(feedItem.description);
    const feedItem = this.props.feedItem;
    const htmlId = `item-${feedItem.id}`;
    let saveActive = "";
    let saveText = "save";
    if (this.state.savedArticles.includes(feedItem.id)) {
      saveText = "saved";
      saveActive = " active";
    }
    const toolbar = (
      <ul className="feed-item-details-toolbar">
        <li className={"save" + saveActive} onClick={this.toggleSave.bind(this, feedItem.id)}>
          <span className="glyphicon glyphicon-pushpin"></span><div className="toolbar-helper-text">{saveText}</div>
        </li>
      </ul>
    );

    const metaData = (
      <div className="feed-item-meta-data">
        <div className="source-title">{feedItem.sourceTitle ? feedItem.sourceTitle + "," : ""}</div>
        <div className="author">{feedItem.author ? feedItem.author + "," : ""}</div>
        <div className="pub-date">{feedItem.pubDateReadable ? feedItem.pubDateReadable + "," : ""}</div>
        <div className="pub-date-ago">{feedItem.pubDateAgo ? feedItem.pubDateAgo + " ago" : ""}</div>
      </div>
    );

    return (
      <article id={htmlId} key={feedItem.id} ><h2>{feedItem.title}</h2>
        
        {metaData}

        {toolbar}

        <div className="feed-item-body" dangerouslySetInnerHTML={this.parseHTML(feedItem.description)}></div>
        <div className="clearfix continue-reading-link">
          <a href={feedItem.link} target="_blank" className="btn btn-hollow pull-right"><div className="btn-hollow-inner">Continue Reading ></div></a>
        </div>
      </article>
    );
  }
});

module.exports = FeedItemDetailsItem;