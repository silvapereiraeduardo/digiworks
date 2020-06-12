import React from 'react';
import {Version} from './footer.styles';

const Footer = () => (
  <Version>{`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`}</Version>
);

export default Footer;
