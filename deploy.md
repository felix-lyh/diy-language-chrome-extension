### I deploy this extension to Ali ECS by Github Actions
** 
1. write a workflow deploy.yml file
2. set original branch
3. set secrets and variables that in settings [secrets and variables]
4.  ECS_HOST is the public IP
5.  ECS_USERNAME is whoami input in ECS
6.  ECS_SSH_KEY is important, I get it in ECS by cat ~/.ssh/id_ed25519 
    and put id_ed25519.pub by cat ~/.ssh/id_ed25519.pub into authorized_keys