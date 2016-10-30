import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, resetDeletedPost, deletePost, deletePostSuccess, deletePostFailure } from '../actions/posts';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return {
    deletedPost: state.posts.deletedPost,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
    	dispatch(deletePost(ownProps.postId))
      	.then((response) => {
            !response.error ? dispatch(deletePostSuccess(response.payload)) : dispatch(deletePostFailure(response.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedPost());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
