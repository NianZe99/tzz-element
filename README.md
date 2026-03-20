# tzz-element

[![NPM version](https://img.shields.io/npm/v/@mariotzz/tzz-element.svg?style=flat)](https://npmjs.org/package/@mariotzz/tzz-element)
[![NPM downloads](https://img.shields.io/npm/dm/@mariotzz/tzz-element.svg?style=flat)](https://npmjs.org/package/@mariotzz/tzz-element)

一套基于 React 18 的企业级 UI 组件库，使用 TypeScript 编写，API 风格参考 Ant Design。

## 特性

- 🎨 基于 CSS Variables 的设计令牌系统，支持主题定制
- 📦 支持 ESM / CJS 双格式输出，按需引入
- 🔒 使用 TypeScript 编写，提供完整的类型定义
- 📖 基于 dumi 的在线文档与组件 Demo 演示
- ✅ 配套单元测试（Vitest + Testing Library）

## 组件列表

| 组件     | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| Button   | 按钮，支持 type/size/shape/danger/ghost/loading/icon       |
| Input    | 输入框，支持前缀/后缀/清除/状态反馈 + TextArea 子组件      |
| Select   | 选择器，支持搜索/多选/tags 模式                            |
| Modal    | 对话框，Portal 渲染，支持遮罩关闭/ESC/异步确认             |
| Card     | 卡片容器，支持封面/操作栏/悬浮效果 + Card.Meta             |
| Dropdown | 下拉菜单，支持多种触发方式和方位                           |
| Switch   | 开关，支持 loading/自定义文案                              |
| Tooltip  | 文字提示，纯 CSS 定位，支持 12 个方向                      |
| Space    | 间距布局，支持方向/换行/对齐 + Space.Compact               |
| Message  | 全局提示，命令式 API（success/error/warning/info/loading） |
| Upload   | 文件上传，支持拖拽上传/进度条/文件列表                     |

## 安装

```bash
pnpm add @mariotzz/tzz-element
```

## 使用

```tsx
import { Button, Modal, message } from '@mariotzz/tzz-element';

function App() {
  return (
    <Button type="primary" onClick={() => message.success('操作成功')}>
      点击提示
    </Button>
  );
}
```

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动文档站开发服务
pnpm dev

# 构建组件库
pnpm build

# 运行测试
pnpm test:fast

# 构建文档站
pnpm docs:build
```

## 技术栈

- **框架**: React 18 + TypeScript
- **构建**: father 4（ESM + CJS）
- **文档**: dumi 2
- **样式**: CSS Modules + CSS Variables
- **测试**: Vitest + @testing-library/react
- **包管理**: pnpm monorepo
- **发布**: Changesets + GitHub Actions

## 项目结构

```
tzz-element/
├── packages/
│   ├── components/        # 组件源码
│   │   └── src/
│   │       ├── Button/
│   │       ├── Input/
│   │       ├── Select/
│   │       ├── Modal/
│   │       ├── Card/
│   │       ├── Dropdown/
│   │       ├── Switch/
│   │       ├── Tooltip/
│   │       ├── Space/
│   │       ├── Message/
│   │       ├── Upload/
│   │       └── styles/    # 设计令牌
│   ├── tests/             # 单元测试
│   ├── hooks/             # 公共 Hooks
│   ├── theme/             # 主题包
│   └── utils/             # 工具函数
├── docs/                  # 文档站页面
└── .github/workflows/     # CI/CD
```

## License

MIT
