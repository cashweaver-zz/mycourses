# -*- mode: ruby -*-
# vi: set ft=ruby :

# Ensure a minimum Vagrant version to prevent potential issues.
Vagrant.require_version '>= 1.5.0'

# Configure using Vagrant's version 2 API/syntax.
Vagrant.configure(2) do |config|
  # Ubuntu 14.04, 64 bit
  config.vm.box         = 'ubuntu/trusty64'
  config.vm.box_version = '~> 14.04'

  # Providers
  config.vm.provider :virtualbox do |p|
    p.customize ['modifyvm', :id,
                 '--memory', '512',
                 '--ioapic', 'on']
  end

  # SSH
  config.ssh.username = 'vagrant'

  config.vm.define "app" do |app|
    # Port Forwarding
    config.vm.network :forwarded_port, guest: 3000, host: 3000

    # Provisioning
    config.vm.provision :shell, path: "provision.sh"
  end
end
