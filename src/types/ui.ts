// Common UI prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationItem {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}