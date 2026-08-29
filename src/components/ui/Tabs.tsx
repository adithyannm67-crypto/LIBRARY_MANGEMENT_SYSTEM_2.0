"use client";

import { useSearchParams, useRouter } from 'next/navigation';

import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
  panelClassName?: string;
}

export default function Tabs({
  items,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  variant = 'underline',
  className,
  panelClassName,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? items[0]?.id);
  const active = controlledTab ?? internalTab;

  function selectTab(id: string) {
    setInternalTab(id);
    onChange?.(id);
    setTab(id);
  }

  // const activeItem = items.find(i => i.id === active);

  const params=useSearchParams();
  const router=useRouter();
  const activeItem = items.find(i => i.id === params.get('tab'));

  const setTab=(tab:string)=>{
    const p = new URLSearchParams(params);
    p.set('tab',tab);
    router.replace(`?${p}`);
  }

  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.list, variant === 'pills' && styles.pills)} role="tablist">
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            disabled={item.disabled}
            onClick={() => !item.disabled && selectTab(item.id)}
            className={clsx(
              styles.tab,
              active === item.id && styles.active,
              item.disabled && styles.disabled,
            )}
          >
            {item.icon && item.icon}
            {item.label}
            {item.badge != null && (
              <span className={styles.tabBadge}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      {activeItem?.content != null && (
        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className={clsx(styles.panel, panelClassName)}
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
