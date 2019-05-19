import {ReactWrapper} from 'enzyme';
import {waitForUI} from '../helpers/utils';
import {getSuggestionId} from '@universal-login/commons';

export default class LoginPage {

  constructor(private wrapper : ReactWrapper) {
  }

  async pickUsername(userName : string, action : string, result : string) {
    const input = this.wrapper.find('input');
    input.simulate('change', {target: {value: userName}});
    await waitForUI(this.wrapper, () => this.wrapper.text().includes(action));
    this.wrapper.find(`#${getSuggestionId(action)}`).simulate('click');
    await waitForUI(this.wrapper, () => this.wrapper.text().includes(result));
  }

  async createNew(userName: string) {
    await this.pickUsername(userName, 'create new', 'Transfer one of following');
  }

  async connect(userName: string) {
    await this.pickUsername(userName, 'connect to existing', 'Waiting for approval');
  }

  async getAddress() {
    this.wrapper.find('#transfer-modal').simulate('click');
    await waitForUI(this.wrapper, () => this.wrapper.text().includes('Transfer one of following'));
    return this.wrapper.find('.input-copy').props().defaultValue as string;
  }

  async waitForHomeView(balance: string, timeout?: number) {
    await waitForUI(this.wrapper, () => this.wrapper.text().includes(`balance${balance}`), timeout);
  }
}
