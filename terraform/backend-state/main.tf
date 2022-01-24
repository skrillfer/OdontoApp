terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.67.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-2"
  # VERSION IS NOT NEEDED HERE
}


# S3 BUCKET
resource "aws_s3_bucket" "enterprise_backend_state" {
    bucket = "dev-app-odonto-backend-state-2549465930609"

    lifecycle {
      prevent_destroy = true
    }

    versioning {
      enabled = true
    }
    server_side_encryption_configuration {
      rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = "AES256" # Advanced Encryption Standard
        }
      }
    }
}

#LOOKING - Dynamo DB for storing the log information
resource "aws_dynamodb_table" "enterprise_backend_lock" {
  name = "dev_application_odonto_locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}


