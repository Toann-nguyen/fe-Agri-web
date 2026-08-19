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

## 3. CI/CD (GitHub Actions)

- `.github/workflows/infra-ci.yml` — on every PR/push touching `infra/`, runs
  `terraform validate` + `terraform fmt -check` and `ansible-playbook
--syntax-check`. Blocks merge on failure.
- `.github/workflows/infra-deploy.yml` — on merge to `main` (or manual
  `workflow_dispatch`), SSHes to the VPS and runs the Ansible deploy.
  Requires repo secrets: `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`
  (set under Settings → Environments → production, or repo secrets).

### Required GitHub secrets

| Secret           | Value                                   |
| ---------------- | --------------------------------------- |
| `DEPLOY_SSH_KEY` | private key (ed25519) for the VPS       |
| `DEPLOY_HOST`    | VPS IP or `toanrobert.online`           |
| `DEPLOY_USER`    | `root` (or a sudo user in docker group) |

## 4. Runbook

### First-time provision + deploy

```bash
# 1. Provision VM (if not already running)
cd infra/terraform && terraform apply
terraform output -raw ansible_inventory > ../ansible/inventory.generated.yml

# 2. Deploy
cd ../ansible
ansible-galaxy collection install -r requirements.yml
ansible-playbook -i inventory.yml playbook.yml
```

### Redeploy only the frontend (after a code change)

```bash
ansible-playbook -i inventory.yml playbook.yml --tags frontend
# or a single compose service:
ansible-playbook -i inventory.yml playbook.yml --extra-vars "app_service=nextjs_app" --tags frontend
```

### Rollback

The compose stack keeps the previous image layers. To revert the frontend to
the previous build:

```bash
ssh root@toanrobert.online \
  "cd /home/robert/production/docker && docker compose up -d --build nextjs_app"
```

(Re-run the last known-good `git checkout` on the host before building.)

### Troubleshooting

| Symptom                        | Check                                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Container unhealthy            | `docker inspect nextjs_app --format='{{.State.Health}}'`                                                         |
| Cookie not set after login     | Verify backend sends `Set-Cookie: educonnect_session` (HttpOnly) per `docs/backend-docs/auth-cookie-contract.md` |
| 502 from nginx                 | `docker logs nextjs_app` + `docker compose ps`                                                                   |
| Ansible "host unreachable"     | SSH key perms `600`, `DEPLOY_HOST` correct, port 22 open                                                         |
| Terraform "provider not found" | `terraform init` with network access; DO token valid                                                             |
