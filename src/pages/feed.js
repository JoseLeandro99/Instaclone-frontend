import React, { Component } from 'react';
import io from 'socket.io-client';

import './feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';

import api from '../services/api';

export default class Feed extends Component {

    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();
        const response = await api.get('/post');
        this.setState({ feed: response.data });
    }

    handleLike = async id => {
        await api.post(`post/${id}/like`);
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');
        
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        });

        socket.on('like', newLike => {
            this.setState({
                feed: this.state.feed.map(post => (
                    post._id === newLike._id ? newLike : post
                ))
            });
        });
    }

    render() {
        const { feed } = this.state;
        return(
            <section id="post-list">
                {feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="Mais" />
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                        <footer>
                            <div className="actions">
                                <button onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="Mais" />
                                </button>
                                <img src={comment} alt="Mais" />
                                <img src={send} alt="Mais" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ))}
            </section>
        );
    }
}