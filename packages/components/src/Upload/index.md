---
category: Components
title: Upload
subtitle: 上传
toc: content
group: 数据录入
---

# Upload 上传

文件选择上传和拖拽上传控件。

## 代码演示

### 基础上传

<code src="./demos/basic.tsx">基础</code>

### 拖拽上传

<code src="./demos/drag.tsx">拖拽</code>

### 文件列表

<code src="./demos/file-list.tsx">受控文件列表</code>

### 自定义触发器

<code src="./demos/custom-trigger.tsx">自定义</code>

## API

### Upload

| 属性           | 说明             | 类型                                     | 默认值  |
| -------------- | ---------------- | ---------------------------------------- | ------- |
| action         | 上传地址         | `string`                                 | -       |
| accept         | 接受的文件类型   | `string`                                 | -       |
| multiple       | 是否允许多选     | `boolean`                                | `false` |
| maxCount       | 最大文件数       | `number`                                 | -       |
| fileList       | 文件列表（受控） | `UploadFile[]`                           | -       |
| showUploadList | 显示文件列表     | `boolean`                                | `true`  |
| disabled       | 禁用             | `boolean`                                | `false` |
| beforeUpload   | 上传前钩子       | `(file, fileList) => boolean \| Promise` | -       |
| customRequest  | 自定义上传方法   | `(options) => void`                      | -       |
| onChange       | 文件变化回调     | `({ file, fileList }) => void`           | -       |
| onRemove       | 删除文件回调     | `(file) => boolean \| Promise`           | -       |

### Upload.Dragger

同 Upload 属性，额外支持：

| 属性   | 说明         | 类型               | 默认值 |
| ------ | ------------ | ------------------ | ------ |
| height | 拖拽区域高度 | `number \| string` | -      |

### UploadFile

| 属性    | 说明     | 类型                                            |
| ------- | -------- | ----------------------------------------------- |
| uid     | 唯一标识 | `string`                                        |
| name    | 文件名   | `string`                                        |
| status  | 状态     | `'uploading' \| 'done' \| 'error' \| 'removed'` |
| percent | 上传进度 | `number`                                        |
| url     | 文件链接 | `string`                                        |
