import cities from './cities';
import clients from './clients';
import watchmakers from './watchmakers';
import reservations from './reservations';
import feedbacks from "./feedbacks";
import clientAuth from "./clientAuth";
import personalPage from "./personalPage";
import passwordRecovery from "./passwordRecovery";

module.exports = {
    getCities: cities.getCities,
    addCity: cities.addCity,
    editCity: cities.editCity,
    deleteCity: cities.deleteCity,
    getClients: clients.getClients,
    addClient: clients.addClient,
    editClient: clients.editClient,
    deleteClient: clients.deleteClient,
    getReservations: reservations.getReservations,
    getReservationById: reservations.getReservationById,
    addReservation: reservations.addReservation,
    editReservation: reservations.editReservation,
    deleteReservation: reservations.deleteReservation,
    getWatchmakers: watchmakers.getWatchmakers,
    getFreeWatchmakers: watchmakers.getFreeWatchmakers,
    addWatchmaker: watchmakers.addWatchmaker,
    editWatchmaker: watchmakers.editWatchmaker,
    deleteWatchmaker: watchmakers.deleteWatchmaker,
    addWatchmakerAvatar: watchmakers.addWatchmakerAvatar,
    getFeedbacks: feedbacks.getFeedbacks,
    addFeedback: feedbacks.addFeedback,
    editFeedback: feedbacks.editFeedback,
    deleteFeedback: feedbacks.deleteFeedback,
    getTenLastFeedbacks: feedbacks.getTenLastFeedbacks,
    signIn: clientAuth.signIn,
    signOut: clientAuth.signOut,
    getPersonalPage: personalPage.getPersonalPage,
    getClientReservations: personalPage.getClientReservations,
    sendLink: passwordRecovery.sendLink,
    changePassword: passwordRecovery.changePassword
};