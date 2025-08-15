#! /bin/sh
printenv > .env
# Build docker image #
docker --version
docker buildx build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} . --push
docker images
echo "...[done] build image ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
