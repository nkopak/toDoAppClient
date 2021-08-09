import * as RegisterActionCreators from './registerActions';
import * as LoginActionCreators from './loginActions';

export default {
  ...RegisterActionCreators,
  ...LoginActionCreators
};
