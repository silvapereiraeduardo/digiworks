import React, { FunctionComponent } from 'react';
import {LoadingPropTypes} from './loading.models';
import {LoadingDivStyled, LoadingBarStyled, LoadingDivLogoStyled} from './loading.styles';

const Loading: FunctionComponent<LoadingPropTypes> = ({ active }) => {
  return !active ? null : (
    <LoadingDivStyled>
      <LoadingBarStyled>
        <div>
          <LoadingDivLogoStyled src="assets/images/digifred_avatar.png" height="32" />
        </div>
        <div>
          <img src="assets/images/ajax-loader.gif" alt="carregando..." />
        </div>
      </LoadingBarStyled>
    </LoadingDivStyled>
  );
}

export default Loading;
