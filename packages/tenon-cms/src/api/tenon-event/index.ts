import { $delete, $get, $post } from "../request"

const prefix = "/tenon-event";

export const getTenonEventsApi = (pageId) => $get(`${prefix}/getEvents/${pageId}`);

export const updateTenonEventApi = (params) => $post(`${prefix}/updateEvent`, params);

export const deleteTenonEventApi = (eventId) => $delete(`${prefix}/deleteEvent`, { eventId });

export const addTenonEventApi = (params) => $post(`${prefix}/addEvent`, params);