import { gymWatchers } from './gym-watchers';
import { gymApi } from './gym-api';
import { gymReducer } from './gym-reducer';

/**
 * The gym feature fetches a list of Tx Verifications from
 * the API and renders then in a table which allows for approval of
 * Tx migrations.
 *
 * All gym framework components are exposed by this index.
 */
export {
  gymApi,
  gymWatchers,
  gymReducer,
};
