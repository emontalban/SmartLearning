import React, { Component } from 'react';

 class Post extends Component {

    renderTopic(){
        let topics = this.props.tags.map((topic, index) =>{
            return <span className='post-topic' key={index}>{topic}</span>
        })
        return topics;

    }

    render() {
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
    }
}
export default Post