#!/bin/bash

# Input parameter: environment
environment="$1"

echo "Applying Terraform for ENVIRONMENT=$environment"
echo "ENVIRONMENT=$environment" >> $GITHUB_ENV
ENV_VARS_PATH="environments/$environment.tfvars.json"

if [ ! -f "$ENV_VARS_PATH" ]; then
  echo "Error: Variable file $ENV_VARS_PATH does not exist for environment $environment. If you need this environment to be created make sure you update your variables."
  exit 1
fi

REGION=$(jq -r .region < "$ENV_VARS_PATH")

if [ -z "$REGION" ]; then
  echo "Error: 'region' is missing in $ENV_VARS_PATH for environment $environment."
  exit 1
fi

echo "ENV_VARS_PATH=$ENV_VARS_PATH" >> $GITHUB_ENV
echo "REGION=$REGION" >> $GITHUB_ENV

# Read terraform_action from tfvars file (default to "plan" if not found or invalid)
TERRAFORM_ACTION=$(jq -r '.terraform_action // "plan"' < "$ENV_VARS_PATH")
if [[ "$TERRAFORM_ACTION" != "plan" && "$TERRAFORM_ACTION" != "apply" && "$TERRAFORM_ACTION" != "destroy" ]]; then
  echo "Invalid 'terraform_action' specified in $ENV_VARS_PATH: $TERRAFORM_ACTION. Defaulting to 'plan'."
  TERRAFORM_ACTION="plan"
fi
echo "TERRAFORM_ACTION=$TERRAFORM_ACTION" >> $GITHUB_ENV
echo "ENVIRONMENT=$environment" >> $GITHUB_ENV
