const React = require('react');

const FeedItemDetails = React.createClass({
  render() {
    
    return (
      <section className="col-sm-8 app-column full-articles" id="full-articles">
        <article>
          <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h2>
          <div className="article-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil eaque necessitatibus modi, mollitia possimus, aspernatur excepturi facere quod deserunt nam culpa illo, voluptatem aut rerum corrupti dicta doloribus est nulla!</p>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil eaque necessitatibus modi, mollitia possimus, aspernatur excepturi facere quod deserunt nam culpa illo, voluptatem aut rerum corrupti dicta doloribus est nulla!</p>
          </div>
        </article>
      </section>
    );
  }
});

module.exports = FeedItemDetails;