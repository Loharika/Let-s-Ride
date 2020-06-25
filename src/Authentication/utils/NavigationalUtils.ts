import {
   COMMUTE_DASHBOARD_HOME_PAGE,
COMMUTE_DASHBOARD_MATCHEDRESULTS
} from '../constants/NavigationalConstants'


export const goToDashboardHomePage = (history) => {
   history.push(COMMUTE_DASHBOARD_MATCHEDRESULTS)
}
