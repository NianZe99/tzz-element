---
category: Components
title: Message
subtitle: 全局提示
toc: content
group: 反馈
---

# Message 全局提示

全局展示操作反馈信息。顶部居中显示并自动消失，是一种轻量级的反馈方式。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 不同类型

<code src="./demos/types.tsx">类型</code>

### 自定义时长

<code src="./demos/duration.tsx">时长</code>

## API

组件提供了命令式的调用方法：

- `message.success(content, [duration])`
- `message.error(content, [duration])`
- `message.info(content, [duration])`
- `message.warning(content, [duration])`
- `message.loading(content, [duration])`
- `message.destroy(key?)`

### MessageConfig

也可以传入对象进行更精细的控制：

| 属性     | 说明                      | 类型         | 默认值 |
| -------- | ------------------------- | ------------ | ------ |
| content  | 提示内容                  | `ReactNode`  | -      |
| duration | 自动关闭秒数（0 不关闭）  | `number`     | `3`    |
| icon     | 自定义图标                | `ReactNode`  | -      |
| key      | 唯一标识（用于更新/关闭） | `string`     | -      |
| onClose  | 关闭回调                  | `() => void` | -      |
