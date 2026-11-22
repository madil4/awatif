#!/usr/bin/env bash
# Copy this case's resources/ (input images) into the sandbox working directory
set -e
src="$(printf '%s' "${BASH_SOURCE[0]}" | tr '\' '/')"
src="${src%/*}/resources"
mkdir -p ./resources
cp -r "$src"/. ./resources/
