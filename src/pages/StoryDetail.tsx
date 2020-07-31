import React, { useReducer, useEffect } from 'react';
import { RouteComponentProps, useParams, Link } from 'react-router-dom';
import { fetchItem } from 'common/api';
import CommentList from 'components/CommentList';
import { HNItem } from 'types';

interface StoryDetailReducerState {
  story: HNItem;
  loading: boolean;
  error: string;
}

type StoryDetailProps = RouteComponentProps & {
  location: { state: { item?: HNItem } };
};

type StoryDetailReducerActions =
  | { type: 'fetch'; story: HNItem }
  | { type: 'success'; story: HNItem }
  | { type: 'error'; message: string };

const pageReducer = (
  state: StoryDetailReducerState,
  action: StoryDetailReducerActions
): StoryDetailReducerState => {
  switch (action.type) {
    case 'fetch': {
      return {
        ...state,
        story: action.story,
        loading: false,
      };
    }
    case 'success': {
      return {
        ...state,
        story: action.story,
        loading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: action.message,
        loading: false,
      };
    }
  }
};

const StoryDetail: React.FC<StoryDetailProps> = ({ location, history }: StoryDetailProps) => {
  const [state, dispatch] = useReducer(pageReducer, {
    story: null,
    loading: true,
    error: null,
  });
  const { id } = useParams();

  useEffect(() => {
    const item = location.state?.item;
    if (item) {
      dispatch({ type: 'fetch', story: item });
    } else {
      const numId = parseInt(id as string, 10);

      fetchItem(numId)
        .then((story): void => {
          if (!story) {
            throw new Error('Story not found.');
          }
          dispatch({ type: 'success', story });
        })
        .catch(({ message }: { message: string }): void => dispatch({ type: 'error', message }));
    }
  }, [history, id, location]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div className="alert alert-danger">{state.error}</div>;
  }

  return (
    <>
      <Link to="/" className="mb-2">
        Back
      </Link>
      <h3>
        <a href={state.story.url} target="_blank" rel="noopener noreferrer">
          {state.story.title}
        </a>
      </h3>
      <div className="mb-1 text-secondary">
        <span>{state.story.score} votes</span>{' '}
        {typeof state.story.descendants === 'number' && (
          <span>with {state.story.descendants} comments</span>
        )}
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: state.story.text,
        }}
      />
      <CommentList parent={state.story} />
    </>
  );
};
export default StoryDetail;
