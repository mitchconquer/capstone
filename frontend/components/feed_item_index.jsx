const React = require('react');

const FeedItemIndex = React.createClass({
  render() {
    const feedItems = [];
    for (let i = 0; i < 15; i++) {
      feedItems.push(
        <li className="feed-item" key={i} >
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="http://lorempixel.com/g/60/60/abstract" alt="..." className="img-responsive" />
              </a>
            </div>
            <div className="media-body">
              <h6 className="media-heading">Article Title Goes Here, May Wrap</h6>
              <small>Author Name * June 25, 2016</small>
            </div>
          </div>
        </li>
      );
    }
    
    return (
      <section className="col-sm-4 app-column feed" id="feed">
        <header><h4>Feed Name</h4></header>
        <ul className="list-unstyled">
          {feedItems}
        </ul>
      </section>
      
    );
  }
});

module.exports = FeedItemIndex;