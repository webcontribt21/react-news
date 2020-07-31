import React, { useReducer, useEffect } from 'react';
import { fetchTopStories } from 'common/api';
import { HNItem } from 'types';
import ItemList from 'components/ItemList';

interface StoryListReducerState {
  items: Array<HNItem>;
  error: string;
  loading: boolean;
}

type StoryListReducerActions =
  | { type: 'request' }
  | { type: 'success'; items: Array<HNItem> }
  | { type: 'error'; message: string };

const pageReducer = (
  state: StoryListReducerState,
  action: StoryListReducerActions
): StoryListReducerState => {
  switch (action.type) {
    case 'request': {
      return { items: null, error: null, loading: true };
    }
    case 'success': {
      return { items: action.items, error: null, loading: false };
    }
    case 'error': {
      return { ...state, loading: false, error: action.message };
    }
  }
};

const StoryList: React.FC = () => {
  const [state, dispatch] = useReducer(pageReducer, {
    items: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: 'request' });
    fetchTopStories()
      .then((items: Array<HNItem>): void => {
        dispatch({ type: 'success', items });
      })
      .catch(({ message }: { message: string }): void => dispatch({ type: 'error', message }));
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div className="alert alert-danger">{state.error}</div>;
  }

  return <ItemList items={state.items} />;
};

export default StoryList;
