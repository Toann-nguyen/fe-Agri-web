output "droplet_ipv4" {
  value = digitalocean_droplet.app.ipv4_address
}
output "volume_id" {
  value = digitalocean_volume.data.id
}
