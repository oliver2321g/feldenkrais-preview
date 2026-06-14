# 費登魁斯方法介紹網站

這是一個零月費、低維護的靜態介紹網站第一版。網站不需要伺服器、資料庫、登入或後台，直接開啟 `index.html` 就能預覽，也可以部署到 GitHub Pages 或 Cloudflare Pages。

## 檔案

- `index.html`：網站內容與單頁式段落。
- `styles.css`：版面、響應式樣式與視覺設計。
- `script.js`：手機選單、導覽高亮與年份。
- `assets/hero-feldenkrais.png`：首頁主視覺，由 Codex 生成並複製到專案。

## 上線前要替換

在 `index.html` 搜尋「待補」，替換以下內容：

- 講師姓名與簡介。
- 受訓狀態與可公開描述。
- 服務地點或線上課資訊。
- Email、LINE、Instagram、Google Form 連結。
- 頁尾版權名稱。

目前的聯絡資訊是不可點的佔位內容，適合先公開校稿。正式上線前請改成真正連結。

若內容確認後要讓搜尋引擎收錄，請移除 `index.html` 裡這行：

```html
<meta name="robots" content="noindex, nofollow">
```

## 部署建議

### GitHub Pages

1. 建立一個新的 GitHub repository。
2. 上傳這些檔案到 repository 根目錄。
3. 到 repository 的 Settings > Pages。
4. Source 選擇 `Deploy from a branch`。
5. Branch 選擇 `main` 與 `/root`。
6. GitHub 會提供 `*.github.io` 網址。

### Cloudflare Pages

1. 建立 Cloudflare 帳號。
2. 到 Workers & Pages > Create application > Pages。
3. 連接 GitHub repository。
4. Framework preset 選 `None`。
5. Build command 留空，Output directory 留 `/`。
6. Cloudflare 會提供 `*.pages.dev` 網址。

## 內容注意事項

網站文案刻意使用「身心教育」「動作學習」「覺察」等描述，避免保證治療疼痛或疾病。若要新增療效、疼痛、復健相關文字，建議先由受訓者或專業人士確認。

參考來源：

- International Feldenkrais Federation 方法介紹：https://feldenkrais-method.org/feldenkrais-method/feldenkrais-method-moshe-feldenkrais/
- International Feldenkrais Federation Research：https://feldenkrais-method.org/feldenkrais-method/research/
- GitHub Pages：https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Cloudflare Pages limits：https://developers.cloudflare.com/pages/platform/limits/
