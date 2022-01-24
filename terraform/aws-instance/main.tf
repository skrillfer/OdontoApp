

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.67.0"
    }
  }
  backend "s3" {
    bucket = "dev-app-odonto-backend-state-2549465930609"
    #key = "07-backend-state-users-dev"
    #key = "dev/07-backend-state/user/backend-state"
    key = "odonto/backend-state"
    region = "us-east-2"
    dynamodb_table = "dev_application_odonto_locks2"
    encrypt = true
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-2"
  # VERSION IS NOT NEEDED HERE
}


resource "aws_default_vpc" "default" {
  
}

# HTTP Server -> SG
# SG -> 80 TCP, 22 TCP, CIDR ["0.0.0.0/0"]
resource "aws_security_group" "http_server_sg" {
  name   = "http_server_sg_odonto"
  vpc_id = aws_default_vpc.default.id  //"vpc-0421b0d0256c654ef"

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    #description = "value"
    from_port = 80
    #ipv6_cidr_blocks = [ "value" ]
    #prefix_list_ids = [ "value" ]
    protocol = "tcp"
    #security_groups = [ "value" ]
    #self = false
    to_port = 80
  }
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    #description = "value"
    from_port = 22
    #ipv6_cidr_blocks = [ "value" ]
    #prefix_list_ids = [ "value" ]
    protocol = "tcp"
    #security_groups = [ "value" ]
    #self = false
    to_port = 22
  }
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    #description = "value"
    from_port = 0
    #ipv6_cidr_blocks = [ "value" ]
    #prefix_list_ids = [ "value" ]
    protocol = -1
    #security_groups = [ "value" ]
    #self = false
    to_port = 0
  }

  tags = {
    name = "http_server_sg_odonto"
  }
}

resource "aws_instance" "http_server" {
  ami                    = data.aws_ami.aws_linux_2_latest.id
  key_name               = "default-ec2"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.http_server_sg.id]
  subnet_id              = tolist(data.aws_subnet_ids.default_subnets.ids)[0]

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ec2-user"
    private_key = file(var.aws_key_pair)
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum install docker -y",// install docker
      "sudo service docker start",// start docker service
      "sudo usermod -a -G docker ec2-user", // add user to docker group
      "sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "sudo yum install git -y"
      # "echo Welcome to Guatemala - Virtual Server is at ${self.public_dns} | sudo tee /var/www/html/index.html"// copy a file
    ]
  }
}