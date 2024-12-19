const UserAccountDetailsRepository = require('../repositories/userAccountDetailsRepository');
const logger = require('../logger/logger');

const getAccountDetails = async (request, response) => {
    const { userId } = request.query;
    const userAccountDetailsRepository = new UserAccountDetailsRepository();
    const existingUserAccountDetails = await userAccountDetailsRepository.select(userId);
    if (existingUserAccountDetails) {
        logger.info(`existingUserAccountDetails ${existingUserAccountDetails.first_name}`);
        return response.status(200).json({
            id: existingUserAccountDetails.id,
            userId: existingUserAccountDetails.user_id,
            firstName: existingUserAccountDetails.first_name,
            lastName: existingUserAccountDetails.last_name,
            address1: existingUserAccountDetails.address_1,
            address2: existingUserAccountDetails.address_2,
            city: existingUserAccountDetails.city,
            state: existingUserAccountDetails.state,
            zipCode: existingUserAccountDetails.zip_code,
            phoneNumber: existingUserAccountDetails.phone_number,
            email: existingUserAccountDetails.email
        });
    } else {
        logger.info('No data for that account.');
        return response.status(200).json({});
    }
};

const createAccountDetails = async (request, response) => {
    const {
        userId, firstName, lastName, address1, address2,
        city, state, zipCode, phoneNumber, email
    } = request.body;
    const userAccountDetailsRepository = new UserAccountDetailsRepository();
    const userAccountDetails = await userAccountDetailsRepository.insert(
        userId, firstName, lastName, address1, address2,
        city, state, zipCode, phoneNumber, email
    );
    return response.status(201).json({
        id: userAccountDetails.id
    });
};

// New updateAccountDetails function
const updateAccountDetails = async (request, response) => {
    const { userId } = request.query;
    const {
        firstName, lastName, address1, address2,
        city, state, zipCode, phoneNumber, email
    } = request.body;

    const userAccountDetailsRepository = new UserAccountDetailsRepository();

    // Retrieve existing account details
    const existingUserAccountDetails = await userAccountDetailsRepository.select(userId);
    if (!existingUserAccountDetails) {
        logger.info(`User with userId ${userId} not found.`);
        return response.status(404).json({ message: 'User not found.' });
    }

    // Update the fields
    const updatedUserAccountDetails = await userAccountDetailsRepository.update(
        userId, firstName, lastName, address1, address2,
        city, state, zipCode, phoneNumber, email
    );

    if (updatedUserAccountDetails) {
        logger.info(`User account details for userId ${userId} updated successfully.`);
        return response.status(200).json({
            id: updatedUserAccountDetails.id,
            userId: updatedUserAccountDetails.user_id,
            firstName: updatedUserAccountDetails.first_name,
            lastName: updatedUserAccountDetails.last_name,
            address1: updatedUserAccountDetails.address_1,
            address2: updatedUserAccountDetails.address_2,
            city: updatedUserAccountDetails.city,
            state: updatedUserAccountDetails.state,
            zipCode: updatedUserAccountDetails.zip_code,
            phoneNumber: updatedUserAccountDetails.phone_number,
            email: updatedUserAccountDetails.email
        });
    } else {
        logger.error(`Failed to update user account details for userId ${userId}.`);
        return response.status(500).json({ message: 'Failed to update account details.' });
    }
};

module.exports = { createAccountDetails, getAccountDetails, updateAccountDetails };