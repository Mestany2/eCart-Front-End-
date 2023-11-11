import React from 'react';
import PropTypes from 'prop-types';
import ItemForm from '../components/forms/ItemForm';

export default function ItemFormPage({ itemObj }) {
  return (
    <ItemForm itemObj={itemObj} />
  );
}

ItemFormPage.propTypes = {
  itemObj: PropTypes.shape({
  }),
};

ItemFormPage.defaultProps = {
  itemObj: {},
};
