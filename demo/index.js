import getHelpers from 'src';
import owners from './owners/owners';
import actions from './actions/actions';
import paths from './paths/paths';

export default { actions, paths, ...getHelpers({ owners }) };
