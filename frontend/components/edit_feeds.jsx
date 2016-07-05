const React = require('react'),
      RecommendedActions = require('../actions/recommended_actions'),
      RecommendedStore = require('../stores/recommended_store'),
      AddFeedSourceButton = require('./add_feed_source_button');

const EditFeeds = React.createClass({
  getInitialState() {
    return {
      recommended: []    
    };
  },

  componentDidMount() {
    RecommendedActions.fetchAll();
    this.recomendedStoreListener = RecommendedStore.addListener(this._recommendedStoreChange);  
  },

  componentWillUnmount() {
    this.recommendedStoreListener.remove();  
  },

  _recommendedStoreChange(){
    this.setState({ recommended: RecommendedStore.all() });
  },

  render() {
    const categories = [];
    const feedSourceItems = [];
    this.state.recommended.forEach(category => {
      categories.push(
        <div key={'cat' + category.id}>
          <h3 className="big-num">{category.name}</h3>
          <ul className="suggested-feeds list-unstyled">
            {category.feedSources.map(feedSource => {
              return (
                <li className="feed-item" key={'fs' + feedSource.id}>
                  <img src="http://dummyimage.com/150x150" alt="" className="img-circle" />
                  <br />
                  <h4>{feedSource.title}</h4>
                </li>
              )
            })}
          </ul>
        </div>
      );
    });
    
    return (
        <section className="app-column edit-feeds" id="edit-feeds">
          <AddFeedSourceButton />
          {categories}
        </section>
    );
  }
});

module.exports = EditFeeds;