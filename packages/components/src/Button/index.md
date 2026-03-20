---
category: Components
title: Button
subtitle: 按钮
toc: content
group: 通用
---

# Button 按钮

按钮用于触发一个操作或事件，例如提交表单、打开对话框、取消操作等。

## 代码演示

### 按钮类型

<code src="./demos/basic.tsx">基础用法</code>

### 按钮尺寸

<code src="./demos/size.tsx">尺寸</code>

### 图标按钮

<code src="./demos/icon.tsx">图标</code>

### 加载中

<code src="./demos/loading.tsx">加载状态</code>

### 危险按钮

<code src="./demos/danger.tsx">危险按钮</code>

### 幽灵按钮

<code src="./demos/ghost.tsx">幽灵按钮</code>

### 按钮形状

<code src="./demos/shape.tsx">形状</code>

### 多态渲染

<code src="./demos/as-child.tsx">asChild & href</code>

## API

| 属性          | 说明                     | 类型                                                   | 默认值    |
| ------------- | ------------------------ | ------------------------------------------------------ | --------- |
| type          | 按钮类型                 | `default` \| `primary` \| `dashed` \| `text` \| `link` | `default` |
| shape         | 按钮形状                 | `default` \| `circle` \| `round`                       | `default` |
| size          | 按钮大小                 | `small` \| `middle` \| `large`                         | `middle`  |
| danger        | 危险按钮                 | `boolean`                                              | `false`   |
| ghost         | 幽灵按钮（背景透明）     | `boolean`                                              | `false`   |
| block         | 撑满父容器宽度           | `boolean`                                              | `false`   |
| disabled      | 禁用                     | `boolean`                                              | `false`   |
| loading       | 加载状态                 | `boolean \| { delay: number }`                         | `false`   |
| icon          | 图标                     | `ReactNode`                                            | -         |
| iconPlacement | 图标位置                 | `start` \| `end`                                       | `start`   |
| href          | 链接地址（渲染为 `<a>`） | `string`                                               | -         |
| target        | 链接打开方式             | `string`                                               | -         |
| htmlType      | 原生 button 的 type      | `submit` \| `button` \| `reset`                        | `button`  |
| asChild       | 多态渲染                 | `boolean`                                              | `false`   |
| onClick       | 点击事件                 | `(e) => void`                                          | -         |
