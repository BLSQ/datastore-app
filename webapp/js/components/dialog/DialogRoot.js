import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { closeDialog } from 'actions/dialogActions';

class DialogRoot extends Component {

    static buildButton(action, text, primary = false) {
        return (<FlatButton
            label={text}
            primary={primary}
            onTouchTap={action}
        />);
    }

    render() {
        const { title,
                cancelAction,
                cancelLabel,
                approveAction,
                approveLabel,
                contentStyle,
                defaultCloseDialog } = this.props;

        const actions = [];

        // TODO: Clean this up
        const finalAction = () => {
            Promise.resolve(approveAction()).then(() => defaultCloseDialog()).catch(() => {})
        };

        actions.push(DialogRoot.buildButton(cancelAction || defaultCloseDialog, cancelLabel || 'Cancel'));
        if (approveAction) actions.push(DialogRoot.buildButton(finalAction, approveLabel || 'Create', true));

        return (<Dialog
            open
            title={title}
            actions={actions}
            modal={false}
            contentStyle={contentStyle || {}}
            onRequestClose={defaultCloseDialog}
        >
            {this.props.children}
        </Dialog>);
    }
}

DialogRoot.propTypes = {
    title: PropTypes.string,
    cancelLabel: PropTypes.string,
    approveLabel: PropTypes.string,
    cancelAction: PropTypes.func,
    approveAction: PropTypes.func,
    defaultCloseDialog: PropTypes.func,
    contentStyle: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
    defaultCloseDialog() {
        dispatch(closeDialog());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(DialogRoot);
