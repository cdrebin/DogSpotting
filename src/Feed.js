import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


class Feed extends React.Component {
  /* Display feed */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = { posts: [], page: 0, hasMore: false, breeds: {}, breedOptions: ["all"], breed: this.props.breed };
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  componentDidMount() {
    const nav = performance.navigation;
    if (nav.type === performance.navigation.TYPE_BACK_FORWARD) {
      // this.setState(history.state);
    } else {
      // Call REST API to get posts for feed
      this.fetchMoreData();
    }
  }

  fetchMoreData() {
    const url = `https://dog.ceo/api/breeds/image/random/10`;
    fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.addPictures(data.message);
        if (data.next) {
          this.setState({ hasMore: true, page: this.state.page + 1 });
          // history.replaceState(this.state, '', '/');
        }
        console.log("State", this.state)
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }

  addPictures(responseData) {
    console.log("Data", responseData)
    const newPosts = this.state.posts;

    // For each new image
    responseData.forEach(url => {
      let info = url.split('/');
      let breed = info[4];
      console.log(breed, url);

      // add breed to dict if it does not exist
      if(!this.state.breeds[breed]) {
        this.setState({
          breedOptions: [...this.state.breedOptions, breed],
          breeds: {
            ...this.state.breeds,
            [breed]: []
          }
        });
      } 
      
      // add unique new images to breeds and posts
      if(!this.state.breeds[breed].includes(url)) {
        newPosts.push(url);
        this.setState({
          breeds: {
            ...this.state.breeds,
            [breed]: [...this.state.breeds[breed], url]
          }
        });
      }
      })
    

    this.setState({
      posts: newPosts,
      hasMore: true, 
      page: this.state.page + 1 
    });
  }

  onSelect(e) {
    this.setState({
      breed: e.value
    });
  }

  renderPosts() {
    // Get HTML for each post in posts
    // const postURL = `/api/v1/p/<post_id>`;
    const arr = this.state.breed === "all" ? this.state.posts: this.state.breeds[this.state.breed];
    const result = arr && arr.map((post) => {
      return (
      
          <img height="200px" src={post} alt="dog"/>

      )
    });
    return result;
  }

  render() {
    // Render number of likes
    return (
      <div className="feed">
        <Dropdown
          options={this.state.breedOptions}
          onChange={e => this.onSelect(e)}
          value={this.state.breed}
          placeholder="Select an option" 
        />
        <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <div width="200px">
            {this.renderPosts()}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

Feed.propTypes = {
  breed: PropTypes.string,
};

export default Feed;