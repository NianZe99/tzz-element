import { Button as AntButton } from 'antd';
import React from 'react';

export type ButtonProps = React.ComponentProps<typeof AntButton> & {
  dangerLight?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ dangerLight, ...props }) => {
  return <AntButton {...props} danger={dangerLight ?? props.danger} />;
};
export default Button;
