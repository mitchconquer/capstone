const React = require('react');

const EditFeeds = React.createClass({
  render() {
    const feedSourceItems = [];
    for (let i = 0; i < 25; i++) {
      feedSourceItems.push(
          <li className="feed-item" key={i} >
            <a href="#">
              <img src="http://dummyimage.com/150x150" alt="" className="img-circle" />
              <br />
              Feed Name
            </a>
          </li>
      );
    }
    
    return (
        <section className="app-column edit-feeds" id="edit-feeds">
          <h2>Feeds to Edit</h2>
          <h4 className="feed-category">Feed Category</h4>
          <ul className="suggested-feeds list-unstyled">
            {feedSourceItems}
          </ul>
        </section>
    );
  }
});

module.exports = EditFeeds;