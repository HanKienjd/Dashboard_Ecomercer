#!/bin/bash

set -euo pipefail

# Required 1 arguments before continues
if [[ $# -lt 1 ]]; then
  echo "Required exactly 1 arguments: BUILD_NUMBER. Exit."
  exit 2
fi

BUILD_NUMBER=$1
BUILD_TAG=${2:-dev} #It should be dev, staging or prod. Default to dev.

DOCKER_IMAGE=10.0.200.107:5000/web-portal-"$BUILD_TAG":"$BUILD_NUMBER"
ENV_FILE=/home/env/webportal.vgasoft.vn/.env.production # Default to dev environment
CONTAINER_NAME=web-portal-"$BUILD_TAG"

if [ "$BUILD_TAG" = "master" ]; then
  ENV_FILE=/home/env/webportal.vgasoft.vn/.env.production # Production environment file
elif [ "$BUILD_TAG" = "test" ]; then
  ENV_FILE=/home/env/webportal.vgasoft.vn/.env.production # Staging environment file
fi

PORT=$(awk 'sub(/^[ \t]*PORT=/,""){print $1}' $ENV_FILE)
if [ -z "$PORT" ]; then
  echo "Cannot get PORT from $ENV_FILE. Exit."
  exit 1
fi
echo "Exposed port: $PORT"

containerId=$(docker ps -qa --filter "name=$CONTAINER_NAME")
if [ -n "$containerId" ]; then
  echo "Stop and remove existing container..."
  docker stop "$CONTAINER_NAME" | xargs docker rm
fi

docker run -d --init --name "$CONTAINER_NAME" \
  --mount type=bind,source="$ENV_FILE",target=/usr/src/app/.env.production \
  --restart always \
  -p "$PORT":"$PORT" \
  "$DOCKER_IMAGE" npm run start
