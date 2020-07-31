import React from 'react';
import { Link } from 'react-router-dom';
import { HNItemPropType, HNItem } from 'types';
import { formatDate } from 'common/utils';

interface ItemListDetailProps {
  item: HNItem;
}

const ItemListDetail: React.FC<ItemListDetailProps> = ({ item }: ItemListDetailProps) => {
  const { title, url, time, id, descendants, score } = item;

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <a href={url} className="mb-1" target="_blank" rel="noopener noreferrer">
          <h5>{title}</h5>
        </a>
        <small>on {formatDate(time)}</small>
      </div>
      <div className="mb-1 text-secondary">
        <span>{score} votes</span>{' '}
        {typeof descendants === 'number' && (
          <span>
            with{' '}
            <Link
              to={{
                pathname: `/story/${id}`,
                state: {
                  item: item,
                },
              }}
            >
              {descendants}
            </Link>{' '}
            comments
          </span>
        )}
      </div>
    </div>
  );
};

ItemListDetail.propTypes = {
  item: HNItemPropType.isRequired,
};

export default ItemListDetail;
