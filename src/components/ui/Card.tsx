import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'flat' | 'elevated' | 'ghost' | 'outline';
export type CardPadding = 'sm' | 'md' | 'lg' | 'none';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  clickable?: boolean;
  as?: React.ElementType;
}

function Card({ variant = 'default', padding = 'md', clickable, className, children, as: Tag = 'div', ...props }: CardProps) {
  return (
    <Tag
      className={clsx(
        styles.root,
        variant !== 'default' && styles[variant],
        padding !== 'md' && styles[`p-${padding}`],
        clickable && styles.clickable,
        className,
      )}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.header, className)} {...props}>{children}</div>;
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <div className={clsx(styles.title, className)} {...props}>{children}</div>;
}

function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx(styles.description, className)} {...props}>{children}</p>;
}

function CardActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.actions, className)} {...props}>{children}</div>;
}

function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.body, className)} {...props}>{children}</div>;
}

function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.footer, className)} {...props}>{children}</div>;
}

function CardDivider() {
  return <hr className={styles.divider} />;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Actions = CardActions;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Divider = CardDivider;

export default Card;
