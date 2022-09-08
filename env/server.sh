
docker run \
  --rm -it -w /app \
  --name clead \
  -v $(pwd)/app:/app \
  -v $(pwd)/data:/data \
  -e DATA_PATH=/data \
  -e HTTP_PORT=80 \
  -p 80:80 \
  node:lts \
  node server.js
