---
category: Components
title: Modal
subtitle: 对话框
toc: content
group: 反馈
---

# Modal 对话框

模态对话框，在不离开当前页面的情况下展示信息或请求用户操作。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 自定义页脚

<code src="./demos/footer.tsx">自定义 Footer</code>

### 异步关闭

<code src="./demos/async-close.tsx">异步关闭</code>

## API

| 属性           | 说明                  | 类型                | 默认值   |
| -------------- | --------------------- | ------------------- | -------- |
| open           | 是否可见              | `boolean`           | `false`  |
| title          | 标题                  | `ReactNode`         | -        |
| footer         | 底部内容（null 隐藏） | `ReactNode \| null` | 默认按钮 |
| width          | 宽度                  | `number \| string`  | `520`    |
| centered       | 垂直居中              | `boolean`           | `false`  |
| closable       | 关闭按钮              | `boolean`           | `true`   |
| maskClosable   | 点遮罩关闭            | `boolean`           | `true`   |
| keyboard       | ESC 关闭              | `boolean`           | `true`   |
| confirmLoading | 确认按钮 loading      | `boolean`           | `false`  |
| okText         | 确认文字              | `string`            | `确定`   |
| cancelText     | 取消文字              | `string`            | `取消`   |
| onOk           | 确认回调              | `(e) => void`       | -        |
| onCancel       | 取消回调              | `(e) => void`       | -        |
