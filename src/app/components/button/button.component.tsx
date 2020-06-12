import React from 'react';
import {ButtonStyled} from './button.styles';

type ButtonPropTypes = {
  onClick: any;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FunctionComponent<ButtonPropTypes> = ({
                                                            onClick,
                                                            type,
                                                            children,
                                                            className = ''
                                                          }) => (
  <ButtonStyled className={className} type={type} onClick={onClick}>{children}</ButtonStyled>
);

export default Button;
