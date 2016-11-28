import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import LoadingArea from '../window/LoadingArea';

import '../../../style/valueWindow/valueWindow.scss';

const WindowAreaHOC = (Area) => {
    class WindowAreaBase extends Component {
        constructor(props) {
            super(props);

            this.renderLoading = this.renderLoading.bind(this);
            this.renderError = this.renderError.bind(this);
        }

        renderLoading() {
            return <LoadingArea />;
        }

        renderError() {
            return (
                <div>ERROR</div>
            );
        }

        render() {
            const { loading, error } = this.props;

            if (loading) {
                return this.renderLoading();
            }

            if (error) {
                return this.renderError();
            }

            return (
            <Area {...this.props} {...this.state} />
            );
        }
    }

    WindowAreaBase.propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.string,
    };

    const mapStateToProps = (state) => ({
        loading: state.window.loading,
        error: state.window.error,
    });

    return connect(
        mapStateToProps
    )(WindowAreaBase);
};

export default WindowAreaHOC;
