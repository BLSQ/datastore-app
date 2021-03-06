import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import StatisticsToolbar from './StatisticsToolbar';
import StatisticsArea from './StatisticsArea';
import { fetchHistoryForNamespace, fetchHistory } from 'actions/actions';
import '../../../../style/display/display.scss';

export class StatisticsDisplay extends Component {
    componentDidMount() {
        const { getHistoryForKey, getHistoryForNamespace, params: { namespace, key } } = this.props;
        if (typeof key !== 'undefined') {
            getHistoryForKey(namespace, key);
        } else {
            getHistoryForNamespace(namespace);
        }
    }

    componentDidUpdate(prevProps) {
        const { getHistoryForKey, getHistoryForNamespace, params: currentParams } = this.props;
        const { params: prevParams } = prevProps;

        if (currentParams.key !== prevParams.key) {
            getHistoryForKey(currentParams.namespace, currentParams.key);
        } else if (currentParams.namespace !== prevParams.namespace) {
            getHistoryForNamespace(currentParams.namespace);
        }
    }

    render() {
        const { history, params: { namespace } } = this.props;
        return (
        <Paper zDepth={0} className={ 'fff-display' }>
            <StatisticsToolbar namespace={ namespace } />
            <StatisticsArea list={ history } namespace={ namespace } />
        </Paper>
        );
    }
}

StatisticsDisplay.propTypes = {
    getHistoryForKey: PropTypes.func,
    getHistoryForNamespace: PropTypes.func,
    history: PropTypes.array,
    params: PropTypes.shape({
        namespace: PropTypes.string,
        key: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    history: state.display.history,
});

const mapDispatchToProps = (dispatch) => ({
    getHistoryForNamespace(namespace) {
        dispatch(fetchHistoryForNamespace(namespace));
    },
    getHistoryForKey(namespace, key) {
        dispatch(fetchHistory(namespace, key));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatisticsDisplay);
