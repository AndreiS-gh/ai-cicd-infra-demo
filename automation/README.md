# <Insert module name here E.g. AWS EC2 instance module
<Insert module description here> This terraform module creates and AWS EC2 instance.

## Requirements
<Insert module requierements here> E.g. This module depends on terraform-aws-modules/key-pair/aws

## Providers
| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules
| Name | Source | Version |
|------|--------|---------|
| <a name="module_key_pair"></a> [key\_pair](#module\_key\_pair) | terraform-aws-modules/key-pair/aws | n/a |

## Resources
| Name | Type |
|------|------|
| [aws_instance.ec2-appserver](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance) | resource |
| [aws_ami.latest_amazon_linux_img](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami) | data source |

## Inputs
| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_aws_availability_zones_count"></a> [aws\_availability\_zones\_count](#input\_aws\_availability\_zones\_count) | The number of AZs. | `number` | `2` | no |
| <a name="input_aws_security_group_id"></a> [aws\_security\_group\_id](#input\_aws\_security\_group\_id) | The AWS security group Id | `string` | n/a | yes |
| <a name="input_aws_subnet"></a> [aws\_subnet](#input\_aws\_subnet) | List of Subnets | `list(any)` | n/a | yes |
| <a name="input_ec2_instance_type"></a> [ec2\_instance\_type](#input\_ec2\_instance\_type) | The EC2 instance type | `string` | `"t2.micro"` | no |
| <a name="input_group_prefix"></a> [group\_prefix](#input\_group\_prefix) | The Prefix for all resources created, combination of vendorname and environment | `string` | n/a | yes |
| <a name="input_key_pair_name"></a> [key\_pair\_name](#input\_key\_pair\_name) | The keypair to be created for EC2 instances | `string` | n/a | yes |

## Outputs
| Name | Description |
|------|-------------|
| <a name="output_ec2_server_instances"></a> [ec2\_server\_instances](#output\_ec2\_server\_instances) | The EC2 Server App Server instance Ids |