import React, { Component } from 'react';

 class Post extends Component {

    renderTopic(){
        let topics = this.props.tags.map((topic, index) =>{
            return <span className='post-topic' key={index}>{topic}</span>
        })
        return topics;

    }
    renderReactions() {
        const reactions = this.props.reactions || {};
        const likes = typeof reactions === 'object' ? reactions.likes || 0 : reactions;
        const dislikes = typeof reactions === 'object' ? reactions.dislikes || 0 : 0;

        return (
            <div className="post-reactions">
            <span className="post-reactions__likes">Likes: {likes}</span>
            <span className="post-reactions__dislikes">Dislikes: {dislikes}</span>
            </div>
        );
    }

    render() {
        
        if(this.props.type === 'recent') {
        return (
        <div>
            <li className='recent-post'>
                <div className='recent-post-title'>
                    {this.props.title}
                </div>
                <div className='recent-post__topics'>
                  TAGS:  {this.renderTopic()}
                </div>
            </li>
        </div>
        );

        }else if(this.props.type === 'result') {
            return (
                <li className="result-post">
                    <div className="result-post__topics">
                        {this.renderTopic()}
                    </div>
                    <div className="result-post__title">
                        {this.props.title}
                    </div>
                    
                    <div className="result-post__reactions">
                        {this.renderReactions()}
                    </div>
                </li>
            )
        }
        return null;
    }
}
export default Post