import * as PropTypes from 'prop-types';

type HNItemType = string | 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface HNItem {
  id: number;
  deleted?: boolean;
  type?: HNItemType;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: Array<number>;
  url?: string;
  score?: number;
  title?: string;
  parts?: Array<number>;
  descendants?: number;
}

export const HNItemPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  deleted: PropTypes.bool,
  type: PropTypes.string,
  by: PropTypes.string,
  time: PropTypes.number,
  text: PropTypes.string,
  dead: PropTypes.bool,
  parent: PropTypes.number,
  poll: PropTypes.number,
  kids: PropTypes.arrayOf(PropTypes.number),
  url: PropTypes.string,
  score: PropTypes.number,
  title: PropTypes.string,
  parts: PropTypes.arrayOf(PropTypes.number),
  descendants: PropTypes.number,
});
