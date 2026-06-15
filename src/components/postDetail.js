import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Logo from './logo';

class PostDetail extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        const currentPostId = this.props.match.params.id;
        const previousPostId = prevProps.match.params.id;

        if(currentPostId !== previousPostId) {
            this.props.fetchPost(currentPostId);
        }
    }

    renderTags(tags = []) {
        return tags.map((tag, index) => {
            return <span className="post-topic" key={index}>{tag}</span>
        });
    }

    renderReactions(reactions = {}) {
        const likes = typeof reactions === 'object' ? reactions.likes || 0 : reactions;
        const dislikes = typeof reactions === 'object' ? reactions.dislikes || 0 : 0;

        return (
            <div className="post-detail__stats">
                <span>Likes: {likes}</span>
                <span>Dislikes: {dislikes}</span>
            </div>
        );
    }

    render() {
        const { selectedPost } = this.props;

        if(!selectedPost) {
            return (
                <div className="post-detail-page">
                    <Logo size={55}/>
                    <div className="post-detail">Loading post...</div>
                </div>
            );
        }

        return (
            <div className="post-detail-page">
                <Logo size={55}/>
                <article className="post-detail">
                    <Link className="post-detail__back" to="/results">Back to results</Link>
                    <div className="post-detail__topics">
                        {this.renderTags(selectedPost.tags)}
                    </div>
                    <h1>{selectedPost.title}</h1>
                    <p className="post-detail__body">{selectedPost.body}</p>
                    {this.renderReactions(selectedPost.reactions)}
                    <div className="post-detail__meta">
                       
                        <span>Views: {selectedPost.views || 0}</span>
                    </div>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedPost: state.posts.selectedPost
    }
}

export default connect(mapStateToProps, actions)(PostDetail);

