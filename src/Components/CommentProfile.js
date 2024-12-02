import React from 'react';
import './CommentProfile.css';
import { useNavigate } from 'react-router-dom';

const CommentProfile = ({ avatar, username, content, nomeFilme, reviewId }) => {
    const navigate = useNavigate();

    return (
        <div className="comment-container" onClick={() => {
            navigate(`/review?review-id=${reviewId}`)
        }}>
            <img src={avatar} alt={`${username}'s avatar`} className="comment-avatar" />
            <div className="comment-content">
                <div className="primeira-linha-content-comment">
                    <h4 className="comment-username">{username}</h4>
                    <h4 className="comment-nome-filme">{nomeFilme}</h4>
                </div>
                <p className="comment-text">{content}</p>
            </div>
        </div>
    );
};

export default CommentProfile;
