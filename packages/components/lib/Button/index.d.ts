import { Button as AntButton } from 'antd';
import React from 'react';
export type ButtonProps = React.ComponentProps<typeof AntButton> & {
    dangerLight?: boolean;
};
export declare const Button: React.FC<ButtonProps>;
export default Button;
