import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchComments } from 'common/api';
import { HNItemPropType, HNItem } from 'types';
import Comment from './Comment';

interface CommentListProps {
  parent: HNItem;
  depth?: number;
}

interface CommentListReducerState {
  comments: Array<HNItem>;
  loading: boolean;
  hasMore: boolean;
  loadedComments: Array<HNItem>;
  error: string;
}

const COMMENTS_TO_LOAD = 5;

type CommentListReducerActions =
  | { type: 'success'; comments: Array<HNItem> }
  | { type: 'error'; error: string }
  | { type: 'addMorePosts' };

const commentListReducer = (
  state: CommentListReducerState,
  action: CommentListReducerActions
): CommentListReducerState => {
  switch (action.type) {
    case 'success': {
      return {
        ...state,
        comments: action.comments,
        loading: false,
        loadedComments: action.comments.slice(0, COMMENTS_TO_LOAD),
        hasMore: action.comments.length > 0 ? true : false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: action.error,
        loading: false,
        hasMore: false,
      };
    }
    case 'addMorePosts': {
      const { loadedComments, comments, loading, error } = state;
      const newLength = loadedComments.length + COMMENTS_TO_LOAD;
      const newComments = comments.slice(0, newLength);

      return {
        ...state,
        loadedComments: newComments,
        hasMore: comments.length > newLength ? true : false,
        comments,
        loading,
        error,
      };
    }
  }
};

const CommentList: React.FC<CommentListProps> = ({ parent, depth = -1 }: CommentListProps) => {
  const [state, dispatch] = useReducer(commentListReducer, {
    comments: [],
    loading: true,
    hasMore: false,
    loadedComments: [],
    error: null,
  });

  useEffect(() => {
    fetchComments(parent.kids || [])
      .then((comments: Array<HNItem>): void =>
        dispatch({
          type: 'success',
          comments,
        })
      )
      .catch(({ message }: { message: string }): void =>
        dispatch({
          type: 'error',
          error: message,
        })
      );
  }, [parent]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div className="alert alert-danger">{state.error}</div>;
  }

  return (
    <React.Fragment>
      {depth !== -1 && <Comment comment={parent} depth={depth} />}
      <InfiniteScroll
        dataLength={state.loadedComments.length}
        next={() => dispatch({ type: 'addMorePosts' })}
        hasMore={state.hasMore}
        loader={<div>Loading more comments</div>}
      >
        {state.loadedComments.map((comment: HNItem) => (
          <CommentList key={comment.id} parent={comment} depth={depth + 1} />
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

CommentList.propTypes = {
  parent: HNItemPropType.isRequired,
  depth: PropTypes.number,
};

export default CommentList;
