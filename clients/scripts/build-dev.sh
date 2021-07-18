#!/bin/bash

set -euo pipefail

DOCKER_REGISTRY=localhost:5000

BUILD_NUMBER=${1:-latest}
BUILD_TAG=${2:-dev}

docker build --build-arg node_env=production -t $DOCKER_REGISTRY/web-portal-"$BUILD_TAG":"$BUILD_NUMBER" .
docker push $DOCKER_REGISTRY/web-portal-"$BUILD_TAG":"$BUILD_NUMBER"