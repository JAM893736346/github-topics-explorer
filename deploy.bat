@echo off
echo 正在构建项目...
npm run build

echo 正在部署到 GitHub Pages...
git checkout -B gh-pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
git checkout main

echo 部署完成！
echo 你的网站将在以下地址可访问：
echo https://JAM893736346.github.io/github-topics-explorer/
pause
