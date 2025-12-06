"use strict";

const REQUIRED_STRING_FIELDS = ["title", "mode", "category", "description"];
const REQUIRED_NUMERIC_FIELDS = ["price", "areaSqFt"];
const ALLOWED_MODES = ["buy", "sell", "rent"];

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isPositiveNumber = (value) => typeof value === "number" && value > 0;

const validateLocation = (location = {}) => {
  if (!location.city || !location.neighborhood) {
    return "Location requires both city and neighborhood";
  }
  return null;
};

const validateListingPayload = (payload = {}) => {
  const errors = [];

  REQUIRED_STRING_FIELDS.forEach((field) => {
    if (!isNonEmptyString(payload[field])) {
      errors.push(`${field} must be a non-empty string`);
    }
  });

  REQUIRED_NUMERIC_FIELDS.forEach((field) => {
    if (!isPositiveNumber(payload[field])) {
      errors.push(`${field} must be a positive number`);
    }
  });

  if (payload.mode && !ALLOWED_MODES.includes(payload.mode)) {
    errors.push(`mode must be one of ${ALLOWED_MODES.join(", ")}`);
  }

  const locationError = validateLocation(payload.location);
  if (locationError) {
    errors.push(locationError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateListingPayload,
};
