import * as RegisterActionCreators from './registerActions';
import * as LoginActionCreators from './loginActions';
import * as ListActionCreators from './listActions';
import * as TokenInfoActionCreators from './tokenInfoActions';
import * as ListItemActionCreators from './listItemActions';
import * as UserActionCreators from './userActions';

export default {
  ...RegisterActionCreators,
  ...LoginActionCreators,
  ...ListActionCreators,
  ...ListItemActionCreators,
  ...TokenInfoActionCreators,
  ...UserActionCreators
};
