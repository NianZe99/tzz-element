---
category: Components
title: Switch
subtitle: 开关
toc: content
group: 数据录入
---

# Switch 开关

开关选择器，用于切换两种状态。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 两种大小

<code src="./demos/size.tsx">尺寸</code>

### 加载中

<code src="./demos/loading.tsx">加载</code>

## API

| 属性              | 说明             | 类型                       | 默认值    |
| ----------------- | ---------------- | -------------------------- | --------- |
| checked           | 是否选中（受控） | `boolean`                  | -         |
| defaultChecked    | 默认选中         | `boolean`                  | `false`   |
| onChange          | 变化回调         | `(checked, event) => void` | -         |
| disabled          | 禁用             | `boolean`                  | `false`   |
| loading           | 加载中           | `boolean`                  | `false`   |
| size              | 尺寸             | `default` \| `small`       | `default` |
| checkedChildren   | 选中时的文案     | `ReactNode`                | -         |
| unCheckedChildren | 非选中时的文案   | `ReactNode`                | -         |
