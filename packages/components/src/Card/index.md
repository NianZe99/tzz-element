---
category: Components
title: Card
subtitle: 卡片
toc: content
group: 数据展示
---

# Card 卡片

通用卡片容器，可承载文字、列表、图片、段落等。

## 代码演示

### 典型卡片

<code src="./demos/basic.tsx">基础</code>

### 无边框

<code src="./demos/bordered.tsx">无边框</code>

### 鼠标悬停

<code src="./demos/hoverable.tsx">可悬浮</code>

### 带操作区

<code src="./demos/with-actions.tsx">操作卡片</code>

## API

### Card

| 属性      | 说明         | 类型                 | 默认值    |
| --------- | ------------ | -------------------- | --------- |
| title     | 标题         | `ReactNode`          | -         |
| extra     | 右上角操作区 | `ReactNode`          | -         |
| cover     | 封面图       | `ReactNode`          | -         |
| size      | 尺寸         | `default` \| `small` | `default` |
| bordered  | 是否有边框   | `boolean`            | `true`    |
| hoverable | 悬浮抬起     | `boolean`            | `false`   |
| actions   | 底部操作区   | `ReactNode[]`        | -         |
| loading   | 加载骨架屏   | `boolean`            | `false`   |

### Card.Meta

| 属性        | 说明 | 类型        | 默认值 |
| ----------- | ---- | ----------- | ------ |
| avatar      | 头像 | `ReactNode` | -      |
| title       | 标题 | `ReactNode` | -      |
| description | 描述 | `ReactNode` | -      |
