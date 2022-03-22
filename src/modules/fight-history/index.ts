import { fightHistoryWatchers } from './fight-history-watchers';
import { fightHistoryApi } from './fight-history-api';
import { FightHistoryReducer } from './fight-history-reducer';

/**
 * The gym feature fetches a list of Tx Verifications from
 * the API and renders then in a table which allows for approval of
 * Tx migrations.
 *
 * All gym framework components are exposed by this index.
 */
export { fightHistoryApi, fightHistoryWatchers, FightHistoryReducer };
