import React from 'react';
import { connect } from 'react-redux';
import { clearAuth, logoutWarning } from '../actions/auth';
// import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        // clearAuthToken();
    }

    clearWarningDialog() {
        // Hide the dialog
        this.props.dispatch(logoutWarning(false));
        // Restart inactivty timer and dialog timer
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }

        let warningDialog;
        if (this.props.showWarning) {
            warningDialog = (
                <div className="warning-dialog">
                    <p>You are about to be logged out</p>
                    <button onClick={() => this.clearWarningDialog()}>Keep me logged in</button>
                </div>
            );
        }

        return (
            <div className="header-bar">
                <h1>Foo App</h1>
                {logOutButton}
                {warningDialog}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    showWarning: state.auth.showLogoutWarning,
});

export default connect(mapStateToProps)(HeaderBar);
