import React from 'react';
import {FieldsWrapperStyled} from './fields-wrapper.styles';

const FieldsWrapper: React.FunctionComponent = ({ children }) => (
  <FieldsWrapperStyled>{children}</FieldsWrapperStyled>
);

export default FieldsWrapper;
