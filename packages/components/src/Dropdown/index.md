---
category: Components
title: Dropdown
subtitle: 下拉菜单
toc: content
group: 导航
---

# Dropdown 下拉菜单

向下弹出的列表，用于命令集合或操作列表。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 弹出位置

<code src="./demos/placement.tsx">位置</code>

### 点击触发

<code src="./demos/trigger.tsx">触发方式</code>

## API

| 属性         | 说明           | 类型                                      | 默认值       |
| ------------ | -------------- | ----------------------------------------- | ------------ |
| items        | 菜单项         | `MenuItemType[]`                          | `[]`         |
| trigger      | 触发方式       | `('hover' \| 'click' \| 'contextMenu')[]` | `['hover']`  |
| open         | 受控显示       | `boolean`                                 | -            |
| onOpenChange | 显示变化回调   | `(open) => void`                          | -            |
| placement    | 弹出位置       | `bottomLeft` \| `bottomRight` 等          | `bottomLeft` |
| disabled     | 禁用           | `boolean`                                 | `false`      |
| autoClose    | 点击后自动关闭 | `boolean`                                 | `true`       |

### MenuItemType

| 属性     | 说明     | 类型                  |
| -------- | -------- | --------------------- |
| key      | 唯一标识 | `string`              |
| label    | 菜单内容 | `ReactNode`           |
| icon     | 图标     | `ReactNode`           |
| disabled | 禁用     | `boolean`             |
| danger   | 危险     | `boolean`             |
| type     | 类型     | `'item' \| 'divider'` |
