import {utils, Contract} from 'ethers';
import ENS from 'universal-login-contracts/build/ENS';

class ENSService {
  constructor(ensAddress, ensRegistrars, provider) {
    this.ensRegistrars = ensRegistrars;
    this.ensAddress = ensAddress;
    this.domainsInfo = {};
    this.provider = provider;
  }

  async start() {
    this.ens = new Contract(this.ensAddress, ENS.interface, this.provider);
    for (let count = 0; count < this.ensRegistrars.length; count++) {
      const domain = this.ensRegistrars[count];
      this.domainsInfo[`${domain}`] = {};
      this.domainsInfo[`${domain}`].resolverAddress = await this.ens.resolver(utils.namehash(`${domain}`));
      this.domainsInfo[`${domain}`].registrarAddress = await this.ens.owner(utils.namehash(`${domain}`));
    }
  }

  findRegistrar(domain) {
    return this.domainsInfo[domain] || null;
  }

  argsFor(ensName) {
    const [label, domain] = ensName.split(/\.(.*)/);
    const hashLabel = utils.keccak256(utils.toUtf8Bytes(label));
    const node = utils.namehash(`${label}.${domain}`);
    const registrarConfig = this.findRegistrar(domain);
    if (registrarConfig === null) {
      return null;
    }
    const {resolverAddress} = registrarConfig;
    const {registrarAddress} = registrarConfig;
    return [hashLabel, ensName, node, this.ensAddress, registrarAddress, resolverAddress];
  }
}

export default ENSService;
