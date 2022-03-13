import { connect } from 'react-redux';
import Gym from '../components/gym';
import { gymAction } from '../modules/gym/gym-actions';
import { AppState } from '../types';

const stateToProps = (state: AppState) => ({
  gymFighters: state.gymState.gymFighters,
  loadingGymFighters: state.gymState.loadingGymFighters,
  getGymFightersError: state.gymState.getGymFightersError,
});

const dispatchToProps = {
  getGymRequests: gymAction,
};

export default connect(stateToProps, dispatchToProps)(Gym);
