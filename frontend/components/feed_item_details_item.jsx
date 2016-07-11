const React = require('react'),
      ReactDOM = require('react-dom'),
      ReadItemActions = require('../actions/read_item_actions'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions');

const FeedItemDetailsItem = React.createClass({
  getInitialState() {
    return {
      savedArticles: [],
      active: this.props.feedItem.read
    };
  },

  componentDidMount() {
    this.savedArticleStoreListener = SavedArticleStore.addListener(this._savedArticleStoreChange); 
    document.getElementById('full-articles').addEventListener('scroll', this.onScroll);
    this.element = ReactDOM.findDOMNode(this);
    this.parentDiv = document.getElementById('full-articles');
    this.prevOffsetTop = 0;
  },

  componentWillUnmount() {
    this.savedArticleStoreListener.remove(); 
    document.getElementById('full-articles').removeEventListener('scroll', this.onScroll);
  },

  _savedArticleStoreChange() {
    this.setState({ savedArticles: SavedArticleStore.allIds() });
  },

  onScroll(e) {

    const scrollTop = this.parentDiv.scrollTop;


    // Scrolling Up
    if (this.prevOffsetTop < scrollTop) {
      // When item scrolls into 'currently reading' position
      const screenTop = this.parentDiv.scrollTop;
      const elementTop = this.element.offsetTop;
      if (screenTop > elementTop - 150 && screenTop < elementTop) {

        this.props.setActiveFeedItem(this.props.feedItem.id);

        if (this.state.read !== true ) {
          this.setState({ read: true });
          ReadItemActions.create(this.props.feedItem.id);
        }
      }
    // Scrolling Down
    } else if (this.prevOffsetTop > scrollTop) {
      // When item scrolls into 'currently reading' position
      const elementBottom = this.element.offsetTop + this.element.offsetHeight;
      const screenBottom = scrollTop + window.outerHeight;
      if (elementBottom < screenBottom - 200 && elementBottom > screenBottom - 250 ) {

        this.props.setActiveFeedItem(this.props.feedItem.id);

      }
    }

    this.prevOffsetTop = scrollTop;
  },

  toggleSave(feedItemId) {
   const feedItem = this.props.feedItem;

    if (this.state.savedArticles.includes(feedItem.id)) {
      // unsave
      SavedArticleActions.deleteByOriginalId(feedItem.id)
    } else {
      // save
      
      SavedArticleActions.create({
        feed_source_title: feedItem.sourceTitle,
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
      <article id={htmlId} key={feedItem.id} ref="article" ><h2>{feedItem.title}</h2>
        
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