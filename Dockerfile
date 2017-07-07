# 使用目前最新版本的 Node.js
# 但是一定要指定版本，因為 64 位元的 ARM 映像
# 沒有 latest 標籤
FROM node
# FROM aarch64/node:8

ARG EXTERNAL_HOST
ARG EXTERNAL_PORT

# 產生資料夾
RUN mkdir /root/src

# 安裝 TypeScript 編譯器
RUN npm install --global typescript

COPY . /root/src

# 因為該版本的 node 已經有 git 了
# 直接下載專案
# RUN git clone https://www.github.com/shanehsu/isms-app.git /root/src
# WORKDIR /root/src

# 編譯
WORKDIR /root/src
RUN npm install
RUN tsc; exit 0

# 使用通訊埠
EXPOSE 80
EXPOSE 443

# 環境變數
ENV HOST ${EXTERNAL_HOST}:${EXTERNAL_PORT}
ENV PORT 80

# 執行
CMD node ~/src/express-server.js
