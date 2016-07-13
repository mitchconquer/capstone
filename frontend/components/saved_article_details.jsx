const React = require('react'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions');

const SavedArticleDetails = React.createClass({
  getInitialState() {
      return {
          savedArticles: SavedArticleStore.all()
      };
  },

  componentDidMount() {
      this.savedArticleStoreListener = SavedArticleStore.addListener(this._savedArticleStoreChange); 
  },

  componentWillUnmount() {
      this.savedArticleStoreListener.remove();  
  },

  _savedArticleStoreChange() {
    this.setState({ 
      savedArticles: SavedArticleStore.all()
    });
  },

  toggleSave(feedItemId) {
    if (Object.keys(this.state.savedArticles).includes(feedItemId)) {
      // unsave
      SavedArticleActions.delete(feedItemId)
    }
  },

  parseHTML(inputHtml) {
    return {__html: inputHtml};
  },

  render() {
    if (this.state.savedArticles && Object.keys(this.state.savedArticles).length > 0) {
      // const description = $.parseHTML(feedItem.description);
      const savedArticles = Object.keys(this.state.savedArticles).map(itemId => {
        const feedItem = this.state.savedArticles[itemId];
        const id = `item-${feedItem.id}`;
        let saveActive = ""
        let saveText = "save"
        if (Object.keys(this.state.savedArticles).includes(itemId)) {
          saveText = "saved"
          saveActive = " active"
        }
        const toolbar = (
          <ul className="feed-item-details-toolbar">
            <li className={"save" + saveActive} onClick={this.toggleSave.bind(this, itemId)}>
              <span className="glyphicon glyphicon-pushpin"></span><div className="toolbar-helper-text">{saveText}</div>
            </li>
          </ul>
        );

        return (
          <article id={id} key={feedItem.id} ><h2>{feedItem.title}</h2>
            
            {toolbar}

            <div dangerouslySetInnerHTML={this.parseHTML(feedItem.body)}></div>
            <div className="clearfix continue-reading-link">
              <a href={feedItem.link} target="_blank" className="btn btn-hollow pull-right"><div className="btn-hollow-inner">Continue Reading ></div></a>
            </div>
          </article>
        );
      });
      
      return (
        <section className="col-sm-8 app-column full-articles" id="full-articles">
            {savedArticles}
        </section>
      );
    }

    if (this.state.savedArticles && Object.keys(this.state.savedArticles).length < 1) {
      return (
        <section className="col-sm-8 app-column full-articles" id="full-articles">
          <p>You have no saved articles¯\_(ツ)_/¯  Go forth and pin!
          </p>
        </section>
      );
    }
    
    return (
      <section className="col-sm-8 app-column full-articles" id="full-articles">
        <p>Loading...
        </p>
      </section>
    );
  }
});

module.exports = SavedArticleDetails;