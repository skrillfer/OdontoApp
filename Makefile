### Create backend state on AWS
terraform-init-backend:
	cd terraform/backend-state && \
	  terraform init

TF_ACTION?=plan
terraform-action-backend:
	cd terraform/backend-state && \
	  terraform $(TF_ACTION)

### Create EC2 instances on AWS
terraform-init-aws:
	cd terraform/aws-instance && \
	  terraform init

TF_ACTION?=plan
terraform-action-aws:
	cd terraform/aws-instance && \
	  terraform $(TF_ACTION)

### DOCKER COMPOSE
### Pull images using docker compose   Note: Be sure are in root where is docker-compose.yml
docker-compose-pull-images:
	docker-compose pull

### Pull images using docker compose   Note: Be sure are in root where is docker-compose.yml
docker-compose-push-images:
	docker-compose push

### Generate images using docker compose   Note: Be sure are in root where is docker-compose.yml
docker-compose-build-images:
	docker-compose build

### Docker compose up dettach mode   Note: Be sure are in root where is docker-compose.yml
docker-compose-up-dettach-mode:
	docker-compose up -d

### Docker compose up and build   Note: Be sure are in root where is docker-compose.yml
docker-compose-up-and-build:
	docker-compose up --build

### Docker compose up and build dettach mode   Note: Be sure are in root where is docker-compose.yml
docker-compose-up-and-build-dettach-mode:
	docker-compose up --build -d


### DOCKER
### Build image using Dockerfile Note: Be sure are in root where is Dockerfile
DK_IMG_NAME?=name
DK_IMG_VERSION?=1.0.0
docker-build-image:
	docker build -t $(DK_IMG_NAME):$(DK_IMG_VERSION) .