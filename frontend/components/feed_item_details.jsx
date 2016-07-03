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
    this.setState({
      feedItems: FeedStore.getFeedItems(this.props.feedSourceIds)
    });
    console.log('FeedItemDetails#_FeedStoreChange');
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        feedItems: FeedStore.getFeedItems(nextProps.feedSourceIds)
      })  
  },

  parseHTML(inputHtml) {
    return {__html: inputHtml};
  },

  render() {
    if (this.state.feedItems && this.state.feedItems.length > 0) {
      // const description = $.parseHTML(feedItem.description);
      const feedItems = this.state.feedItems.map(feedItem => {
        return (
          <article id="article-{feeditem.id}" key={feedItem.id} ><h2>{feedItem.title}</h2>
            <div dangerouslySetInnerHTML={this.parseHTML(feedItem.description)}></div>
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
      <div>
        <AddFeedSourceButton />
      </div>
    );
  }
});

module.exports = FeedItemDetails;