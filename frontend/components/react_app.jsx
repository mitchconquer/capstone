const React = require('react'),
      FolderIndexUtils = require('./folder_index_utils'),
      FolderIndex = require('./folder_index'),
      MainMenu = require('./main_menu'),
      MainContent = require('./main_content');

const ReactApp = React.createClass({
  render() {

    /* {this.props.children} */
    /* And then the FeedItemIndex and EditFeedIndex are sibblings and FeedItemDetails is child of FeedItemIndex */
    
    return (
      <div className="container-fluid app-columns folder-index">
        
        <section className="col-sm-2 app-column left-pane" id="feed-groups">
          <FolderIndexUtils />
          <FolderIndex />
        </section>

        <div className="col-sm-10 right-pane">

          <MainMenu />

          <MainContent children={this.props.children}/>

        </div>

      </div>
    );
  }
});

module.exports = ReactApp;

