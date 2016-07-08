const React = require('react'),
      RecommendedActions = require('../actions/recommended_actions'),
      RecommendedStore = require('../stores/recommended_store'),
      AddRecommendedFeedModal = require('./add_recommended_feed_modal');

const EditFeeds = React.createClass({
  getInitialState() {
    return {
      recommended: [], showModal: false, feedSourceId: "", feedSourceTitle: "", feedSourceImageUrl: ""
    };
  },

  componentDidMount() {
    RecommendedActions.fetchAll();
    this.recommendedStoreListener = RecommendedStore.addListener(this._recommendedStoreChange);  
  },

  componentWillUnmount() {
    this.recommendedStoreListener.remove();  
  },

  _recommendedStoreChange(){
    this.setState({ recommended: RecommendedStore.all() });
  },

  showModal() {
    this.setState({ showModal: true });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  intializeModal(feedSourceId, feedSourceTitle, feedSourceImageUrl) {
    this.setState({ feedSourceId: feedSourceId, feedSourceTitle: feedSourceTitle, feedSourceImageUrl: feedSourceImageUrl }, this.showModal);
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
                <li className="feed-item" key={category.id + 'fs' + feedSource.id} onClick={this.intializeModal.bind(this, feedSource.id, feedSource.title, feedSource.imageUrl)} >
                  <img src={feedSource.imageUrl} alt="" className="img-circle img-responsive" />
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
          <AddRecommendedFeedModal show={this.state.showModal} closeModal={() => this.setState({showModal: false})} feedSourceId={this.state.feedSourceId} feedSourceTitle={this.state.feedSourceTitle} feedSourceImageUrl={this.state.feedSourceImageUrl} />
          <h2>Explore Recommended Feeds</h2>
          {categories}
        </section>
    );
  }
});

module.exports = EditFeeds;