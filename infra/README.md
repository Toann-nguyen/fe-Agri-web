# Production IaC — Terraform + Ansible (fe-agri frontend)

Deploys the Next.js frontend (`fe-agri/fe-agri-nextjs-app`) to the production
VPS at `/home/robert/production`. The VPS already runs a Docker Compose stack
(`docker/docker-compose.yml`) with nginx + Cloudflare Tunnel; this IaC manages
the host lifecycle (Terraform) and the deploy (Ansible).

## Layout

```
production/
├── terraform/     # provision the VM (DigitalOcean), output Ansible inventory
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf        # prints ansible_inventory
│   └── modules/vps-docker/
├── ansible/       # deploy role: install Docker, rebuild & up nextjs_app
│   ├── inventory.yml
│   ├── playbook.yml
│   ├── ansible.cfg
│   ├── requirements.yml   # community.docker
│   └── roles/{docker,deploy-frontend}/
├── docker/        # existing compose stack (unchanged by IaC)
└── nginx/         # existing nginx vhost (unchanged by IaC)
```

## 1. Terraform (provision host)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # fill token + ssh key
export DIGITALOCEAN_TOKEN=xxxx
terraform init
terraform plan
terraform apply
# Feed IP into Ansible:
terraform output -raw ansible_inventory > ../ansible/inventory.generated.yml
```

## 2. Ansible (deploy)

```bash
cd ansible
ansible-galaxy collection install -r requirements.yml
# Deploy (assumes host already has the code at /home/robert/Agri-web-app/fe-agri)
ansible-playbook -i inventory.yml playbook.yml
# Or only the frontend rebuild:
ansible-playbook -i inventory.yml playbook.yml --tags frontend
```

## Notes

- The Next.js container is built from `docker/docker-compose.yml` service
  `nextjs_app` (build context `/home/robert/Agri-web-app/fe-agri`).
- `NEXT_PUBLIC_*` are inlined at build time via compose `args` — see the
  `nextjs_app` service block.
- Secrets (`.env`, `terraform.tfvars`, SSH keys) are gitignored.
- The existing nginx + Cloudflare Tunnel remain the public edge; Ansible does
  NOT touch them.
