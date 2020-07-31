import React from 'react';
import PropTypes from 'prop-types';
import { HNItemPropType, HNItem } from 'types';
import { formatDate } from 'common/utils';

interface CommentProps {
  comment: HNItem;
  depth: number;
}

const Comment: React.FC<CommentProps> = ({ comment, depth }: CommentProps) => {
  const { by, time, text } = comment;

  return (
    <div className="media" style={{ marginLeft: 64 * depth }}>
      <div className="media-body">
        <div className="mb-1 text-secondary">
          <span>by {by}</span> <span>on {formatDate(time)}</span>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: HNItemPropType.isRequired,
  depth: PropTypes.number.isRequired,
};

export default Comment;
