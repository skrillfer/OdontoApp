import { createSelector } from 'reselect';

const selectAlerts = state => state.alerts;

export const selectAlertItems =  createSelector(
    [selectAlerts],
    alerts => alerts.items
);

