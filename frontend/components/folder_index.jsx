import { Link, hashHistory } from 'react-router';
const React = require('react'),
      FolderIndexUtils = require('./folder_index_utils'),
      FeedItemIndex = require('./feed_item_index'),
      FeedItemDetails = require('./feed_item_details'),
      MainMenu = require('./main_menu');

const FolderIndex = React.createClass({
  render(){
    return (
      <div className="container-fluid app-columns folder-index">
        
        <section className="col-sm-2 app-column left-pane" id="feed-groups">
          <FolderIndexUtils />
        </section>

        <div className="col-sm-10 right-pane">

          <MainMenu />
          
          <FeedItemIndex />

          <FeedItemDetails />

        </div>

      </div>
    );
  }
});

module.exports = FolderIndex;

