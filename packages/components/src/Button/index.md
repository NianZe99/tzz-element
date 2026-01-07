---
title: Button 按钮
group:
  title: 通用
  order: 1
---

# Button

生产级 Button：支持 **variant / size / loading / disabled / icon / asChild**，并内置 focus-visible 与无障碍约束。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 加载态

<code src="./demos/loading.tsx"></code>

## 图标

<code src="./demos/icon.tsx"></code>

## asChild（多态）

<code src="./demos/as-child.tsx"></code>

## API

| Prop             | Type                                                              |   Default | Description                                   |
| ---------------- | ----------------------------------------------------------------- | --------: | --------------------------------------------- |
| variant          | `default \| primary \| secondary \| ghost \| link \| destructive` | `default` | 视觉变体                                      |
| size             | `sm \| md \| lg \| icon`                                          |      `md` | 尺寸（icon 为纯图标按钮）                     |
| block            | `boolean`                                                         |   `false` | 撑满父容器宽度                                |
| disabled         | `boolean`                                                         |   `false` | 禁用（asChild 时用 aria-disabled + 阻止交互） |
| loading          | `boolean`                                                         |   `false` | 加载态（自动禁用交互，aria-busy）             |
| loadingText      | `ReactNode`                                                       |         - | loading 文案                                  |
| startIcon        | `ReactNode`                                                       |         - | 左侧图标                                      |
| endIcon          | `ReactNode`                                                       |         - | 右侧图标                                      |
| spinnerPlacement | `start \| end`                                                    |   `start` | spinner 位置                                  |
| asChild          | `boolean`                                                         |   `false` | 多态渲染（Slot）                              |

## 无障碍说明

- `size="icon"` 且无可读文本时，请提供 `aria-label`。
- `loading` 会设置 `aria-busy="true"` 并禁用交互。
- 键盘导航使用 `focus-visible` 显示焦点环（鼠标点击不出现）。
