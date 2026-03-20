---
category: Components
title: Tooltip
subtitle: 文字提示
toc: content
group: 数据展示
---

# Tooltip 文字提示

简单的文字提示气泡框。鼠标移入则显示提示，移出消失。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 位置

<code src="./demos/placement.tsx">位置</code>

### 触发方式

<code src="./demos/trigger.tsx">触发</code>

## API

| 属性            | 说明              | 类型                                            | 默认值  |
| --------------- | ----------------- | ----------------------------------------------- | ------- |
| title           | 提示文字          | `ReactNode`                                     | -       |
| placement       | 位置              | `top` \| `bottom` \| `left` \| `right` 等 12 种 | `top`   |
| trigger         | 触发方式          | `hover` \| `click` \| `focus`                   | `hover` |
| open            | 受控显示          | `boolean`                                       | -       |
| defaultOpen     | 默认显示          | `boolean`                                       | `false` |
| onOpenChange    | 显示变化回调      | `(open) => void`                                | -       |
| arrow           | 是否显示箭头      | `boolean`                                       | `true`  |
| color           | 背景色            | `string`                                        | -       |
| mouseEnterDelay | 鼠标进入延迟 (ms) | `number`                                        | `100`   |
| mouseLeaveDelay | 鼠标离开延迟 (ms) | `number`                                        | `100`   |
