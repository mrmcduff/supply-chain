pragma solidity >=0.4.24 <0.6.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
    * @dev give an account access to this role
    */
    function add(Role storage role, address account) internal {
        require(account != address(0), "Address cannot be zero");
        require(!has(role, account), "Role is already assigned");

        role.bearer[account] = true;
    }

    /**
    * @dev remove an account's access to this role
    */
    function remove(Role storage role, address account) internal {
        require(account != address(0), "Address cannot be zero");
        require(has(role, account), "Cannot remove role that is not assigned");

        role.bearer[account] = false;
    }

    /**
    * @dev check if an account has this role
    * @return bool
    */
    function has(Role storage role, address account)
        internal
        view
        returns (bool) {
        require(account != address(0), "Address cannot be zero");
        return role.bearer[account];
    }
}
