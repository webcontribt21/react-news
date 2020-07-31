import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { HNItem, HNItemPropType } from 'types';
import ItemListDetail from './ItemListDetail';

interface ItemListProps {
  items?: Array<HNItem>;
}

interface PageClickProps {
  selected: number;
}

const ITEMS_PER_PAGE = 10;

const ItemList: React.FC<ItemListProps> = ({ items }: ItemListProps) => {
  const [page, setPage] = useState(0);

  const handlePageClick = ({ selected }: PageClickProps): void => {
    setPage(selected);
  };

  const filteredItems = items?.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

  return (
    <ul>
      {items && items.length > 0 ? (
        <>
          <div className="list-group mb-2">
            {filteredItems.map((item: HNItem) => (
              <ItemListDetail key={item.id} item={item} />
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel="&laquo;"
              nextLabel="&raquo;"
              breakLabel={'...'}
              pageCount={Math.ceil(items.length / ITEMS_PER_PAGE)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
            />
          </div>
        </>
      ) : (
        <div className="alert alert-info">No data</div>
      )}
    </ul>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(HNItemPropType),
};

export default ItemList;
