---
category: Components
title: Select
subtitle: 选择器
toc: content
group: 数据录入
---

# Select 选择器

下拉选择器，弹出一个下拉菜单给用户选择操作。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx">基础</code>

### 三种大小

<code src="./demos/size.tsx">尺寸</code>

### 多选模式

<code src="./demos/multiple.tsx">多选</code>

### 带搜索

<code src="./demos/searchable.tsx">搜索</code>

## API

| 属性            | 说明       | 类型                                       | 默认值     |
| --------------- | ---------- | ------------------------------------------ | ---------- |
| options         | 选项数据   | `{ label, value, disabled }[]`             | `[]`       |
| value           | 受控值     | `string \| number \| (string \| number)[]` | -          |
| defaultValue    | 默认值     | 同上                                       | -          |
| onChange        | 变化回调   | `(value, option) => void`                  | -          |
| placeholder     | 占位符     | `string`                                   | `请选择`   |
| size            | 尺寸       | `small` \| `middle` \| `large`             | `middle`   |
| variant         | 形态       | `outlined` \| `filled` \| `borderless`     | `outlined` |
| status          | 校验状态   | `error` \| `warning`                       | -          |
| disabled        | 禁用       | `boolean`                                  | `false`    |
| allowClear      | 可清除     | `boolean`                                  | `false`    |
| mode            | 模式       | `multiple` \| `tags`                       | -          |
| showSearch      | 可搜索     | `boolean`                                  | `false`    |
| notFoundContent | 无数据提示 | `ReactNode`                                | `暂无数据` |
