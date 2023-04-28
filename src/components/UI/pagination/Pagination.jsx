import React from 'react';
import { usePagesArray } from '../../../hooks/usePagesArray';

export const Pagination = ({totalPages, page, changePage}) => {
  const pagesArray = usePagesArray(totalPages);

  return (
    <div className='page__wrapper'>
      {pagesArray.map(p =>
        <span
          key={p}
          className={page === p ? 'page page__current' : 'page'}
          onClick={() => changePage(p)}
        >
          {p}
        </span>
      )}
    </div>
  )
}
