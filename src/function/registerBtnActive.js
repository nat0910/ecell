export const registerBtnActive = (state, isValid) => {
  if (
    (state.company_name.length >= 3 &&
      state.owner_name.length >= 2 &&
      isValid.email &&
      isValid.contact_number &&
      state.team_size != "none" &&
      state.company_type != "none" &&
      state.commodity_name.length >= 2 &&
      state.domain.length >= 2 &&
      state.stage != "none" &&
      state.funded != "none" &&
      state.interest != "none" &&
      state.commodity_description.length > 10 &&
      state.commodity_description.length < 500 &&
      state.company_description.length > 10 &&
      state.company_description.length < 500 &&
      state.recaptcha_token != "") ||
    state.website_link ||
    state.app_link
  ) {
    return false;
  }
  return true;
};
