import type { ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'sm';
  icon?: ReactNode;
  pressed?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export interface StatusBadgeProps {
  status?: 'ok' | 'warn' | 'fail' | 'info' | 'neutral';
  children: ReactNode;
}

export interface PanelProps {
  title: string;
  actions?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  /** Controlled open state of a collapsible panel; report changes with onToggle. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  flush?: boolean;
  children?: ReactNode;
}

export interface TreeNode {
  id: string;
  label: string;
  group?: boolean;
  icon?: ReactNode;
  meta?: string | number;
  children?: TreeNode[];
}
export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string;
  defaultExpanded?: string[];
  onSelect?: (id: string, node: TreeNode) => void;
}

export type SelectOption = string | { value: string; label: string } | { label: string; options: (string | { value: string; label: string })[] };

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  labelledBy?: string;
  onChange?: (value: string) => void;
}

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  labelledBy?: string;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
}

export interface TabsProps {
  tabs: { id: string; label: string; meta?: string | number }[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
}

export interface PropertyRow {
  label: string;
  /** A string, number or node. For `select`, the current option value; for `checkbox`, a boolean. */
  value: ReactNode;
  unit?: string;
  key?: string;
  numeric?: boolean;
  /** Shorthand for control: 'input'. */
  editable?: boolean;
  control?: 'input' | 'select' | 'checkbox';
  options?: SelectOption[];
  placeholder?: string;
}
export interface PropertyGridProps {
  /** A `collapsible` group folds to its title; `open` controls it (with onGroupToggle), else `defaultOpen`. */
  groups: { title?: string; collapsible?: boolean; open?: boolean; defaultOpen?: boolean; rows: PropertyRow[] }[];
  onChange?: (key: string, value: string) => void;
  onGroupToggle?: (title: string, open: boolean) => void;
}

export interface DataColumn {
  key: string;
  label: string;
  unit?: string;
  width?: string;
  numeric?: boolean;
  mono?: boolean;
  render?: (value: any, row: any) => ReactNode;
}
export interface DataTableProps {
  columns: DataColumn[];
  rows: ({ id: string } & Record<string, any>)[];
  selectedId?: string;
  density?: 'default' | 'compact';
  onSelect?: (id: string, row: any) => void;
}

export interface ContourLegendProps {
  title: string;
  unit?: string;
  min?: number;
  max?: number;
  scale?: 'sequential' | 'diverging';
  ticks?: number;
  decimals?: number;
  height?: number;
  note?: string;
}

export interface AppShellProps {
  toolbar?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  statusbar?: ReactNode;
  overlays?: { topLeft?: ReactNode; topRight?: ReactNode; bottomLeft?: ReactNode; bottomRight?: ReactNode };
  leftWidth?: string;
  rightWidth?: string;
  bottomHeight?: string;
  leftLabel?: string;
  rightLabel?: string;
  bottomLabel?: string;
  /** Folded regions: a side becomes a rail, the drawer a bar; both open again through onToggle. */
  collapsed?: { left?: boolean; right?: boolean; bottom?: boolean };
  onToggle?: (region: 'left' | 'right' | 'bottom') => void;
  /** Gives open regions a drag handle; px is the new width (sides) or height (bottom). */
  onResize?: (region: 'left' | 'right' | 'bottom', px: number) => void;
  /** The model view: the three.js viewer (awatif-viewer.js). Fills the viewport. */
  children?: ReactNode;
}
