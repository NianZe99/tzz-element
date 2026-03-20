---
category: Components
title: Space
subtitle: 间距
toc: content
group: 布局
---

# Space 间距

设置组件之间的间距，避免手动设置 margin。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 垂直间距

<code src="./demos/direction.tsx">垂直</code>

### 间距大小

<code src="./demos/size.tsx">尺寸</code>

### 紧凑布局

<code src="./demos/compact.tsx">Space.Compact</code>

## API

### Space

| 属性      | 说明     | 类型                                                                   | 默认值       |
| --------- | -------- | ---------------------------------------------------------------------- | ------------ |
| size      | 间距大小 | `small` \| `middle` \| `large` \| `number` \| `[SpaceSize, SpaceSize]` | `middle`     |
| direction | 排列方向 | `horizontal` \| `vertical`                                             | `horizontal` |
| align     | 对齐方式 | `start` \| `end` \| `center` \| `baseline`                             | -            |
| wrap      | 是否换行 | `boolean`                                                              | `false`      |
| split     | 分隔符   | `ReactNode`                                                            | -            |

### Space.Compact

| 属性      | 说明     | 类型                       | 默认值       |
| --------- | -------- | -------------------------- | ------------ |
| direction | 排列方向 | `horizontal` \| `vertical` | `horizontal` |
| block     | 是否撑满 | `boolean`                  | `false`      |
