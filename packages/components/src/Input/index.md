---
category: Components
title: Input
subtitle: 输入框
toc: content
group: 数据录入
---

# Input 输入框

通过键盘输入内容，是最基础的表单域包装。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 三种大小

<code src="./demos/size.tsx">尺寸</code>

### 前缀和后缀

<code src="./demos/prefix-suffix.tsx">前缀/后缀</code>

### 校验状态

<code src="./demos/status.tsx">状态</code>

### 文本域

<code src="./demos/textarea.tsx">TextArea</code>

## API

### Input

| 属性       | 说明     | 类型                                   | 默认值     |
| ---------- | -------- | -------------------------------------- | ---------- |
| size       | 尺寸     | `small` \| `middle` \| `large`         | `middle`   |
| variant    | 形态变体 | `outlined` \| `filled` \| `borderless` | `outlined` |
| status     | 校验状态 | `error` \| `warning`                   | -          |
| prefix     | 前缀图标 | `ReactNode`                            | -          |
| suffix     | 后缀图标 | `ReactNode`                            | -          |
| allowClear | 可清空   | `boolean`                              | `false`    |
| disabled   | 禁用     | `boolean`                              | `false`    |

### TextArea

| 属性      | 说明       | 类型                              | 默认值  |
| --------- | ---------- | --------------------------------- | ------- |
| autoSize  | 自适应高度 | `boolean \| { minRows, maxRows }` | `false` |
| showCount | 显示字数   | `boolean`                         | `false` |
| maxLength | 最大长度   | `number`                          | -       |
