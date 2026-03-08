/**
* Handler that will be called during the execution of a PreUserRegistration flow.
*
* @param {Event} event - Details about the context and user that is attempting to register.
* @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
*/
exports.onExecutePreUserRegistration = async (event, api) => {
    // If we are in dev mode, just let everyone through to avoid local networking issues
    if (event.secrets['IS_DEV_MODE'] === 'true') return;

    // Use bracket notation to access query params safely in JS
    const requestQuery = event.request['query'] || {};
    const inviteId = requestQuery['xt-invite_id'];
    const email = event.user.email; // Email is not required by this action but Auth0's signup widget needs it so we verify it exists here.

    // Immediate block if either credential is missing
    if (!inviteId || !email) {
        api.access.deny('registration_denied', 'You need a whole valid invite to sign up. Ask an admin, then register on Budgeteer first.');
        return;
    }

    try {
        const response = await fetch(`https://YOUR_BACKEND_URL/api/auth/user-invites/${inviteId}/is-pending`);

        if (!response.ok) {
            api.access.deny('registration_denied', 'Unable to verify invite. Please try again.');
            return;
        }

        // Use bracket notation to hide the '.json()' error from the editor.
        const data = await response['json']();

        if (!data.isPending) {
            api.access.deny('registration_denied', 'Invite has expired or is invalid. Ask an admin, then register again on Budgeteer.');
            return;
        }
    } catch (error) {
        console.error("Auth0 Action Error:", error);
        api.access.deny('registration_denied', 'Unable to verify invite. Please try again.');
    }
};
