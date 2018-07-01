import {TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "constants/ActionTypes";
import {NAV_STYLE} from "constants/ThemeSetting";

export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width};
}

export function setStyleNavChange(navStyle) {
  return {type: NAV_STYLE, navStyle};
}
