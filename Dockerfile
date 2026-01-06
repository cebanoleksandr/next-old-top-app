FROM node:22-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV=production
ENV NEXT_PUBLIC_DOMAIN=https://courses-top.ru
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000