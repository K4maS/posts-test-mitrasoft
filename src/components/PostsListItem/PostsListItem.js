import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import PostCommentsModule from '../../modules/PostCommentsModule/PostCommentsModule';
import { Link } from 'react-router-dom';
import { openCommentsForPost, getComments, closeCommentsForPost, updatePageLoaded, GET_COMMENTS } from '../../store/toolkitSllice';
import './PostsListItem.scss';
import { userPath } from '../../api/paths';

function PostsListItem(props) {
    const dispath = useDispatch();
    const posts = useSelector((state) => state.toolkit.postsPaged);
    const currentPage = useSelector((state) => state.toolkit.currentPage)
    const getIndex = (id) => {
        const getElem = posts[currentPage].data.find((elem) => elem.id === id);
        const index = posts[currentPage].data.indexOf(getElem);
        return index;

    }
    const openComments = (id) => {
        const index = getIndex(id);
        dispath({ type: GET_COMMENTS, id });
        dispath(openCommentsForPost({ id, index }));
    }
    const closeComments = (id) => {
        const index = getIndex(id);
        dispath(closeCommentsForPost({ id, index }))
    }

    return (
        <div className="card mb-3" style={{ maxWidth: '100%' }}>
            <div className="row g-0">
                <div className="col-md-3 col-lg-2">
                    {props.user &&
                        <Link className='card__user-link' to={userPath + '/' + props.post.userId}
                            onClick={() => {
                                dispath(updatePageLoaded(false));
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                        >
                            <img src={props.user.avatar} className="img-fluid" alt="avatar"
                                style={{ maxWidth: '150px', borderRadius: '100%', padding: '16px' }} />
                            <p className="card-text card__username">{props.user.username}</p>
                        </Link>}

                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.post.title}</h5>
                        <p className="card-text">{props.post.body}</p>
                        <p className="card-text"><small className="text-body-secondary">Post#{props.post.id}</small></p>
                        {!props.post.comments ?
                            <button className="btn btn-primary" onClick={() => openComments(props.post.id)}>
                                Показать комментарии
                            </button>
                            :
                            <button className="btn btn-primary" onClick={() => closeComments(props.post.id)}>
                                Скрыть комментарии
                            </button>
                        }
                    </div>
                </div>
            </div>
            {props.post.comments &&
                <div>
                    <PostCommentsModule id={props.post.id} />
                </div>
            }
        </div>
    );
}

export default PostsListItem;
