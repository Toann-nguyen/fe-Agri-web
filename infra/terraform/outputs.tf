output "app_ipv4" {
  description = "Public IPv4 to feed into the Ansible inventory"
  value       = module.vps.droplet_ipv4
}

# Generates an Ansible inventory snippet from the provisioned host.
output "ansible_inventory" {
  description = "Ready-to-use Ansible inventory YAML"
  value       = <<-EOT
    all:
      children:
        web:
          hosts:
            prod:
              ansible_host: ${module.vps.droplet_ipv4}
              ansible_user: root
              ansible_ssh_common_args: '-o StrictHostKeyChecking=no'
    EOT
}
