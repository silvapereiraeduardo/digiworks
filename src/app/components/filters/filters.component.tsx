import React from 'react';
import {FilterWrapperStyled} from './filters.styles';
import FieldsWrapper from '../fields-wrapper';

const Filters = () => (
  <FilterWrapperStyled>
    <FieldsWrapper>
      <div className="field w-50">
        <label htmlFor="start-date">Data Inicial</label>
        <input type="date" name="start-date" id="start-picker"/>
      </div>
      <div className="field w-50">
        <label htmlFor="end-date">Data Final</label>
        <input type="date" name="end-date" id="end-picker"/>
      </div>
    </FieldsWrapper>
  </FilterWrapperStyled>
);

export default Filters;
