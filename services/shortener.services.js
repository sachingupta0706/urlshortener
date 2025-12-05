import * as model from "../models/shortener.model.js";

export const getAllShortLinks = async () => {
  return await model.getAll();
};

export const getShortLinkByShortCode = async (shortCode) => {
  return await model.findByShortCode(shortCode);
};

export const createShortLinkService = async (data) => {
  return await model.createShortLink(data);
};
