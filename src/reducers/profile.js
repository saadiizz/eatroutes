import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  SET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_SUCCESS,
  SET_PROFILE_IMAGE_FAILURE,
  GET_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_SUCCESS,
  GET_CONTACT_DETAILS_FAILURE,
} from "@utils/actionType";

const INIT_STATE = {
  gettingProfile: false,
  getProfileData: null,
  editingProfile: false,
  editProfileData: null,
  addingProfileImage: false,
  profileImageData: null,
  gettingContactDetails: false,
  getContactData: null,
};

const ProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, gettingProfile: true };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfileData: action.payload,
        gettingProfile: false,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        getProfileData: action.payload,
        gettingProfile: false,
      };

    case EDIT_PROFILE:
      return { ...state, editingProfile: true };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editProfileData: action.payload,
        editingProfile: false,
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        editProfileData: action.payload,
        editingProfile: false,
      };

    case SET_PROFILE_IMAGE:
      return { ...state, addingProfileImage: true };
    case SET_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profileImageData: action.payload,
        addingProfileImage: false,
      };
    case SET_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        profileImageData: action.payload,
        addingProfileImage: false,
      };

    case GET_CONTACT_DETAILS:
      return { ...state, gettingContactDetails: true };
    case GET_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        getContactData: action.payload,
        gettingContactDetails: false,
      };
    case GET_CONTACT_DETAILS_FAILURE:
      return {
        ...state,
        getContactData: action.payload,
        gettingContactDetails: false,
      };

    default:
      return state;
  }
};
export default ProfileReducer;
