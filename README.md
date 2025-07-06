# 網頁計算機

一個現代化的網頁計算機，可以嵌入到WordPress網站中。

## 特色

- 響應式設計，適用於所有設備
- 支援鍵盤輸入
- 現代化的毛玻璃效果UI
- 可以透過iframe嵌入到WordPress
- 部署到GitHub Pages和Render

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm start
```

## 部署

### GitHub Pages
1. 推送代碼到GitHub repository
2. 在Settings > Pages中啟用GitHub Pages
3. 選擇main branch作為來源

### Render
1. 連接GitHub repository到Render
2. 選擇Static Site
3. 構建命令：`npm run build`
4. 發布目錄：`.`

## WordPress嵌入

使用以下iframe代碼嵌入到WordPress：

```html
<iframe src="YOUR_DEPLOYED_URL" width="400" height="600" frameborder="0" scrolling="no"></iframe>
```

## 功能

- 基本四則運算 (+, -, ×, /)
- 清除 (C) 和清除輸入 (CE)
- 退格功能
- 鍵盤支援
- 錯誤處理