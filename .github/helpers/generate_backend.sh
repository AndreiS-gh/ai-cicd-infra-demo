#!/bin/bash

# Check for required parameters
if [[ $# -lt 3 ]]; then
  echo "Usage: $0 <S3_BUCKET> <ENVIRONMENT> <REGION>"
  exit 1
fi

S3_BUCKET="$1"
ENVIRONMENT="$2"
REGION="$3"

# Calculate the repository name from the Git repository URL
#REPOSITORY_NAME=$(git remote get-url origin | sed -E 's/.*\/([^/]+)\.git/\1/')
REPOSITORY_NAME=$(basename -s .git `git config --get remote.origin.url`)


cat <<EOF > backend.tf
terraform {
  backend "s3" {
    bucket = "$S3_BUCKET"
    key    = "tfstate/$REPOSITORY_NAME/$ENVIRONMENT/tfstate"
    region = "$REGION"
  }
}
EOF

# Echo the generated backend.tf for debugging
cat backend.tf
