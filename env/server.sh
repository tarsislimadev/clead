
docker run \
  --rm -it \
  -e DATA_PATH=/data \
  -v $(pwd)/data:/data \
  -v $(pwd)/app:/app \
  -w /app \
  node:lts \
  node server.js
