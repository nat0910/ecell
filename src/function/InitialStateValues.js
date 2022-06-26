export const InitialState = {
  company_name: "",
  owner_name: "",
  email: "",
  contact_number: "",
  team_size: "none",
  company_type: "none",
  commodity_name: "",
  domain: "",
  stage: "none",
  funded: "none",
  interest: "none",
  company_description: "",
  commodity_description: "",
  website_link: "",
  app_link: "",
  recaptcha_token: "",
};

export const InitialError = {
  startupError: false,
  emailError: false,
  numberError: false,
  ownerError: false,
  domainError: false,
  teamError: false,
  websiteError: false,
  appError: false,
};

export const InitialFocused = {
  company_name: false,
  owner_name: false,
  email: false,
  contact_number: false,
  team_size: false,
  company_type: false,
  commodity_name: false,
  domain: false,
  stage: false,
  funded: false,
  interest: false,
  company_description: false,
  commodity_description: false,
};

export const InitialValid = {
  email: false,
  contact_number: false,
};
