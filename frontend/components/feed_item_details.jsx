const React = require('react'),
      AddFeedSourceButton = require('./add_feed_source_button');

const FeedItemDetails = React.createClass({
  getInitialState() {
      return {
          feedItems: [] 
      };
  },

  componentDidMount() {
      this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);  
  },

  componentWillUnmount() {
      this.feedStoreListener.remove();  
  },

  _feedStoreChange() {
    if (this.props.feedSourceIds) {
      this.setState({
        feedItems: FeedStore.getFeedItems(this.props.feedSourceIds)
      });
    }
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
        return (
          <article id={id} key={feedItem.id} ><h2>{feedItem.title}</h2>
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