import * as RegisterActionCreators from './registerActions';
import * as LoginActionCreators from './loginActions';
import * as ListActionCreators from './listActions';

export default {
  ...RegisterActionCreators,
  ...LoginActionCreators,
  ...ListActionCreators
};
