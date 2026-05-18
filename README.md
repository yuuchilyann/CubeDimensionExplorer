# 立方體維度探索器 (Cube Dimension Explorer)

n-cube Hasse diagram 視覺化工具，使用 **Vite + React + TypeScript + MUI** 重構。

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

編譯輸出至 `publish/` 目錄。

## 預覽建置結果

```bash
npm run preview
```

## 專案結構

```
.
├── index.html               # Vite 進入點
├── vite.config.ts           # build.outDir 設為 publish
├── src/
│   ├── main.tsx             # React + MUI Theme 注入
│   ├── App.tsx              # 應用外殼
│   ├── types.ts             # 共用型別
│   ├── lib/
│   │   ├── cube.ts          # n-cube 頂點/邊/Hasse 排列
│   │   └── draw.ts          # Canvas 繪圖
│   └── components/
│       ├── ControlPanel.tsx # MUI 控制面板
│       └── CubeCanvas.tsx   # 繪圖畫布
└── reference/
    └── cubes.original.html  # 原始單檔 HTML 原稿
```
